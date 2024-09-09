import { Request, Response } from 'express';
import { getPeople, searchPerson } from '../controllers/peopleController';
import { fetchPeople, searchPeople } from '../api/swapi';
import { PeopleSchema } from '../models/person';

// Mock SWAPI functions
jest.mock('../api/swapi');
const mockFetchPeople = fetchPeople as jest.Mock;
const mockSearchPeople = searchPeople as jest.Mock;

// Mock request and response
const mockRequest = (params: any = {}, query: any = {}) => ({ params, query } as Request);
const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('People Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of people', async () => {
    const mockRes = mockResponse();
    const mockPeople = [{ name: 'Luke Skywalker', height: '172', mass: '77', gender: 'male' }];
    mockFetchPeople.mockResolvedValue(mockPeople);

    await getPeople(mockRequest(), mockRes);

    expect(mockFetchPeople).toHaveBeenCalledTimes(1);
    // Use map and pass only the person object to PeopleSchema.parse
    expect(mockRes.json).toHaveBeenCalledWith(mockPeople.map((person) => PeopleSchema.parse(person)));
  });

  it('should return search results for a query', async () => {
    const mockRes = mockResponse();
    const mockPeople = [{ name: 'Darth Vader', height: '202', mass: '136', gender: 'male' }];
    mockSearchPeople.mockResolvedValue(mockPeople);

    await searchPerson(mockRequest({}, { query: 'darth' }), mockRes);

    expect(mockSearchPeople).toHaveBeenCalledWith('darth');
    expect(mockRes.json).toHaveBeenCalledWith(mockPeople.map((person) => PeopleSchema.parse(person)));
  });

  it('should return 400 if query is missing', async () => {
    const mockRes = mockResponse();

    await searchPerson(mockRequest({}, {}), mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('Query parameter is required');
  });
});
