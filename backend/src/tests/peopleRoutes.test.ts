import request from 'supertest';
import express from 'express';
import router from '../routes/peopleRoutes';
import { fetchPeople, searchPeople } from '../api/swapi';

// Mock SWAPI functions
jest.mock('../api/swapi');
const mockFetchPeople = fetchPeople as jest.Mock;
const mockSearchPeople = searchPeople as jest.Mock;

// Create an Express app with the router
const app = express();
app.use('/api', router);

describe('People Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /api/people should return a list of people', async () => {
    const mockPeople = [{ name: 'Luke Skywalker', height: '172', mass: '77', gender: 'male' }];
    mockFetchPeople.mockResolvedValue(mockPeople);

    const response = await request(app).get('/api/people');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPeople);
  });

  it('GET /api/people/search should return search results', async () => {
    const mockPeople = [{ name: 'Darth Vader', height: '202', mass: '136', gender: 'male' }];
    mockSearchPeople.mockResolvedValue(mockPeople);

    const response = await request(app).get('/api/people/search?query=darth');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPeople);
  });

  it('GET /api/people/search without query should return 400', async () => {
    const response = await request(app).get('/api/people/search');

    expect(response.status).toBe(400);
    expect(response.text).toBe('Query parameter is required');
  });
});
