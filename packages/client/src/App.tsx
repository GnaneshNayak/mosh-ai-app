import { useEffect, useState } from 'react';

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
    <div>
      <h1 className="h-16 text-9xl font-bold">{message}</h1>
    </div>
  );
};

export default App;
