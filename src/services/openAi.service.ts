import OpenAI from 'openai';
import { _get } from 'helpers';
import {
  RestaurantAIResponse,
  RestaurantMenuItemsAIResponse,
  RestaurantItemType,
  RestaurantType,
} from 'types';
import {
  buildRestaurantPayload,
  buildRestaurantItemPayload,
} from 'helpers/restaurants.sequelize';
import RestaurantServices from 'services/restaurants.service';
import { getBuiltAddress } from 'helpers';
import RestaurantMenuItemsFn from 'services/restaurantMenuItems.service';

const openAiKey: string | undefined = process.env.OPENAI_KEY;

const OpenAiFn = {
  async getAIRestaurantMenu(slug: string) {
    const restData = await RestaurantServices.findBySlug(slug);

    if (!restData) {
      throw new Error('No restaurant available');
    }

    const {
      id: restId,
      name,
      address,
      city,
      state,
      country,
      postal_code,
    } = restData;

    const wholeAddress = getBuiltAddress({
      address,
      city,
      state,
      country,
      postal_code,
    });

    // const ai_question = `get me menu of ${restName} ${address} restaurant, put in an array of object as { name, address, menu: [{ name, category, image, description}]. Respond only with valid JSON. No extra text. only from one restaurant, the closest match`;
    // the above provide a shorter version somehow
    const ai_question = `get me complete menu of ${name} ${wholeAddress} restaurant, put in an array of object as { name, address, menu: [{ name, price, category, top_choice (top choice): true or false}]. No extra text. don't include source. Do not use Markdown formatting or hyperlinks. Always respond with plain text and raw JSON only.`;

    const openai = new OpenAI({
      apiKey: openAiKey,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-search-preview',
      messages: [
        {
          role: 'user',
          content: ai_question,
        },
      ],
    });

    const data = response.choices[0].message.content as string;
    const cleaned = data.replace(/```json|```/g, '').trim();
    const dataJson = JSON.parse(cleaned);
    const results: RestaurantMenuItemsAIResponse[] = [];

    if (dataJson && dataJson.length) {
      for (let item of dataJson) {
        const menuItems =
          await RestaurantMenuItemsFn.findItemsByRestaurantId(restId);

        if (!menuItems) {
          const restaurantItemPayload = buildRestaurantItemPayload({
            ...item,
            restaurant_id: restId,
          });
          results.push({
            name: _get(restaurantItemPayload, 'name'),
            category: _get(restaurantItemPayload, 'category'),
            description: _get(restaurantItemPayload, 'description'),
            restaurant_id: _get(restaurantItemPayload, 'restaurant_id'),
          });
          await RestaurantMenuItemsFn.create(restaurantItemPayload);
        } else {
          await RestaurantMenuItemsFn.destroyItemByRestaurantId(restId);
          menuItems.forEach((restaurant: RestaurantItemType) => {
            results.push({
              name: _get(restaurant, 'name'),
              category: _get(restaurant, 'category'),
              description: _get(restaurant, 'description'),
              restaurant_id: _get(restaurant, 'restaurant_id'),
            });
          });
        }
      }
    }
    return results;
  },
  async getAIRestaurantList(restName: string) {
    const foundRest = await RestaurantServices.findByName(restName);

    if (foundRest.length) {
      return foundRest.map((rest: RestaurantType) => ({
        name: _get(rest, 'name'),
        address: _get(rest, 'address'),
        city: _get(rest, 'city'),
        slug: _get(rest, 'slug'),
        state: _get(rest, 'state'),
        country: _get(rest, 'country'),
        postal_code: _get(rest, 'postal_code'),
      }));
    } else {
      const ai_question = `get the list of all restaurants of with the name exactly ${restName} in nyc as [{ name, address, city, state, country, postal_code}]. Respond only with valid JSON schema. No extra text. don't include source. Do not use Markdown formatting or hyperlinks. Always respond with plain text and raw JSON only. give me only the top 10`;
      const openai = new OpenAI({
        apiKey: openAiKey,
      });
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-search-preview',
        messages: [
          {
            role: 'user',
            content: ai_question,
          },
        ],
      });
      const data = response.choices[0].message.content as string;
      const cleaned = data.replace(/```json|```/g, '').trim();
      const dataJson = JSON.parse(cleaned);

      const results: RestaurantAIResponse[] = [];

      if (dataJson && dataJson.length) {
        for (let item of dataJson) {
          const rest_name = _get(item, 'name');
          const restData = await RestaurantServices.findByName(rest_name);

          if (!restData) {
            const restaurantPayload = buildRestaurantPayload(item);
            results.push({
              name: _get(restaurantPayload, 'name'),
              address: _get(restaurantPayload, 'address'),
              city: _get(restaurantPayload, 'city'),
              slug: _get(restaurantPayload, 'slug'),
              state: _get(restaurantPayload, 'state'),
              country: _get(restaurantPayload, 'country'),
              postal_code: _get(restaurantPayload, 'postal_code'),
            });
            await RestaurantServices.create(restaurantPayload);
          } else {
            restData.forEach((restaurant: RestaurantType) => {
              results.push({
                name: _get(restaurant, 'name'),
                address: _get(restaurant, 'address'),
                city: _get(restaurant, 'city'),
                state: _get(restaurant, 'state'),
                slug: _get(restaurant, 'slug'),
                country: _get(restaurant, 'country'),
                postal_code: _get(restaurant, 'postal_code'),
              });
            });
          }
        }
      }
      return results;
    }
  },
};

export default OpenAiFn;
