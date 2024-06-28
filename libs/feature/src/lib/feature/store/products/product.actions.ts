
import { createActionGroup, props } from '@ngrx/store';
import { ProductModel } from '../../models/product.model';
import { FilterOptions, PaginatedList } from '@ss-admin-dashboard/util-common';

const source = 'Product Api';
export const ProductActions = {
   getAll: createActionGroup({
      source: source,
      events: {
        '[Product] Get all loading': props<{ filter: FilterOptions }>(),
        '[Product] Get all success': props<{ payload: PaginatedList<ProductModel> }>(),
        '[Product] Get all error': props<{ error: string }>(),
      },
    }),
    getById: createActionGroup({
      source: source,
      events: {
        '[Product] Get by id loading': props<{ id: string }>(),
        '[Product] Get by id success': props<{ payload: ProductModel | undefined }>(),
        '[Product] Get by id error': props<{ error: string }>(),
      },
    })    
}
