import { Router } from 'express';
import { getPeople, searchPerson } from '../controllers/peopleController'; 

// instance of the Express router
const router = Router();

// route to get the list of people
router.get('/people', getPeople);

// route to search people based on query
router.get('/people/search', searchPerson);

export default router;
