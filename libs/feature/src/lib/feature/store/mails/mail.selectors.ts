import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MailState, mailReducerName } from "./mail.reducers";

export const selectFeature = createFeatureSelector<MailState>(mailReducerName);

export const selectMailList = createSelector(
  selectFeature,
  (state: MailState) => state.list
);