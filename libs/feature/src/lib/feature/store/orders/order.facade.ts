import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import * as selectors from "./order.selectors";
import { OrderActions } from "./order.actions";
import { FilterOptions } from "@ss-admin-dashboard/util-common";

Injectable({
    providedIn: 'root'
})
export class OrderFacade {
    private readonly store = inject(Store);
    public list$ = this.store.select(selectors.selectOrderList);
    public order$ = this.store.select(selectors.selectOrder);
    public isLoading$ = this.store.select(selectors.selectIsLoading);

    public getAll(filter: FilterOptions) {
        this.store.dispatch(OrderActions.getAll["[Order]GetAllLoading"]({ filter }));
    }

    public getById(id: string) {
        this.store.dispatch(OrderActions.getById["[Order]GetByIdLoading"]({ id }));
    }
}