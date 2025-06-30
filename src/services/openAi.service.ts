import OpenAI from 'openai';
import { _get } from 'helpers';
import { ResturantAIResponse, RestaurantType } from 'types';
import { buildRestaurantPayload } from 'helpers/restaurants.sequelize';
import RestaurantServices from 'services/restaurants.service';

const OpenAiFn = {
  async getAIMenu(restName: string, address: string) {
    const openAiKey: string | undefined = process.env.OPENAI_KEY;

    const ai_question = `get me menu of ${restName} ${address} restaurant, put in an array of object as { name, address, menu: [{ name, category, image, description}]. Respond only with valid JSON. No extra text. only from one restaurant, the closest match`;
    // the above provide a shorter version somehow
    //get me complete menu of Peter Luger Steak House US restaurant, put in an array of object as { name, address, menu: [{ name, price, category, top_choice (top choice): true or false}]. Respond only with valid JSON. No extra text. only from one restaurant, the closest match

    const openai = new OpenAI({
      apiKey: openAiKey,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        {
          role: 'system',
          content: ai_question,
        },
      ],
      temperature: 0,
    });

    const data = JSON.parse(response.choices[0].message.content as string);
    const resp = await RestaurantServices.create({ name: restName });

    return JSON.parse(response.choices[0].message.content as string);
  },
  async getAIRestaurantList(restName: string) {
    const foundRest = await RestaurantServices.findByName(restName);

    if (foundRest.length) {
      return foundRest.map((rest: RestaurantType) => ({
        name: _get(rest, 'name'),
        address: _get(rest, 'address'),
        city: _get(rest, 'city'),
        state: _get(rest, 'state'),
        country: _get(rest, 'country'),
        postal_code: _get(rest, 'postal_code'),
      }));
    } else {
      const openAiKey: string | undefined = process.env.OPENAI_KEY;
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

      const results: ResturantAIResponse[] = [];

      if (dataJson && dataJson.length) {
        for (let item of dataJson) {
          const rest_name = _get(item, 'name');
          const restData = await RestaurantServices.findByName(rest_name);

          if (!restData) {
            results.push({
              name: _get(item, 'name'),
              address: _get(item, 'address'),
              city: _get(item, 'city'),
              state: _get(item, 'state'),
              country: _get(item, 'country'),
              postal_code: _get(item, 'postal_code'),
            });
            const restaurantPayload = buildRestaurantPayload(item);
            await RestaurantServices.create(restaurantPayload);
          } else {
            restData.forEach((restaurant: RestaurantType) => {
              results.push({
                name: _get(restaurant, 'name'),
                address: _get(restaurant, 'address'),
                city: _get(restaurant, 'city'),
                state: _get(restaurant, 'state'),
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
