
import { createActionGroup, props } from '@ngrx/store';
import { UserModel } from '../../models/user.model';
import { FilterOptions, PaginatedList } from '@ss-admin-dashboard/util-common';

const source = 'User Api';
export const UserActions = {
   getAll: createActionGroup({
      source: source,
      events: {
        '[User] Get all loading': props<{ filter: FilterOptions }>(),
        '[User] Get all success': props<{ payload: PaginatedList<UserModel> }>(),
        '[User] Get all error': props<{ error: string }>(),
      },
    }),
    getById: createActionGroup({
      source: source,
      events: {
        '[User] Get by id loading': props<{ id: string }>(),
        '[User] Get by id success': props<{ payload: UserModel | undefined }>(),
        '[User] Get by id error': props<{ error: string }>(),
      },
    })    
}
