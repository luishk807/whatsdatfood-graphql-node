import OpenAI from 'openai';
import { _get } from 'helpers';
import {
  RestaurantAIResponse,
  RestaurantItemType,
  RestaurantType,
  gooogleResponseAPIItemTypes,
} from 'types';
import {
  buildRestaurantPayload,
  buildRestaurantItemPayload,
} from 'helpers/restaurants.sequelize';
import { dbAliases } from 'db/index';
import RestaurantServices from 'services/restaurants.service';
import RestaurantMenuItemsFn from 'services/restaurantMenuItems.service';
import { getBuiltAddress } from 'helpers';

type AIMenuType = {
  id?: number;
  name: string;
  price: string;
  description: string;
  category: string;
  restaurant_id?: number;
  top_choice: boolean;
};
const openAiKey: string | undefined = process.env.OPENAI_KEY;
const itemKey = dbAliases.restaurant
  .restaurantItems as keyof RestaurantAIResponse;

const OpenAiFn = {
  async askAIQuestion(ai_question: string) {
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

    let dataJson;
    try {
      dataJson = JSON.parse(jsonStr);
    } catch (err) {
      console.error('Failed to parse AI response:', jsonStr);
      throw new Error('Invalid JSON returned from OpenAI.');
    }

    return dataJson;
  },
  async fetchFullMenuPaginated(ai_question: string, batchSize: number = 20) {
    const results = new Map();
    let offset = 0;
    let lastBatch: string = '';

    while (true) {
      const question = `${ai_question} from item ${offset + 1} with ${batchSize} items.`;

      const response = await this.askAIQuestion(question); // Your wrapped OpenAI call

      if (!response || response.length === 0) break;

      const batchString = JSON.stringify(response);
      if (batchString === lastBatch) {
        console.log('Detected repeated batch. Ending loop.');
        break;
      }
      lastBatch = batchString;

      if (Array.isArray(response)) {
        const name = _get<AIMenuType[], string>(response, 'name');
        const slug = name?.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        if (!results.has(slug)) {
          results.set(slug, response);
        } else {
          console.log('Detected repeated batch. Ending loop.');
          break;
        }
      } else {
        console.error('AI returned a non-array response:', response);
        break;
      }

      offset += response.length;

      if (response.length < batchSize) break;
    }

    return Array.from(results.values());
  },
  async generateAIImage(ai_question: string) {
    try {
      const openai = new OpenAI({
        apiKey: openAiKey,
      });
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: `A delicious ${ai_question} bakery, photorealistic, vibrant colors, close-up`,
        size: '1024x1024',
        n: 1,
      });
      if (response.data && response.data.length > 0) {
        console.log('Image URL:', response.data[0].url);
      } else {
        console.log('No image generated.');
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }
  },
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
          id: _get(restaurant, 'id'),
          name: _get(restaurant, 'name'),
          category: _get(restaurant, 'category'),
          top_choice: _get(restaurant, 'top_choice'),
          price: _get(restaurant, 'price'),
          description: _get(restaurant, 'description'),
          restaurant_id: _get(restaurant, 'restaurant_id'),
          restaurantItemUserRatings: _get(
            restaurant,
            'restaurantItemUserRatings',
          ),
          restaurantItemRestImages: _get(
            restaurant,
            'restaurantItemRestImages',
          ),
        });
      });
    } else {
      const ai_question = `get me the menu of ${name} ${wholeAddress} restaurant, put in an array of object as [{ name, price, description, category, top_choice: true or false}]. No extra text. don't include source. Do not use Markdown formatting or hyperlinks. Always respond with plain text and raw JSON only.`;

      let menu = await this.fetchFullMenuPaginated(ai_question);

      if (menu && menu.length) {
        if (Array.isArray(menu[0])) {
          menu = menu[0];
        }

        for (let item of menu) {
          console.log(item, 'checking in menu');
          const restaurantItemPayload = buildRestaurantItemPayload({
            ...item,
            restaurant_id: restId,
          });
          const query = {
            name: restaurantItemPayload.name,
            restaurant_id: restaurantItemPayload.restaurant_id,
          };

          console.log('query to check if exists', query);
          const exists = await RestaurantMenuItemsFn.findByQuery(query);

          if (!exists) {
            await RestaurantMenuItemsFn.create(restaurantItemPayload);
            results.push({
              id: _get(restaurantItemPayload, 'id'),
              name: _get(restaurantItemPayload, 'name'),
              category: _get(restaurantItemPayload, 'category'),
              top_choice: _get(restaurantItemPayload, 'top_choice'),
              price: _get(restaurantItemPayload, 'price'),
              description: _get(restaurantItemPayload, 'description'),
              restaurant_id: _get(restaurantItemPayload, 'restaurant_id'),
              restaurantItemUserRatings: _get(
                restaurantItemPayload,
                'restaurantItemUserRatings',
              ),
              restaurantItemRestImages: _get(
                restaurantItemPayload,
                'restaurantItemRestImages',
              ),
            });
          } else {
            console.log('skipping saving item since it already exists');
          }
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
      console.log('use ai');
      const ai_question = `get the list of restaurants of with the name exactly ${restName} in nyc as [{ name, address, city, state, country, postal_code}]. Respond only with valid JSON schema. No extra text. don't include source. Do not use Markdown formatting or hyperlinks. Always respond with plain text and raw JSON only.`;

      const dataJson = await this.fetchFullMenuPaginated(ai_question);

      const results = new Map();

      if (dataJson && dataJson.length) {
        for (let item of dataJson) {
          if (Array.isArray(item)) {
            item = item[0];
          }
          const rest_name = _get(item, 'name', '');
          const restData = await RestaurantServices.findByName(rest_name);

          if (!restData || (restData && !restData.length)) {
            const restaurantPayload = buildRestaurantPayload(item);
            const slug = _get(restaurantPayload, 'slug');
            if (!results.has(slug)) {
              await RestaurantServices.create(restaurantPayload);
              results.set(slug, {
                name: _get(restaurantPayload, 'name'),
                address: _get(restaurantPayload, 'address'),
                city: _get(restaurantPayload, 'city'),
                slug: slug,
                state: _get(restaurantPayload, 'state'),
                country: _get(restaurantPayload, 'country'),
                postal_code: _get(restaurantPayload, 'postal_code'),
              });
            }
          } else {
            restData.forEach((restaurant: RestaurantType) => {
              const slug = _get(restaurant, 'slug');
              if (!results.has(slug)) {
                results.set(slug, {
                  name: _get(restaurant, 'name'),
                  address: _get(restaurant, 'address'),
                  city: _get(restaurant, 'city'),
                  slug: slug,
                  state: _get(restaurant, 'state'),
                  country: _get(restaurant, 'country'),
                  postal_code: _get(restaurant, 'postal_code'),
                });
              }
            });
          }
        }
      }
      return Array.from(results.values());
    }
  },
  async getBestImagesFromList(
    query: string,
    images: [gooogleResponseAPIItemTypes],
  ) {
    const ai_question = `From the list of images below, return exactly one image with width at least 150 pixels for ${query}, in JSON format as:

    [
      {
        "title": string,
        "link": string,
        "content_link": string
      }
    ]

    - The "link" field must be the direct image URL (the "link" property in the input).
    - The "content_link" field must be the page hosting the image (the "image.contextLink" property).
    - Only choose images hosted on well-known, publicly accessible domains such as:
      - www.newyorker.com
      - yelp.com
      - doordash.com
      - pinterest.com
      - reddit.c
      - media.cdn sites (like AWS S3 from trusted domains)

    Avoid choosing images from:
    - tiktok.com
    - instagram.com
    - lemon8-app.com
    - any platform that may block hotlinking or require user login.

    Return only valid JSON. No extra text.input: ${JSON.stringify(images)}`;
    const response = await this.askAIQuestion(ai_question); // Your wrapped OpenAI call

    return _get(response, '0');
  },
};

export default OpenAiFn;
