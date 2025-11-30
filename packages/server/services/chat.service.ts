import OpenAI from 'openai';
import { conversationRepository } from '../repository/conversation.repository.ts';
import path from 'path';
import fs from 'fs';
import template from '../prompts/chatbot.txt';

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);
const filledPrompt = template.replace('{{parkInfo}}', parkInfo);
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

interface ChatResponse {
   id: string;
   message: string;
}

export const chatService = {
   async sendMessage(
      conversationId: string,
      prompt: string
   ): Promise<ChatResponse> {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         instructions: filledPrompt,
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 200,
         previous_response_id:
            conversationRepository.getConversationResponseId(conversationId) ||
            undefined,
      });

      conversationRepository.setConversationResponseId(
         conversationId,
         response.id
      );

      return {
         id: response.id,
         message: response.output_text,
      };
   },
};
