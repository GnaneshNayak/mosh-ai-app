import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';

const App = () => {
   const [message, setMessage] = useState('');

   function fetchMessage() {
      fetch('/api/message')
         .then((res) => res.json())
         .then((data) => setMessage(data.message))
         .catch((err) => console.error('Error fetching message:', err));
   }

   useEffect(() => {
      fetchMessage();
   }, []);
   return (
      <div className="p-4">
         <h1 className="text-2xl font-bold">{message}</h1>
         <Button variant="destructive">click me</Button>
      </div>
   );
};

export default App;
