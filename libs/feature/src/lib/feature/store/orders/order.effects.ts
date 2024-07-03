import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';

import { OrderActions as actions } from './order.actions';
import { OrdersService } from '../../services/order.service';

@Injectable()
export class OrderEffects {
   constructor(
     private actions$: Actions,
     private service: OrdersService
   ) {}

   getAll$ = createEffect(() => this.actions$.pipe(
      ofType(actions.getAll['[Order]GetAllLoading']),
      debounceTime(300),
      switchMap((action) => this.service.getAll(action.filter)
        .pipe(
          map(result => actions.getAll['[Order]GetAllSuccess']({ payload: result })),
          catchError(() => of(actions.getAll['[Order]GetAllError']({ error: 'error has occur' }))),
        ))
      )
    );

    getById$ = createEffect(() => this.actions$.pipe(
      ofType(actions.getById['[Order]GetByIdLoading']),
      debounceTime(300),
      switchMap((action) => this.service.getById(action.id)
        .pipe(
          map(result => actions.getById['[Order]GetByIdSuccess']({ payload: result })),
          catchError(() => of(actions.getAll['[Order]GetAllError']({ error: 'error has occur' }))),
        ))
      )
    );
}
