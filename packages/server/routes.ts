import type { Request, Response } from 'express';
import express from 'express';
import { chatController } from './controller/chat.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the server!' });
});

router.post('/api/chat', chatController.sendMessage);

export default router;
