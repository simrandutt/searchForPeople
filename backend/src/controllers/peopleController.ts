import { Request, Response } from 'express';
import { fetchPeople, searchPeople } from '../api/swapi';
import { PeopleSchema } from '../models/person';

export const getPeople = async (req: Request, res: Response) => {
  try {
    const people = await fetchPeople(); // Fetch people from SWAPI
    // Validate each person using Zod schema
    const validatedPeople = people.map((person: any) => PeopleSchema.parse(person));
    res.json(validatedPeople); // Send validated people as JSON response
  } catch (error) {
    res.status(500).send('Error fetching people');
  }
};

// Controller to handle searching people by query from SWAPI
export const searchPerson = async (req: Request, res: Response) => {
  const { query } = req.query; // Extract query from request
  if (!query) {
    return res.status(400).send('Query parameter is required'); // Send error if no query provided
  }

  try {
    const people = await searchPeople(query as string); // Search people with query
    // Validate each person using Zod schema
    const validatedPeople = people.map((person: any) => PeopleSchema.parse(person));
    res.json(validatedPeople); // Send validated search results
  } catch (error) {
    res.status(500).send('Error searching people');
  }
};
