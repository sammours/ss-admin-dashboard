import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import * as selectors from "./mail.selectors";
import { MailActions } from "./mail.actions";
import { FilterOptions } from "@ss-admin-dashboard/util-common";

Injectable({
    providedIn: 'root'
})
export class MailFacade {
    private readonly store = inject(Store);
    public list$ = this.store.select(selectors.selectMailList);
    public item$ = this.store.select(selectors.selectLastMail);

    public getAll(filter: FilterOptions) {
        this.store.dispatch(MailActions.getAll["[Mail]GetAllLoading"]({ filter }));
    }

    public getLastEmail() {
        this.store.dispatch(MailActions.getLastEmail["[Mail]GetLastEmailLoading"]());
    }
}