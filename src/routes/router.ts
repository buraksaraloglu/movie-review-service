import express from 'express';

import healthRouter from './health';
import reviewRouter from './review';

const router = express.Router();

// TODO: Could've implement a versioning scheme to allow for multiple versions of the API
router.use('/health', healthRouter);
router.use('/review', reviewRouter);

export default function initRouter(app: express.Application) {
  app.use(router);
}
