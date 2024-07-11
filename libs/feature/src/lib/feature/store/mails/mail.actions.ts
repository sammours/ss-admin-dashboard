
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MailModel, MailPaginatedList } from '../../models/mail.model';
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
    }),
    getLastEmail: createActionGroup({
      source: source,
      events: {
        '[Mail] Get last email loading': emptyProps(),
        '[Mail] Get last email success': props<{ payload: MailModel }>(),
        '[Mail] Get last email error': props<{ error: string }>(),
      },
    })
}
