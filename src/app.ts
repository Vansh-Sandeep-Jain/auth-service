// src/app.ts
import express, { Request, Response } from 'express';

const app = express();

// Basic Hello World route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

export default app;
