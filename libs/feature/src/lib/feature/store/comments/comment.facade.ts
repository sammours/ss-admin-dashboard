import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import * as selectors from "./comment.selectors";
import { CommentActions } from "./comment.actions";

Injectable({
    providedIn: 'root'
})
export class CommentFacade {
    private readonly store = inject(Store);
    public list$ = this.store.select(selectors.selectCommentList);

    public getByProductId(productId: string) {
        this.store.dispatch(CommentActions.getByProductId["[Comment]GetByProductIdLoading"]({ productId: productId }));
    }
}