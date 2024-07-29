import axios from 'axios';

const PIXABAY_API_KEY = '45168635-21f4e9939fc2f3eadc718f598';

export const fetchImages = async (query: string): Promise<string> => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: PIXABAY_API_KEY,
        q: query,
        image_type: 'photo',
        per_page: 1,
      },
    });

    if (response.data.hits.length > 0) {
      return response.data.hits[0].webformatURL;
    } else {
      throw new Error('No images found');
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    return ''; // Return an empty string or a placeholder image URL
  }
};
