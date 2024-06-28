import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState, userReducerName } from "./user.reducers";

export const selectFeature = createFeatureSelector<UserState>(userReducerName);

export const selectUserList = createSelector(
  selectFeature,
  (state: UserState) => state.list
);

export const selectIsLoading = createSelector(
  selectFeature,
  (state: UserState) => state.isLoading
);

export const selectUser = createSelector(
  selectFeature,
  (state: UserState) => state.item
);