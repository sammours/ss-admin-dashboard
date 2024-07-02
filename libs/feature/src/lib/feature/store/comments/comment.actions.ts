
import { createActionGroup, props } from '@ngrx/store';
import { CommentModel } from '../../models';

const source = 'Comment Api';
export const CommentActions = {
    getByProductId: createActionGroup({
      source: source,
      events: {
        '[Comment] Get by product id loading': props<{ productId: string }>(),
        '[Comment] Get by product id success': props<{ payload: CommentModel[] | undefined }>(),
        '[Comment] Get by product id error': props<{ error: string }>(),
      },
    })    
}
