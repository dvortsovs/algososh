import {ElementStates} from "./element-states";

export interface IQueueState<T> {
    item: (T | null)
    state: ElementStates
}