import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';

import { CommentActions as actions } from './comment.actions';
import { CommentsService } from '../../services/comment.service';

@Injectable()
export class CommentEffects {
   constructor(
     private actions$: Actions,
     private service: CommentsService
   ) {}

    GetByProductId$ = createEffect(() => this.actions$.pipe(
      ofType(actions.getByProductId['[Comment]GetByProductIdLoading']),
      debounceTime(300),
      switchMap((action) => this.service.getByProductId(action.productId)
        .pipe(
          map(result => actions.getByProductId['[Comment]GetByProductIdSuccess']({ payload: result })),
          catchError(() => of(actions.getByProductId['[Comment]GetByProductIdError']({ error: 'error has occur' }))),
        ))
      )
    );
}
