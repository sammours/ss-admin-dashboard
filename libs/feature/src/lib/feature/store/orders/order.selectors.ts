import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrderState, orderReducerName } from "./order.reducers";

export const selectFeature = createFeatureSelector<OrderState>(orderReducerName);

export const selectOrderList = createSelector(
  selectFeature,
  (state: OrderState) => state.list
);

export const selectIsLoading = createSelector(
  selectFeature,
  (state: OrderState) => state.isLoading
);

export const selectOrder = createSelector(
  selectFeature,
  (state: OrderState) => state.item
);