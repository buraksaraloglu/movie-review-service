import { Request, Response } from 'express';

import {
  getAllReviews,
  getReviewOfMovie,
  createReview,
  updateReview,
} from '@/service/review.service';

const getUserIdFromRequest = (req: Request) => {
  const userId = Array.isArray(req.headers.user)
    ? req.headers.user[0]
    : req.headers.user;
  if (!userId) {
    throw new Error('[getUserIdFromRequest]: UserId is not set');
  }

  return userId;
};

export const getReviewOfMovieController = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = getUserIdFromRequest(req);

    const movieId = req.params.movieId;
    if (!movieId) {
      throw new Error("Bad request: 'movieId' is not set");
    }

    const reviews = await getReviewOfMovie({ userId, movieId });

    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const getAllReviewsController = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromRequest(req);
    const pagination = req.query
      ? {
          limit:
            typeof req.query.limit === 'string'
              ? parseInt(req.query.limit)
              : 20,
          skip:
            typeof req.query.skip === 'string' ? parseInt(req.query.skip) : 0,
        }
      : undefined;

    const reviews = await getAllReviews(userId, pagination);

    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const createReviewController = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromRequest(req);
    const newReview = req.body;
    const movieId = req.params.movieId;

    if (!movieId) {
      throw new Error('[createReviewController]: MovieId is not set');
    }
    // TODO: Validate if movieId exists

    const review = await createReview({
      userId,
      review: { ...newReview, movieId },
    });

    return res.status(200).send(review);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const updateReviewController = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromRequest(req);
    const movieId = req.params.movieId;
    const newReview = req.body;

    const review = await updateReview({
      userId,
      review: { ...newReview, movieId },
    });

    return res.status(200).send(review);
  } catch (error) {
    return res.status(400).send(error);
  }
};
