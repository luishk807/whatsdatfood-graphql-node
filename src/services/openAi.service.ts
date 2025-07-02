import OpenAI from 'openai';
import { _get } from 'helpers';
import {
  RestaurantAIResponse,
  RestaurantItemType,
  RestaurantType,
} from 'types';
import {
  buildRestaurantPayload,
  buildRestaurantItemPayload,
} from 'helpers/restaurants.sequelize';
import { dbAliases } from 'db/index';
import RestaurantServices from 'services/restaurants.service';
import RestaurantMenuItemsFn from 'services/restaurantMenuItems.service';
import { getBuiltAddress } from 'helpers';

const openAiKey: string | undefined = process.env.OPENAI_KEY;

const itemKey = dbAliases.restaurant
  .restaurantItems as keyof RestaurantAIResponse;

const OpenAiFn = {
  async getAIRestaurantMenuBySlug(slug: string) {
    const restData = await RestaurantServices.findBySlug(slug);
    const results: RestaurantItemType[] = [];

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

    const menuItems = restData[itemKey] as RestaurantItemType[];

    if (menuItems && menuItems.length) {
      menuItems.forEach((restaurant: RestaurantItemType) => {
        results.push({
          name: _get(restaurant, 'name'),
          category: _get(restaurant, 'category'),
          top_choice: _get(restaurant, 'top_choice'),
          price: _get(restaurant, 'price'),
          description: _get(restaurant, 'description'),
          restaurant_id: _get(restaurant, 'restaurant_id'),
        });
      });
    } else {
      const ai_question = `get me the first 20 menu items of ${name} ${wholeAddress} restaurant, put in an array of object as { name, address, menu: [{ name, price, description, category, top_choice: true or false}]. No extra text. don't include source. Do not use Markdown formatting or hyperlinks. Always respond with plain text and raw JSON only.`;

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

      const jsonMatch = data.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.error('AI response has no JSON block:', data);
        throw new Error('No JSON found in AI response');
      }

      const jsonStr = jsonMatch[0];

      if (!jsonStr.trim().endsWith('}') && !jsonStr.trim().endsWith(']')) {
        console.error('AI JSON block appears truncated:', jsonStr);
        throw new Error('AI response incomplete or truncated.');
      }
      // const cleaned = data.replace(/```json|```/g, '').trim();
      let dataJson;
      try {
        dataJson = JSON.parse(jsonStr);
      } catch (err) {
        console.error('Failed to parse AI response:', jsonStr);
        throw new Error('Invalid JSON returned from OpenAI.');
      }

      const menu = _get(dataJson, '0.menu');

      if (menu && menu.length) {
        for (let item of menu) {
          const restaurantItemPayload = buildRestaurantItemPayload({
            ...item,
            restaurant_id: restId,
          });
          results.push({
            name: _get(restaurantItemPayload, 'name'),
            category: _get(restaurantItemPayload, 'category'),
            top_choice: _get(restaurantItemPayload, 'top_choice'),
            price: _get(restaurantItemPayload, 'price'),
            description: _get(restaurantItemPayload, 'description'),
            restaurant_id: _get(restaurantItemPayload, 'restaurant_id'),
          });
          await RestaurantMenuItemsFn.create(restaurantItemPayload);
        }
      }
    }

    return {
      name,
      address,
      city,
      slug,
      state,
      country,
      postal_code,
      [itemKey]: results,
    };
  },
  async getAIRestaurantList(restName: string) {
    const foundRest = await RestaurantServices.findByName(restName);
    console.log('getAIRestaurantList', foundRest);

    if (foundRest && foundRest.length) {
      return foundRest.map((rest: RestaurantType) => ({
        id: _get(rest, 'id'),
        name: _get(rest, 'name'),
        address: _get(rest, 'address'),
        city: _get(rest, 'city'),
        slug: _get(rest, 'slug'),
        state: _get(rest, 'state'),
        country: _get(rest, 'country'),
        postal_code: _get(rest, 'postal_code'),
        [itemKey]: _get(rest, itemKey),
      }));
    } else {
      console.log('using ai');
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

          if (!restData || (restData && !restData.length)) {
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
