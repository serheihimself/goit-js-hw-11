import { fetchImages } from "./fetchImages";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-form-input');
const btnSearch = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

btnLoadMore.style.display = 'none';

let pageNumber = 1;

btnSearch.addEventListener('click', e => {
    e.preventDefault();
    cleanGallery();
    const trimmedValue = input.value.trim();
    if (trimmedValue !== '') {
      fetchImages(trimmedValue, pageNumber).then(foundData => {
        if (foundData.hits.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          renderImageList(foundData.hits);
          Notiflix.Notify.success(
            `Hooray! We found ${foundData.totalHits} images.`
          );
          btnLoadMore.style.display = 'block';
          gallerySimpleLightbox.refresh();
        }
      });
    }
  });
  
  