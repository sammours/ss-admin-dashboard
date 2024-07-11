import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, catchError, debounceTime, switchMap } from 'rxjs/operators';

import { MailActions as actions } from './mail.actions';
import { MailsService } from '../../services/mail.service';

@Injectable()
export class MailEffects {
   constructor(
     private actions$: Actions,
     private service: MailsService
   ) {}

   getAll$ = createEffect(() => this.actions$.pipe(
      ofType(actions.getAll['[Mail]GetAllLoading']),
      debounceTime(300),
      switchMap((action) => this.service.getAll(action.filter)
        .pipe(
          map(result => actions.getAll['[Mail]GetAllSuccess']({ payload: result })),
          catchError(() => of(actions.getAll['[Mail]GetAllError']({ error: 'error has occur' }))),
        ))
      )
    );

    getLastEmail$ = createEffect(() => this.actions$.pipe(
      ofType(actions.getLastEmail['[Mail]GetLastEmailLoading']),
      debounceTime(300),
      switchMap(() => this.service.getLastEmail()
        .pipe(
          map(result => actions.getLastEmail['[Mail]GetLastEmailSuccess']({ payload: result })),
          catchError(() => of(actions.getLastEmail['[Mail]GetLastEmailError']({ error: 'error has occur' }))),
        ))
      )
    );
}
