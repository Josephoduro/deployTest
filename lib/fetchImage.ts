
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

export const fetchImages = async (query: string): Promise<string> => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: { query, per_page: 1 },
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
    }
  });

  return response.data.results[0]?.urls?.small || '';
};
