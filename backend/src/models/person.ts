import { z } from 'zod';

// Zod schema to validate the structure of each person object
export const PeopleSchema = z.object({
  name: z.string(), 
  height: z.string(), 
  mass: z.string(), 
  gender: z.string(), 
});
