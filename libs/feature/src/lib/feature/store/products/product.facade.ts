import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import * as selectors from "./product.selectors";
import { ProductActions } from "./product.actions";
import { FilterOptions } from "@ss-admin-dashboard/util-common";

Injectable({
    providedIn: 'root'
})
export class ProductFacade {
    private readonly store = inject(Store);
    public list$ = this.store.select(selectors.selectProductList);
    public items$ = this.store.select(selectors.selectProducts);
    public product$ = this.store.select(selectors.selectProduct);
    public isLoading$ = this.store.select(selectors.selectIsLoading);

    public getAll(filter: FilterOptions) {
        this.store.dispatch(ProductActions.getAll["[Product]GetAllLoading"]({ filter }));
    }

    public getById(id: string) {
        this.store.dispatch(ProductActions.getById["[Product]GetByIdLoading"]({ id }));
    }

    public getByIds(ids: string[]) {
        this.store.dispatch(ProductActions.getByIds["[Product]GetByIdsLoading"]({ ids }));
    }

    public reset() {
        this.store.dispatch(ProductActions.reset());
    }
}