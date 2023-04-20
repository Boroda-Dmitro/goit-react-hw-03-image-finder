// https://pixabay.com/api/?q=cat&page=1&key=34143834-71f54a932c118a9a307ce5c6b&image_type=photo&orientation=horizontal&per_page=12
import axios from 'axios';

export const fetchImages = async (q, page = 1) => {
  const URL = 'https://pixabay.com/api/';
  const KEY = '34143834-71f54a932c118a9a307ce5c6b';

  const options = new URLSearchParams({
    key: KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 12,
  });
  try {
    const imagesArr = await axios.get(`${URL}?${options}`);
    return imagesArr.data.hits;
  } catch (error) {
    console.log(error);
  }
};
