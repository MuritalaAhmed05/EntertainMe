import { useState, useEffect } from 'react';
import { fetchData } from '@/app/utils/api'; 

export function Quote() {
  const [quote, setQuote] = useState({ body: '', author: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData('quotes')
      .then(data => {
        setQuote(data.result);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch quote');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading quote...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-green-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Quote</h2>
      <p>"{quote.body}"</p>
      <p className="text-right mt-2">- {quote.author}</p>
    </div>
  );
}

