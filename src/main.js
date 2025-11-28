import { getImagesByQuery } from './js/pixabay-api.js';
import {
    clearGallery,
    createGallery,
    hideLoader,
    hideLoadMoreButton,
    showLoader,
    showLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const refs = {
    form: document.querySelector('.form'),
    galleryList: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
    loadMore: document.querySelector('.more-btn'),
};

export const PER_PAGE = 15;

let userQuery;
let page = 1;

refs.form.addEventListener('submit', async e => {
    e.preventDefault();

    const searchText = e.target.elements.search.value.trim();

    userQuery = searchText;

    if (!searchText) {
        iziToast.error({
            message: 'The input field is empty. Please enter your query !',
            position: 'topRight',
        });
        return;
    }

    clearGallery();
    showLoader();

    if (page >= 1) {
        hideLoadMoreButton();
        page = 1;
    }

    try {
        const data = await getImagesByQuery(searchText, page);

        const images = data.hits;

        if (images.length === 0) {
            iziToast.error({
                message:
                    'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
        } else {
            createGallery(images);
            showLoadMoreButton();
        }
    } catch (error) {
        console.error(error);

        iziToast.error({
            message: `Sorry! We can't find that page. It may have been deleted or moved.`,
            position: 'topRight',
        });
    }

    hideLoader();

    refs.form.reset();
});

refs.loadMore.addEventListener('click', async () => {
    hideLoadMoreButton();
    showLoader();

    page++;

    try {
        const data = await getImagesByQuery(userQuery, page);

        const images = data.hits;

        if (images.length === 0) {
            iziToast.error({
                message:
                    'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
        } else {
            createGallery(images);
            showLoadMoreButton();
        }

        const cardSize =
            refs.galleryList.firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardSize.height * 2,
            behavior: 'smooth',
        });

        const totalHits = data.totalHits;
        const totalPages = Math.ceil(totalHits / PER_PAGE);

        if (page === totalPages) {
            iziToast.info({
                message: `We're sorry, but you've reached the end of search results.`,
                position: 'topRight',
            });
            hideLoadMoreButton();
        }
    } catch (error) {
        console.error(error);

        iziToast.error({
            message: `Sorry! We can't find that page. It may have been deleted or moved.`,
            position: 'topRight',
        });
    }

    hideLoader();
});
