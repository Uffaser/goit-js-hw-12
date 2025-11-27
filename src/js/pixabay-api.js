import axios from 'axios';
import { PER_PAGE } from '../main';

export async function getImagesByQuery(query, page) {
    const response = await axios.get('https://pixabay.com/api/', {
        params: {
            key: '53361036-d6c3e8b24991f3de089666c85',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: PER_PAGE,
            page: page,
        },
    });

    return response.data;
}
