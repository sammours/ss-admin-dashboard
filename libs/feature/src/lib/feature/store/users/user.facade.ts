import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import * as selectors from "./user.selectors";
import { UserActions } from "./user.actions";
import { FilterOptions } from "@ss-admin-dashboard/util-common";

Injectable({
    providedIn: 'root'
})
export class UserFacade {
    private readonly store = inject(Store);
    public list$ = this.store.select(selectors.selectUserList);
    public user$ = this.store.select(selectors.selectUser);
    public isLoading$ = this.store.select(selectors.selectIsLoading);

    public getAll(filter: FilterOptions) {
        this.store.dispatch(UserActions.getAll["[User]GetAllLoading"]({ filter }));
    }

    public getById(id: string) {
        this.store.dispatch(UserActions.getById["[User]GetByIdLoading"]({ id }));
    }
}