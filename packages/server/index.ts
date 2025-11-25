import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import type { Request, Response } from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the server!' });
});
app.get('/api/message', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
