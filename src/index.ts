import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello, TypeScript + Node!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
