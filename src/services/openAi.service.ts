import OpenAI from 'openai';
import { _get } from 'helpers';
import { Restaurant } from 'interfaces/restaurant';
import { GooogleResponseAPIItem } from 'types';

import {
  buildRestaurantPayload,
  buildRestaurantItemPayload,
  buildRestaurantItemResponse,
} from 'helpers/restaurants.sequelize';
import RestaurantServices from 'services/restaurants.service';
import RestaurantBusinesHourServices from 'services/restaurantBusinessHours.service';
import RestaurantMenuItemsFn from 'services/restaurantMenuItems.service';
import { getBuiltAddress } from 'helpers';
import RestaurantHolidayService from './restaurantHolidays.services';
import RestaurantCategoryService from './restaurantCategories.services';

type AIMenuType = {
  id?: number;
  name: string;
  price: string;
  description: string;
  category: string;
  restaurant_id?: number;
  top_choice: boolean;
};

export const GPT_MODEL = {
  GPT4_PREVIEW: 'gpt-4o-search-preview',
  GPT4: 'gpt-4o',
  DALL3: 'dall-e-3',
};
const openAiKey: string | undefined = process.env.OPENAI_KEY;

const OpenAiFn = {
  async askAIQuestion(aiModel: string, ai_question: string) {
    const openai = new OpenAI({
      apiKey: openAiKey,
    });

    const response = await openai.chat.completions.create({
      model: aiModel,
      messages: [
        {
          role: 'system',
          content:
            'Always respond with raw JSON only. Do not add explanations, markdown, or any extra text, backticks, or code blocks.',
        },
        {
          role: 'system',
          content:
            'content: "Return only an array of restaurant objects, not wrapped in any other structure. Format: [{ name, price, description, category, top_choice: true/false }]. Do not include a parent key like restaurants."',
        },
        {
          role: 'user',
          content: ai_question,
        },
      ],
      ...(GPT_MODEL.GPT4 === aiModel && { temperature: 0 }),
    });

    const data = response.choices[0].message.content as string;

    const jsonMatch = data.match(
      /```(?:json)?([\s\S]*?)```|(\{[\s\S]*\})|(\[[\s\S]*\])/,
    );

    if (!jsonMatch) {
      console.error('AI response has no JSON block:', data);
      throw new Error('No JSON found in AI response');
    }

    // Pick the first non-null matched group
    const jsonStr = jsonMatch[1] || jsonMatch[2] || jsonMatch[3];

    let dataJson;
    try {
      dataJson = JSON.parse(jsonStr);
    } catch (err) {
      console.error('Failed to parse AI response:', jsonStr);
      throw new Error('Invalid JSON returned from OpenAI.');
    }

    return dataJson;
  },
  async fetchFullMenuPaginated(
    aiModel: string,
    ai_question: string,
    batchSize: number = 20,
  ) {
    const results = new Map();
    let offset = 0;
    let lastBatch: string = '';

    while (true) {
      const question = `${ai_question} from item ${offset + 1} with ${batchSize} items.`;

      const response = await this.askAIQuestion(aiModel, question); // Your wrapped OpenAI call

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
        model: GPT_MODEL.DALL3,
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
    const results = [];

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
      michelin_score,
      letter_grade,
      rating,
      phone,
      description,
      delivery_method,
      payment_method,
      email,
      reservation_required,
      reservation_available,
      website,
    } = Array.isArray(restData) ? restData[0] : restData;

    const wholeAddress = getBuiltAddress({
      address: address ?? '',
      city: city ?? '',
      state: state ?? '',
      country: country ?? '',
      postal_code: postal_code ?? '',
    });

    const menuItems = _get(restData, 'restaurantMenuItems');

    if (menuItems && menuItems.length) {
      return restData;
    } else {
      const ai_question = `get me the menu of ${name} ${wholeAddress} restaurant, put in an array of object as [{ name, price, description, category, top_choice: true or false}]. No extra text. don't include source. Do not use Markdown formatting or hyperlinks. Always respond with plain text and raw JSON only.`;

      let menu = await this.fetchFullMenuPaginated(
        GPT_MODEL.GPT4_PREVIEW,
        ai_question,
      );

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
            const item = buildRestaurantItemResponse(restaurantItemPayload);
            results.push(item);
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
      michelin_score,
      letter_grade,
      rating,
      phone,
      description,
      delivery_method,
      email,
      reservation_required,
      reservation_available,
      website,
      restaurantMenuItems: results,
    };
  },
  async getAIRestaurantList(restName: string) {
    const foundRest = await RestaurantServices.findByName(restName);

    if (Array.isArray(foundRest) && foundRest.length) {
      return foundRest;
    } else {
      console.log('use ai');
      const ai_question = `get the list of restaurants of with the name exactly ${restName} in nyc as [{ name, address, city, state, country, postal_code, payment_method (payment method, comma separated text), phone (format (nnn) nnn-nnnn), rating (popular restaurant score), michelin_score (michellin star score)}, description, delivery_method (comma separated text), letter_grade (nyc letter restaurant grade from NYC Health grades}, email, reservation_required (boolean), reservation_available (can do reservation?), website, food_category: [ name of category], business_hours: { day_of_week: time (military hours HH:mm)}, holidays_closed: [ list of holidays when closed], tasting_menu_only (boolean), tasting_menu_price (number in USD),price_range (string like "$$$$"), drink_pairing_price (number in USD or null)]. Respond only with valid JSON schema. No extra text. don't include source. Do not use Markdown formatting or hyperlinks. Always respond with plain text and raw JSON only.`;

      const dataJson = await this.fetchFullMenuPaginated(
        GPT_MODEL.GPT4,
        ai_question,
      );

      const results = new Map();

      if (dataJson && dataJson.length) {
        for (let item of dataJson) {
          if (Array.isArray(item)) {
            item = item[0];
          }
          const rest_name = _get(item, 'name', '');
          const business_hours = _get(item, 'business_hours');
          const food_categories = _get(item, 'food_category');
          const holidays = _get(item, 'holidays_closed');

          const restData = await RestaurantServices.findByName(rest_name);

          if (!restData || (Array.isArray(restData) && !restData.length)) {
            const restaurantPayload = buildRestaurantPayload(item);
            const slug = _get(restaurantPayload, 'slug');
            if (!results.has(slug)) {
              // create restaurant
              const newRestaurant =
                await RestaurantServices.create(restaurantPayload);

              // create businesss hours
              console.log('business_hours', business_hours);
              await RestaurantBusinesHourServices.processBusinesHoursFromRestaurant(
                newRestaurant.id,
                business_hours,
              );

              // save holiday
              console.log('holidays', holidays);
              await RestaurantHolidayService.processRestaurantHolidayFromRestaurant(
                newRestaurant.id,
                holidays,
              );

              // save food category
              console.log('food_categories', food_categories);
              await RestaurantCategoryService.processRestaurantCategoryFromRestaurant(
                newRestaurant.id,
                food_categories,
              );

              results.set(slug, {
                name: _get(restaurantPayload, 'name'),
                address: _get(restaurantPayload, 'address'),
                city: _get(restaurantPayload, 'city'),
                slug: slug,
                state: _get(restaurantPayload, 'state'),
                country: _get(restaurantPayload, 'country'),
                postal_code: _get(restaurantPayload, 'postal_code'),
                phone: _get(restaurantPayload, 'phone', null),
                payment_method: _get(restaurantPayload, 'payment_method', null),
                rating: _get(restaurantPayload, 'rating', null),
                michelin_score: _get(restaurantPayload, 'michelin_score', null),
                description: _get(restaurantPayload, 'description', null),
                delivery_method: _get(
                  restaurantPayload,
                  'delivery_method',
                  null,
                ),
                letter_grade: _get(restaurantPayload, 'letter_grade', null),
                drink_pairing_price: _get(
                  restaurantPayload,
                  'drink_pairing_price',
                  null,
                ),
                price_range: _get(restaurantPayload, 'price_range', null),
                tasting_menu_only: _get(
                  restaurantPayload,
                  'tasting_menu_only',
                  null,
                ),
                tasting_menu_price: _get(
                  restaurantPayload,
                  'tasting_menu_price',
                  null,
                ),
                email: _get(restaurantPayload, 'email', null),
                reservation_required: _get(
                  restaurantPayload,
                  'reservation_required',
                  null,
                ),
                reservation_available: _get(
                  restaurantPayload,
                  'reservation_available',
                  null,
                ),
                website: _get(restaurantPayload, 'website', null),
              });
            }
          } else {
            if (Array.isArray(restData)) {
              restData.forEach((restaurant: Restaurant) => {
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
                    phone: _get(restaurant, 'phone'),
                    payment_method: _get(restaurant, 'payment_method'),
                    rating: _get(restaurant, 'rating'),
                    michelin_score: _get(restaurant, 'michelin_score'),
                    description: _get(restaurant, 'description'),
                    delivery_method: _get(restaurant, 'delivery_method'),
                    letter_grade: _get(restaurant, 'letter_grade'),
                    email: _get(restaurant, 'email'),
                    drink_pairing_price: _get(
                      restaurant,
                      'drink_pairing_price',
                    ),
                    price_range: _get(restaurant, 'price_range'),
                    tasting_menu_only: _get(restaurant, 'tasting_menu_only'),
                    tasting_menu_price: _get(restaurant, 'tasting_menu_price'),
                    reservation_required: _get(
                      restaurant,
                      'reservation_required',
                    ),
                    reservation_available: _get(
                      restaurant,
                      'reservation_available',
                    ),
                    website: _get(restaurant, 'website'),
                  });
                }
              });
            }
          }
        }
      }
      return Array.from(results.values());
    }
  },
  async getBestImagesFromList(query: string, images: [GooogleResponseAPIItem]) {
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
    const response = await this.askAIQuestion(
      GPT_MODEL.GPT4_PREVIEW,
      ai_question,
    ); // Your wrapped OpenAI call

    return _get(response, '0');
  },
};

export default OpenAiFn;
