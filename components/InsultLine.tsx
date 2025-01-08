import { useState, useEffect } from 'react';
import { fetchData } from '@/app/utils/api'; 

export function FlirtLine() {
  const [flirtLine, setFlirtLine] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData('flirt-lines')
      .then(data => {
        setFlirtLine(data.result);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch flirt line');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading flirt line...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-pink-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Flirt Line</h2>
      <p>{flirtLine}</p>
    </div>
  );
}

