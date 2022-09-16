import {ElementStates} from "./element-states";

export interface IListState<T> {
    item: T;
    state: ElementStates;
    addProgress: boolean;
    deleteProgress: boolean;
    tempItem: T;
}