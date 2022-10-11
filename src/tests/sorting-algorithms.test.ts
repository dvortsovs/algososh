import {iteratorProgress} from "../services/utils";
import {Direction} from "../types/direction";
import {sortType} from "../types/sort-type";

describe('sort test', () => {
    test('select sort empty arr test', () => {
        const value = iteratorProgress([], Direction.Ascending, sortType.Select)
        expect(value?.arr).toEqual([])
    })
    test('select sort array with one value', () => {
        const value = iteratorProgress([1], Direction.Ascending, sortType.Select)
        expect(value?.arr).toEqual([1])
    })
    test('select sort array with few value', () => {
        const value = iteratorProgress([1, 2, 34, 9], Direction.Descending, sortType.Select)
        expect(value?.arr).toEqual([34, 9, 2, 1])
    })
    test('bubble sort empty arr test', () => {
        const value = iteratorProgress([], Direction.Ascending, sortType.Bubble)
        expect(value?.arr).toEqual([])
    })
    test('bubble sort array with one value', () => {
        const value = iteratorProgress([1], Direction.Ascending, sortType.Select)
        expect(value?.arr).toEqual([1])
    })
    test('bubble sort array with few value', () => {
        const value = iteratorProgress([1, 2, 34, 9], Direction.Descending, sortType.Bubble)
        expect(value?.arr).toEqual([34, 9, 2, 1])
    })
})