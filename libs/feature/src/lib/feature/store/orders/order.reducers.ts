import { createReducer, on } from '@ngrx/store';
import { PaginatedList, ReducerState, StateType } from '@ss-admin-dashboard/util-common';

import { OrderActions as actions } from './order.actions';
import { OrderModel } from '../../models/order.model';

export interface OrderState extends ReducerState {
   list: PaginatedList<OrderModel> | undefined;
   item: OrderModel | undefined;
}

export const orderReducerName = 'OrderReducer';
 export const initialState: OrderState = {
   isLoading: false,
   type: StateType.Initial,
   list: undefined,
   item: undefined
 };

export const orderReducer = createReducer(
   initialState,
   on(actions.getAll['[Order]GetAllLoading'], state => ({ ...state, isLoading: true, type: StateType.Loading})),
   on(actions.getAll['[Order]GetAllSuccess'], (state, action) => ({ ...state, isLoading: false, type: StateType.Loaded, list: action.payload })),
   on(actions.getAll['[Order]GetAllError'], state => ({ ...state, isLoading: false, type: StateType.Error })),

   on(actions.getById['[Order]GetByIdLoading'], state => ({ ...state, isLoading: true, type: StateType.Loading})),
   on(actions.getById['[Order]GetByIdSuccess'], (state, action) => ({ ...state, isLoading: false, type: StateType.Loaded, item: action.payload })),
   on(actions.getById['[Order]GetByIdError'], state => ({ ...state, isLoading: false, type: StateType.Error })),
 );