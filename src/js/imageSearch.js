import servise from './apiService';
import cardImeges from '../templates/templates.hbs';
import refs from './refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

refs.searchForm.addEventListener('submit', imageSearchInputHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);
refs.gallery.addEventListener('click', openImg);
refs.loadMoreBtn.classList.add('hidden');

function openImg(event) {
  if (event.target.nodeName === 'IMG') {
    const light = basicLightbox.create(
      `<img src="${event.target.dataset.source}" /> `,
    );

    light.show();
  }
}

function imageSearchInputHandler(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const input = form.elements.query;

  clearListItems();

  servise.resetPage();

  servise.searchQuerry = input.value;

  servise.fetcArticles().then(hits => {
    updateMarkup(hits);
  });
  input.value = '';
}

function loadMoreBtnHandler() {
  servise.fetcArticles().then(hits => {
    updateMarkup(hits);
    window.scrollTo(0, 100);

    window.scrollTo({
      top: 999999,
      behavior: 'smooth',
    });
  });
}

function updateMarkup(hits) {
  refs.loadMoreBtn.classList.remove('hidden');
  const markup = buildListItemsTemplate(hits);
  iserListItems(markup);
}

function iserListItems(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}

function buildListItemsTemplate(items) {
  return cardImeges(items);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}
