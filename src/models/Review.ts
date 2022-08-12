import { Document, model, Schema } from 'mongoose';

export interface ReviewInput {
  rating: number;
  comment: string;
  movieId: Document['_id'];
}

export interface UpdateReviewInput {
  rating?: number;
  comment?: string;
  movieId: Document['_id'];
}

export interface ReviewDocument extends Document, ReviewInput {
  userId: Document['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema(
  {
    rating: { type: Number, default: true },
    comment: { type: String, default: '' },
    movieId: { type: Schema.Types.ObjectId },
    userId: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  },
);

const ReviewModel = model<ReviewDocument>('Review', reviewSchema);

export default ReviewModel;
