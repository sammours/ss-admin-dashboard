import { createReducer, on } from '@ngrx/store';
import { ReducerState, StateType } from '@ss-admin-dashboard/util-common';

import { MailActions as actions } from './mail.actions';
import { MailPaginatedList } from '../../models/mail.model';

export interface MailState extends ReducerState {
   list: MailPaginatedList | undefined;
}

export const mailReducerName = 'MailReducer';
 export const initialState: MailState = {
   isLoading: false,
   type: StateType.Initial,
   list: undefined,
 };

export const mailReducer = createReducer(
   initialState,
   on(actions.getAll['[Mail]GetAllLoading'], state => ({ ...state, isLoading: true, type: StateType.Loading})),
   on(actions.getAll['[Mail]GetAllSuccess'], (state, action) => ({ ...state, isLoading: false, type: StateType.Loaded, list: action.payload })),
   on(actions.getAll['[Mail]GetAllError'], state => ({ ...state, isLoading: false, type: StateType.Error })),
 );