const API_KEY = '4aeb57e3ed0f238762';
const BASE_URL = 'https://api.nexoracle.com/misc';

export async function fetchData(endpoint: string) {
  const response = await fetch(`${BASE_URL}/${endpoint}?apikey=${API_KEY}`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

