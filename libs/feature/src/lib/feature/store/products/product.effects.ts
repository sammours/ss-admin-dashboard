import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';

import { ProductActions as actions } from './product.actions';
import { ProductsService } from '../../services/product.service';

@Injectable()
export class ProductEffects {
   constructor(
     private actions$: Actions,
     private service: ProductsService
   ) {}

   getAll$ = createEffect(() => this.actions$.pipe(
      ofType(actions.getAll['[Product]GetAllLoading']),
      debounceTime(300),
      switchMap((action) => this.service.getAll(action.filter)
        .pipe(
          map(result => actions.getAll['[Product]GetAllSuccess']({ payload: result })),
          catchError(() => of(actions.getAll['[Product]GetAllError']({ error: 'error has occur' }))),
        ))
      )
    );

    getById$ = createEffect(() => this.actions$.pipe(
      ofType(actions.getById['[Product]GetByIdLoading']),
      debounceTime(300),
      switchMap((action) => this.service.getById(action.id)
        .pipe(
          map(result => actions.getById['[Product]GetByIdSuccess']({ payload: result })),
          catchError(() => of(actions.getById['[Product]GetByIdError']({ error: 'error has occur' }))),
        ))
      )
    );

    getByIds$ = createEffect(() => this.actions$.pipe(
      ofType(actions.getByIds['[Product]GetByIdsLoading']),
      debounceTime(300),
      switchMap((action) => this.service.getByIds(action.ids)
        .pipe(
          map(result => actions.getByIds['[Product]GetByIdsSuccess']({ payload: result })),
          catchError(() => of(actions.getByIds['[Product]GetByIdsError']({ error: 'error has occur' }))),
        ))
      )
    );
}
