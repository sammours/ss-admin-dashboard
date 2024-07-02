import { createReducer, on } from '@ngrx/store';
import { ReducerState, StateType } from '@ss-admin-dashboard/util-common';

import { CommentActions as actions } from './comment.actions';
import { CommentModel } from '../../models';

export interface CommentState extends ReducerState {
   list: CommentModel[] | undefined;
}

export const commentReducerName = 'CommentReducer';
 export const initialState: CommentState = {
   isLoading: false,
   type: StateType.Initial,
   list: undefined
 };

export const commentReducer = createReducer(
   initialState,

   on(actions.getByProductId['[Comment]GetByProductIdLoading'], state => ({ ...state, isLoading: true, type: StateType.Loading})),
   on(actions.getByProductId['[Comment]GetByProductIdSuccess'], (state, action) => ({ ...state, isLoading: false, type: StateType.Loaded, list: action.payload })),
   on(actions.getByProductId['[Comment]GetByProductIdError'], state => ({ ...state, isLoading: false, type: StateType.Error })),
 );