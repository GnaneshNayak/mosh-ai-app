import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export type ChatMessage = {
   role: 'user' | 'bot';
   content: string;
};

type Props = {
   messages: ChatMessage[];
};
const ChatMessages = ({ messages }: Props) => {
   const paraRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      paraRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   const onCopyFN = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selection);
      }
   };
   return (
      <div className="flex flex-col gap-3">
         {messages.map((msg, index) => (
            <div
               key={index}
               onCopy={onCopyFN}
               ref={index === messages.length - 1 ? paraRef : null}
               className={`my-2 p-2 max-w-md rounded ${
                  msg.role === 'user'
                     ? 'bg-blue-100 self-end rounded-lg'
                     : 'bg-gray-200 self-start rounded-lg'
               }`}
            >
               <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
         ))}
      </div>
   );
};

export default ChatMessages;
