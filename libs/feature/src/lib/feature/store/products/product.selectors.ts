import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState, productReducerName } from "./product.reducers";

export const selectFeature = createFeatureSelector<ProductState>(productReducerName);

export const selectProductList = createSelector(
  selectFeature,
  (state: ProductState) => state.list
);

export const selectIsLoading = createSelector(
  selectFeature,
  (state: ProductState) => state.isLoading
);

export const selectProduct = createSelector(
  selectFeature,
  (state: ProductState) => state.item
);

export const selectProducts = createSelector(
  selectFeature,
  (state: ProductState) => state.items
);