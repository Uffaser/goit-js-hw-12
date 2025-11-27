import { refs } from '../main';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = new SimpleLightbox('.gallery-item a');

export function createGallery(images) {
    const markup = images
        .map(
            image =>
                `<li class="gallery-item">
            <a href="${image.largeImageURL}">
            <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
            </a>
            <div class="gallery-desc-box">
                <p class="gallery-desc-title">Likes
                    <span class="gallery-desc">${image.likes}</span></p>
                <p class="gallery-desc-title">Views
                    <span class="gallery-desc">${image.views}</span></p>
                <p class="gallery-desc-title">Comments
                    <span class="gallery-desc">${image.comments}</span></p>
                <p class="gallery-desc-title">Downloads
                    <span class="gallery-desc">${image.downloads}</span></p>
            </div>
        </li>`
        )
        .join('');

    refs.galleryList.insertAdjacentHTML('beforeend', markup);

    gallery.options.captionsData = 'alt';
    gallery.refresh();
}

export function clearGallery() {
    refs.galleryList.innerHTML = '';
}

export function showLoader() {
    refs.loader.classList.remove('hidden');
}

export function hideLoader() {
    refs.loader.classList.add('hidden');
}
export function showLoadMoreButton() {
    refs.loadMore.classList.remove('hidden');
}

export function hideLoadMoreButton() {
    refs.loadMore.classList.add('hidden');
}
