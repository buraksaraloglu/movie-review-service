import { union, object, string, number } from 'zod';

export const requireUserSchema = object({
  headers: object({
    user: string({
      description: 'User id',
      required_error: 'user is required',
    }),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateReviewInput:
 *      type: object
 *      required:
 *        - rating
 *        - movieId
 *         - userId
 *      properties:
 *        rating:
 *          type: number
 *          description: Rating of the movie

 *       userId:
 *         type: string
 *         description: User id
 *       comment:
 *         type: string
 *         description: Comment on the movie
 *    CreateReviewResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        rating:
 *          type: string
 *        comment:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
export const createReviewSchema = object({
  body: object({
    rating: number({
      description: 'Rating of the movie',
      required_error: 'rating is required',
    })
      .min(0)
      .max(10),
    comment: string({
      description: 'Comment on the movie',
    }).optional(),
  }),
});

export const getMovieSchema = object({
  params: object({
    id: string({
      description: 'Movie id',
    }),
  }),
  headers: object({
    user: string({
      description: 'User id',
      required_error: 'user is required',
    }),
  }),
});
