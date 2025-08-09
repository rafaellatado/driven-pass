import express, { Express } from 'express';
import dotenv from 'dotenv';
import healthRouter from './routers/healthRouter';
import authRouter from './routers/authRouter';
import errorHandler from './middlewares/errorHandler';
import credentialRouter from './routers/credentialRouter';

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 4000;

// Middlewares
app.use(express.json());

// Routers
app.use(healthRouter);
app.use(authRouter);
app.use(credentialRouter);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
