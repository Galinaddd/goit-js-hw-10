const BASE_URL = 'https://restcountries.com/v2/name/';
const SERCH_REQUEST = 'name,capital,population,flags,languages';
// const

function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?fields=${SERCH_REQUEST}`).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    return responce.json();
  });
}

export { fetchCountries };
