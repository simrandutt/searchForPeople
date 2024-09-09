import express from 'express';
import peopleRoutes from './routes/peopleRoutes';

const app = express();

app.use('/api', peopleRoutes);

export default app;
