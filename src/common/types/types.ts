import z from 'zod';
import type {
  coverSchema,
  currentUserReactionSchema,
  imageSchema,
  tagSchema,
  userSchema,
} from '../schemas/schemas';

export type Tag = z.infer<typeof tagSchema>;
export type User = z.infer<typeof userSchema>;
export type Cover = z.infer<typeof coverSchema>;
export type Images = z.infer<typeof imageSchema>;
export type CurrentUserReaction = z.infer<typeof currentUserReactionSchema>;
