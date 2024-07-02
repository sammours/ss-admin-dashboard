import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CommentState, commentReducerName } from "./comment.reducers";

export const selectFeature = createFeatureSelector<CommentState>(commentReducerName);

export const selectCommentList = createSelector(
  selectFeature,
  (state: CommentState ) => state.list
);