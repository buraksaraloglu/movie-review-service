import express from 'express';

import {
  getAllReviewsController,
  getReviewOfMovieController,
  createReviewController,
  updateReviewController,
} from '@/controllers/review.controller';
import validateResource from '@/middleware/validateResource';
import {
  createReviewSchema,
  getAllReviewsSchema,
  requireUserSchema,
  updateReviewSchema,
} from '@/schema/review.schema';

const router = express.Router();

router.get(
  '/',
  validateResource(requireUserSchema),
  validateResource(getAllReviewsSchema),
  getAllReviewsController,
);
router.get(
  '/:movieId',
  validateResource(requireUserSchema),
  getReviewOfMovieController,
);
router.post(
  '/:movieId',
  validateResource(createReviewSchema),
  validateResource(requireUserSchema),
  createReviewController,
);
router.put(
  '/:movieId',
  validateResource(updateReviewSchema),
  validateResource(requireUserSchema),
  updateReviewController,
);

export default router;
