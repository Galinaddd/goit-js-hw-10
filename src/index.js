import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 500;

const inputRef = document.querySelector('#search-box');
const listRef = document.querySelector('.country-list');
const infoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const name = evt.target.value.trim();
  if (!name) {
    infoRef.innerHTML = '';
    listRef.innerHTML = '';
    return;
  }

  fetchCountries(name)
    .then(data => {
      createMarkup(data);
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function createMarkup(arr) {
  let markup = '';

  const coutriesNumber = arr.length;

  if (coutriesNumber > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (coutriesNumber > 2) {
    createListMarkup(arr);
  } else {
    createCardMarkup(arr);
  }
}

function createListMarkup(arr) {
  listRef.innerHTML = arr
    .map(
      item =>
        `<li ><img src="${item.flags.svg}" alt="flag of ${item.name} " width ="50px">
         <h2>${item.name}</h2> </li>`
    )
    .join('');
}

function createCardMarkup(arr) {
  listRef.innerHTML = arr
    .map(
      item => `<img src="${item.flags.svg}" alt="flag of ${
        item.name
      } " width ="100px">
         <h2>${item.name}</h2>
         <span>Capital: ${item.capital}</span>
         <span>Population: ${item.population}</span>
         <span>Languages: ${item.languages
           .map(item => item.name)
           .join(',')}</span>`
    )
    .join('');
}
