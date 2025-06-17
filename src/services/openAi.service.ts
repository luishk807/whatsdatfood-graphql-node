import OpenAI from 'openai';
import RestaurantServices from './restaurants.service';
const OpenAiFn = {
  async getAIMenu(restName: string) {
    const openAiKey: string | undefined = process.env.OPENAI_KEY;

    const ai_question = `get me menu of ${restName} restaurant, put in an array of object as { name, category}. Respond only with valid JSON. No extra text.`;

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

    return JSON.parse(response.choices[0].message.content as string);
  },
};

export default OpenAiFn;
