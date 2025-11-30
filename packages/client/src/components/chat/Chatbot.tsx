import axios from 'axios';
import { ArrowBigUp } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import ChatMessages, { type ChatMessage } from './ChatMessages';
import TypingIndicator from './TypingIndicator';

type FormData = {
   prompt: string;
};

type ChatResponse = {
   response: string;
};

const Chatbot = () => {
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const conversationId = useRef(crypto.randomUUID());
   const [errors, setErrors] = useState<string | null>(null);
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmit = async ({ prompt }: FormData) => {
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
      setIsBotTyping(true);
      reset({ prompt: '' }); // clears input after submit
      setErrors(null);
      try {
         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         setMessages((prev) => [
            ...prev,
            { content: data.response, role: 'bot' },
         ]);
      } catch (error) {
         setErrors('Something went wrong. Please try again.');
      } finally {
         setIsBotTyping(false);
      }
   };

   const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col flex-1 gap-2 mb-3 overflow-y-auto">
            {messages && <ChatMessages messages={messages} />}
            {isBotTyping && <TypingIndicator />}
            {errors && <div className="text-red-500">{errors}</div>}
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-end gap-2 border-2 p-4 rounded-3xl"
            onKeyDown={onKeyDown}
         >
            <textarea
               {...register('prompt', {
                  required: true,
                  validate: (value) => value.trim().length > 0,
               })}
               autoFocus
               className="w-full border-0 focus:outline-0 resize-none"
               placeholder="Ask anything"
               maxLength={1000}
            />
            <Button
               type="submit"
               className="rounded-full w-9 h-9"
               disabled={!formState.isValid}
            >
               <ArrowBigUp />
            </Button>
         </form>
      </div>
   );
};

export default Chatbot;
