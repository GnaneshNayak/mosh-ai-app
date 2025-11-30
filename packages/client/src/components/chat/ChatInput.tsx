import { ArrowBigUp } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';

type FormData = {
   prompt: string;
};

type Props = {
   onSubmit: (data: FormData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const handleFormSubmit = handleSubmit((data) => {
      reset({ prompt: '' }); // clears input after submit
      onSubmit(data);
   });

   const onKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleFormSubmit();
      }
   };
   return (
      <div>
         <form
            onSubmit={handleFormSubmit}
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

export default ChatInput;
