import { Router } from 'express';

import ReminderMailRouting from './cron/index.ts';

const Routing = Router();

// Health check endpoint
Routing.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

Routing.use('/cron', ReminderMailRouting);

export { Routing };
