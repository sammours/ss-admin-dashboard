import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';

import { UserActions as actions } from './user.actions';
import { UsersService } from '../../services/user.service';

@Injectable()
export class UserEffects {
   constructor(
     private actions$: Actions,
     private service: UsersService
   ) {}

   getAll$ = createEffect(() => this.actions$.pipe(
      ofType(actions.getAll['[User]GetAllLoading']),
      debounceTime(300),
      switchMap((action) => this.service.getAll(action.filter)
        .pipe(
          map(result => actions.getAll['[User]GetAllSuccess']({ payload: result })),
          catchError(() => of(actions.getAll['[User]GetAllError']({ error: 'error has occur' }))),
        ))
      )
    );

    getById$ = createEffect(() => this.actions$.pipe(
      ofType(actions.getById['[User]GetByIdLoading']),
      debounceTime(300),
      switchMap((action) => this.service.getById(action.id)
        .pipe(
          map(result => actions.getById['[User]GetByIdSuccess']({ payload: result })),
          catchError(() => of(actions.getAll['[User]GetAllError']({ error: 'error has occur' }))),
        ))
      )
    );
}
