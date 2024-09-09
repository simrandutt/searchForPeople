import axios from 'axios';
import { fetchPeople, searchPeople } from '../api/swapi';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SWAPI API Functions', () => {
  it('should fetch all people', async () => {
    const mockResponse = { data: { results: [{ name: 'Luke Skywalker' }] } };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const people = await fetchPeople();
    expect(people).toEqual([{ name: 'Luke Skywalker' }]);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/people/');
  });

  it('should search people by query', async () => {
    const mockResponse = { data: { results: [{ name: 'Darth Vader' }] } };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const people = await searchPeople('darth');
    expect(people).toEqual([{ name: 'Darth Vader' }]);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/people/?search=darth');
  });
});
