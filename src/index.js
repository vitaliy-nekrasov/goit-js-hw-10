import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

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
  fetchCountries(countryName)
    .then(arrayOfCountries => {
      clearMarkup();
      if (arrayOfCountries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      arrayOfCountries.forEach(countryObject => {
        if (arrayOfCountries.length > 1) {
          addCountriesListMarkup(countryObject);
        } else {
          addCountryInfoMarkup(countryObject);
        }
      });
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function addCountriesListMarkup({ flags, name }) {
  const string = `<li><img src="${flags.svg}" alt=""><p>${name.official}</p></li>`;
  countryListEl.insertAdjacentHTML('afterbegin', string);
}

function addCountryInfoMarkup({ flags, name, capital, population, languages }) {
  const string = `<img src="${flags.svg}" alt="" />
      <h1>${name.official}</h1>
      <p>Capital: <span>${capital}</span></p>
      <p>Population: <span>${population}</span></p>
      <p>Languages: <span>${Object.values(languages).join(', ')}</span></p>`;
  countyInfoEl.insertAdjacentHTML('afterbegin', string);
}

function clearMarkup() {
  countryListEl.innerHTML = '';
  countyInfoEl.innerHTML = '';
}
