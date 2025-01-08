import { useState, useEffect } from 'react';
import { fetchData } from '@/app/utils/api'; 

export function Fact() {
  const [fact, setFact] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData('facts')
      .then(data => {
        setFact(data.result.fact);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch fact');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading fact...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Fact</h2>
      <p>{fact}</p>
    </div>
  );
}

