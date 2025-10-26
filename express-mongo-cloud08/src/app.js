import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.routes.js';

const app = express();

app.use(cors());
app.use(express.json()); // para parsear JSON del body

app.use('/api/users', userRoutes);

export default app;
