const TypingIndicator = () => {
   return (
      <div className="flex gap-1 px-3 py-2 bg-gray-200 self-start rounded-lg">
         <Dots className="" />
         <Dots className="[animation-delay:0.2s]" />
         <Dots className="[animation-delay:0.4s]" />
      </div>
   );
};

export default TypingIndicator;

type DotsProps = {
   className: string;
};
const Dots = ({ className }: DotsProps) => {
   return (
      <div
         className={`rounded-full bg-gray-800 animate-pulse w-2 h-2 ${className}`}
      ></div>
   );
};
