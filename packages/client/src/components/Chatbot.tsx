import axios from 'axios';
import { ArrowBigUp } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { Button } from './ui/button';

type FormData = {
   prompt: string;
};

type ChatResponse = {
   response: string;
};

type ChatMessage = {
   role: 'user' | 'bot';
   content: string;
};
const Chatbot = () => {
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const conversationId = useRef(crypto.randomUUID());
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmit = async ({ prompt }: FormData) => {
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
      setIsBotTyping(true);
      reset(); // clears input after submit
      const { data } = await axios.post<ChatResponse>('/api/chat', {
         prompt,
         conversationId: conversationId.current,
      });
      setMessages((prev) => [...prev, { content: data.response, role: 'bot' }]);
      setIsBotTyping(false);
   };

   const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   return (
      <div>
         <div className="flex flex-col gap-2 mb-3">
            {messages.map((msg, index) => (
               <div
                  key={index}
                  className={`my-2 p-2 rounded ${
                     msg.role === 'user'
                        ? 'bg-blue-100 self-end rounded-lg'
                        : 'bg-gray-200 self-start rounded-lg'
                  }`}
               >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
               </div>
            ))}
            {isBotTyping && (
               <div className="flex gap-1 px-3 py-2 bg-gray-200 self-start rounded-lg">
                  <div className="rounded-full bg-gray-800 animate-pulse w-2 h-2"></div>
                  <div className="rounded-full bg-gray-800 animate-pulse w-2 h-2 [animation-delay:0.2s]"></div>
                  <div className="rounded-full bg-gray-800 animate-pulse w-2 h-2 [animation-delay:0.4s]"></div>
               </div>
            )}
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
