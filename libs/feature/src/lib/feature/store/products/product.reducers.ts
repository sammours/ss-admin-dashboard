import { createReducer, on } from '@ngrx/store';
import { PaginatedList, ReducerState, StateType } from '@ss-admin-dashboard/util-common';

import { ProductActions as actions } from './product.actions';
import { ProductModel } from '../../models/product.model';

export interface ProductState extends ReducerState {
   list: PaginatedList<ProductModel> | undefined;
   item: ProductModel | undefined;
   items: ProductModel[] | undefined;
}

export const productReducerName = 'ProductReducer';
 export const initialState: ProductState = {
   isLoading: false,
   type: StateType.Initial,
   list: undefined,
   item: undefined,
   items: undefined,
 };

export const productReducer = createReducer(
   initialState,
   on(actions.getAll['[Product]GetAllLoading'], state => ({ ...state, isLoading: true, type: StateType.Loading})),
   on(actions.getAll['[Product]GetAllSuccess'], (state, action) => ({ ...state, isLoading: false, type: StateType.Loaded, list: action.payload })),
   on(actions.getAll['[Product]GetAllError'], state => ({ ...state, isLoading: false, type: StateType.Error })),

   on(actions.getById['[Product]GetByIdLoading'], state => ({ ...state, isLoading: true, type: StateType.Loading})),
   on(actions.getById['[Product]GetByIdSuccess'], (state, action) => ({ ...state, isLoading: false, type: StateType.Loaded, item: action.payload })),
   on(actions.getById['[Product]GetByIdError'], state => ({ ...state, isLoading: false, type: StateType.Error })),

   on(actions.getByIds['[Product]GetByIdsLoading'], state => ({ ...state, isLoading: true, type: StateType.Loading, items: undefined})),
   on(actions.getByIds['[Product]GetByIdsSuccess'], (state, action) => ({ ...state, isLoading: false, type: StateType.Loaded, items: action.payload })),
   on(actions.getByIds['[Product]GetByIdsError'], state => ({ ...state, isLoading: false, type: StateType.Error })),

   on(actions.reset, () => ({ ...initialState })),
 );