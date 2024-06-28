import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";

import { UserEffects } from "./users/user.effects";
import { UserFacade } from "./users/user.facade";
import { userReducerName, userReducer } from "./users/user.reducers";

import { ProductFacade } from "./products/product.facade";
import { ProductEffects } from "./products/product.effects";
import { productReducer, productReducerName } from "./products/product.reducers";

export const effects = [
    provideEffects(UserEffects),
    provideEffects(ProductEffects),
];

export const reducers = [
    provideState({ name: userReducerName, reducer: userReducer }),
    provideState({ name: productReducerName, reducer: productReducer })
];

export const facades = [
    UserFacade,
    ProductFacade
]