
import { createActionGroup, props } from '@ngrx/store';
import { MailPaginatedList } from '../../models/mail.model';
import { FilterOptions } from '@ss-admin-dashboard/util-common';

const source = 'Mail Api';
export const MailActions = {
   getAll: createActionGroup({
      source: source,
      events: {
        '[Mail] Get all loading': props<{ filter: FilterOptions }>(),
        '[Mail] Get all success': props<{ payload: MailPaginatedList }>(),
        '[Mail] Get all error': props<{ error: string }>(),
      },
    })
}
