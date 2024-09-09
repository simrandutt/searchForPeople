import axios from 'axios';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

// Fetch the list of all people from SWAPI
export const fetchPeople = async () => {
  const response = await axios.get(`${SWAPI_BASE_URL}/people/`); // API request to fetch all people
  return response.data.results; // Return the list of people
};

// Search for specific people in SWAPI based on the query
export const searchPeople = async (query: string) => {
  const response = await axios.get(`${SWAPI_BASE_URL}/people/?search=${query}`); // API request with search query
  return response.data.results; // Return the search results
};
