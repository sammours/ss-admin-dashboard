import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";

import { UserFacade } from "./users/user.facade";
import { UserEffects } from "./users/user.effects";
import { userReducerName, userReducer } from "./users/user.reducers";

import { ProductFacade } from "./products/product.facade";
import { ProductEffects } from "./products/product.effects";
import { productReducer, productReducerName } from "./products/product.reducers";

import { CommentFacade } from "./comments/comment.facade";
import { CommentEffects } from "./comments/comment.effects";
import { commentReducer, commentReducerName } from "./comments/comment.reducers";

export const effects = [
    provideEffects(UserEffects),
    provideEffects(ProductEffects),
    provideEffects(CommentEffects),
];

export const reducers = [
    provideState({ name: userReducerName, reducer: userReducer }),
    provideState({ name: productReducerName, reducer: productReducer }),
    provideState({ name: commentReducerName, reducer: commentReducer })
];

export const facades = [
    UserFacade,
    ProductFacade,
    CommentFacade
]