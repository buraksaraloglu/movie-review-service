import express from 'express';

import {
  // getAllMoviesController,
  // getMovieByIdController,
  getReviewOfMovieController,
  // getAllReviewsOfMovieController,
  createReviewController,
  updateReviewController,
} from '@/controllers/review.controller';
import validateResource from '@/middleware/validateResource';
import {
  createReviewSchema,
  // getMovieSchema,
  requireUserSchema,
} from '@/schema/review.schema';

const router = express.Router();

// router.get('/', validateResource(requireUserSchema), getAllMoviesController);
// router.get('/:id', validateResource(getMovieSchema), getMovieByIdController);
router.get(
  '/:movieId',
  validateResource(requireUserSchema),
  getReviewOfMovieController,
);
// router.get('/:movieId/all', getAllReviewsOfMovieController);
router.post(
  '/:movieId',
  validateResource(createReviewSchema),
  validateResource(requireUserSchema),
  createReviewController,
);
router.put(
  '/:movieId',
  validateResource(createReviewSchema),
  validateResource(requireUserSchema),
  updateReviewController,
);

export default router;
