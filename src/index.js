import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const { inputEl, countryListEl, countyInfoEl } = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countyInfoEl: document.querySelector('.country-info'),
};

inputEl.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(evt) {
  const countryName = evt.target.value.trim();
  if (countryName === '') {
    clearMarkup();
    return;
  }
  fetchCountries(countryName).then(arrayOfCountries => {
    clearMarkup();
    arrayOfCountries.forEach(countryObject => {
      if (arrayOfCountries.length > 1) {
        addCountriesListMarkup(countryObject);
      }
    });
  });
}

function addCountriesListMarkup(countryObject) {
  const string = `<li><img src="${countryObject.flags.svg}" alt=""><p>${countryObject.name.official}</p></li>`;
  countryListEl.insertAdjacentHTML('afterbegin', string);
}

function clearMarkup() {
  countryListEl.innerHTML = '';
}
