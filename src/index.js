import { fetchImages } from "./fetchImages";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const mainInput = document.querySelector('.search-form-input');
const onBtnSearch = document.querySelector('.search-form-button');
const imgGallery = document.querySelector('.gallery');
const onBtnLoad = document.querySelector('.load-more');
let imgSimpleLightbox = new SimpleLightbox('.gallery a');
onBtnLoad.style.display = 'none';
let pageNum = 1;

onBtnSearch.addEventListener('click', async (elem) => {
    elem.preventDefault();
    cleanList();
    const getValue = mainInput.value.trim();
    if (getValue !== '') {
      try {
      const setResponse = await fetchImages(getValue, pageNum)
        if (setResponse.hits.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          renderImageList(setResponse.hits);
          Notiflix.Notify.success(
            `Hooray! We found ${setResponse.totalHits} images.`
          );
          imgSimpleLightbox.refresh();
          onBtnLoad.style.display = 'block';
        }
      } catch(error){
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      };
    }
  });
  
  onBtnLoad.addEventListener('click', () => {
    pageNum+=1;
    const getValue = mainInput.value.trim();

    fetchImages(getValue, pageNum).then(name => {
      let totalPages = Math.ceil(name.totalHits / perPage);
      renderImageList(name.hits);
      if (pageNum >= totalPages) {
        onBtnLoad.style.display = 'block';
        console.log('There are no more images');
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")}
    });
  });
  
  function renderImageList(images) {
    console.log(images, 'images');
    const imgMarkup = images
      .map(image => {
        console.log('img', image);
        return `<div class="photo-card">
         <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>
          <div class="info">
             <p class="info-item">
      <b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
  </p>
              <p class="info-item">
                  <b>Views</b> <span class="info-item-api">${image.views}</span>  
              </p>
              <p class="info-item">
                  <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
              </p>
              <p class="info-item">
                  <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
              </p>
          </div>
      </div>`;
      })
      .join('');
    imgGallery.innerHTML += imgMarkup;
  }
  
  function cleanList() {
    onBtnLoad.style.display = 'none';
    imgGallery.innerHTML = '';
    pageNum = 1;
  }