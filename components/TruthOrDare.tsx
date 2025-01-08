import { useState, useEffect } from 'react';
import { fetchData } from '@/app/utils/api'; 

export function TruthOrDare() {
  const [truth, setTruth] = useState('');
  const [dare, setDare] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetchData('truth'),
      fetchData('dare')
    ])
      .then(([truthData, dareData]) => {
        setTruth(truthData.result);
        setDare(dareData.result);
        setIsLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch truth or dare');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading truth and dare...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-purple-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Truth or Dare</h2>
      <div>
        <h3 className="font-bold">Truth:</h3>
        <p>{truth}</p>
      </div>
      <div className="mt-2">
        <h3 className="font-bold">Dare:</h3>
        <p>{dare}</p>
      </div>
    </div>
  );
}

