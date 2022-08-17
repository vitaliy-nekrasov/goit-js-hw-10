const BASE_URL = 'https://restcountries.com/v3.1';
const options = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  //   toString(name);

  return fetch(`${BASE_URL}/name/${name}?${options}`)
    .then(response => response.json())
    .then(array => {
      return array;
    });
}
