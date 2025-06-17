import { NextFunction, Request, Response } from 'express';
import OpenAI from 'openai';

export const getAIMenu = async (
  req: Request,
  resp: Response,
  next: NextFunction,
) => {
  try {
    // const { restaurant } = req.body;
    // resp.json({ data: restaurant });
    const { restaurant } = req.query;

    const openAiKey: string | undefined = process.env.OPENAI_KEY;

    const ai_question = `get me menu of ${restaurant} restaurant, put in an array of object as { name, category}. Respond only with valid JSON. No extra text.`;

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

    const json = JSON.parse(response.choices[0].message.content as string);
    resp.json(json);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
