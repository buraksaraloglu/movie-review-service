import { FilterQuery, UpdateQuery } from 'mongoose';

import ReviewModel, {
  ReviewDocument,
  ReviewInput,
  UpdateReviewInput,
} from '@/models/Review';

export const getAllReviews = async (
  userId: string,
  { limit, skip }: { limit: number; skip: number },
  filters?: { movies?: string[] },
): Promise<ReviewDocument[]> => {
  const query: FilterQuery<ReviewDocument> = {
    userId,
  };

  if (filters) {
    if (filters.movies) {
      query.movieId = { $in: filters.movies };
    }
  }

  const reviews = await ReviewModel.find(query)
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  return reviews;
};

export const getReviewOfMovie = async ({
  userId,
  movieId,
}: {
  userId: string;
  movieId: ReviewInput['movieId'];
}): Promise<ReviewDocument> => {
  const query: FilterQuery<ReviewDocument> = {
    userId,
    movieId,
  };

  const review = await ReviewModel.findOne(query);

  return review;
};

export const createReview = async ({
  userId,
  review,
}: {
  userId: string;
  review: ReviewInput;
}): Promise<ReviewDocument> => {
  const query: FilterQuery<ReviewDocument> = {
    userId,
    movieId: review.movieId,
  };
  const existingReview = await ReviewModel.findOne(query);
  if (existingReview) {
    throw new Error('Review already exists');
  }
  const newReview = new ReviewModel({
    ...review,
    userId,
  });
  const createdReview = await newReview.save();

  return createdReview;
};

export const updateReview = async ({
  userId,
  review,
}: {
  userId: string;
  review: UpdateReviewInput;
}): Promise<ReviewDocument> => {
  const query: FilterQuery<ReviewDocument> = {
    userId,
    movieId: review.movieId,
  };
  const update: UpdateQuery<ReviewDocument> = {
    $set: {
      ...review,
    },
  };
  const updatedReview = await ReviewModel.findOneAndUpdate(query, update, {
    new: true,
  });

  return updatedReview;
};
