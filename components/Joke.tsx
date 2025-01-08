import { useState, useEffect } from 'react';
import { fetchData } from '@/app/utils/api'; 
export function Joke() {
  const [joke, setJoke] = useState({ setup: '', punchline: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData('jokes')
      .then(data => {
        setJoke(data.result);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch joke');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading joke...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-yellow-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Joke</h2>
      <p>{joke.setup}</p>
      <p className="font-bold mt-2">{joke.punchline}</p>
    </div>
  );
}

