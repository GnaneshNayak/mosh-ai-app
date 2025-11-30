import axios from 'axios';
import { useRef, useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessages, { type ChatMessage } from './ChatMessages';
import TypingIndicator from './TypingIndicator';
import popSound from '@/assets/sounds/pop.mp3';
import notificationSound from '@/assets/sounds/notification.mp3';

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;
const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

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

   const onSubmit = async ({ prompt }: FormData) => {
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
      popAudio.play();
      setIsBotTyping(true);
      setErrors(null);
      try {
         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         notificationAudio.play();
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

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col flex-1 gap-2 mb-3 overflow-y-auto">
            {messages && <ChatMessages messages={messages} />}
            {isBotTyping && <TypingIndicator />}
            {errors && <div className="text-red-500">{errors}</div>}
         </div>
         <ChatInput onSubmit={onSubmit} />
      </div>
   );
};

export default Chatbot;
