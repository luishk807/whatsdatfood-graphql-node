import OpenAI from 'openai';
import RestaurantServices from './restaurants.service';

const OpenAiFn = {
  async getAIMenu(restName: string, address: string) {
    const openAiKey: string | undefined = process.env.OPENAI_KEY;

    const ai_question = `get me menu of ${restName} ${address} restaurant, put in an array of object as { name, address, menu: [{ name, category, description}]. Respond only with valid JSON. No extra text. only from one restaurant, the closest match`;

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
      return foundRest;
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
      if (dataJson && dataJson.length) {
        for (let item of dataJson) {
          const payload = {
            name: item.name,
            address: item.address,
            city: item.city,
            state: item.state,
            country: item.country,
            postal_code: item.postal_code,
          };
          await RestaurantServices.create(payload);
        }
      }
      return dataJson;
    }
  },
};

export default OpenAiFn;
