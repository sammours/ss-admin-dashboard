import { StateType } from "./state-type";

export interface ReducerState {
    isLoading: boolean;
    type: StateType;
}