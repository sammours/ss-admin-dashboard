import { createReducer, on } from '@ngrx/store';
import { PaginatedList, ReducerState, StateType } from '@ss-admin-dashboard/util-common';

import { UserActions as actions } from './user.actions';
import { UserModel } from '../../models/user.model';

export interface UserState extends ReducerState {
   list: PaginatedList<UserModel> | undefined;
   item: UserModel | undefined;
}

export const userReducerName = 'UserReducer';
 export const initialState: UserState = {
   isLoading: false,
   type: StateType.Initial,
   list: undefined,
   item: undefined
 };

export const userReducer = createReducer(
   initialState,
   on(actions.getAll['[User]GetAllLoading'], state => ({ ...state, isLoading: true, type: StateType.Loading})),
   on(actions.getAll['[User]GetAllSuccess'], (state, action) => ({ ...state, isLoading: false, type: StateType.Loaded, list: action.payload })),
   on(actions.getAll['[User]GetAllError'], state => ({ ...state, isLoading: false, type: StateType.Error })),

   on(actions.getById['[User]GetByIdLoading'], state => ({ ...state, isLoading: true, type: StateType.Loading})),
   on(actions.getById['[User]GetByIdSuccess'], (state, action) => ({ ...state, isLoading: false, type: StateType.Loaded, item: action.payload })),
   on(actions.getById['[User]GetByIdError'], state => ({ ...state, isLoading: false, type: StateType.Error })),
 );