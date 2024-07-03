
import { createActionGroup, props } from '@ngrx/store';
import { OrderModel } from '../../models/order.model';
import { FilterOptions, PaginatedList } from '@ss-admin-dashboard/util-common';

const source = 'Order Api';
export const OrderActions = {
   getAll: createActionGroup({
      source: source,
      events: {
        '[Order] Get all loading': props<{ filter: FilterOptions }>(),
        '[Order] Get all success': props<{ payload: PaginatedList<OrderModel> }>(),
        '[Order] Get all error': props<{ error: string }>(),
      },
    }),
    getById: createActionGroup({
      source: source,
      events: {
        '[Order] Get by id loading': props<{ id: string }>(),
        '[Order] Get by id success': props<{ payload: OrderModel | undefined }>(),
        '[Order] Get by id error': props<{ error: string }>(),
      },
    })    
}
