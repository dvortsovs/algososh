import {Direction} from "../types/direction";

const randomArray = (value: [number, number], count: [number, number]): number[] => {
    const numbers: number[] = []
    const len = Math.floor(Math.random() * (count[1] - count[0]) + count[0])
    for (let i = 0; i < len; i++) {
        numbers.push(Math.floor(Math.random() * (value[1] - value[0]) + value[0]))
    }
    return numbers
}

const swap = <T>(arr: T[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex]
    arr[firstIndex] = arr[secondIndex]
    arr[secondIndex] = temp
}

function* selectIterator(arr: number[], direction: Direction) {
    const sortedArr: number[] = []
    for (let i = 0; i < arr.length; i++) {
        let temp = arr[i]
        let index = i
        for (let j = i + 1; j < arr.length; j++) {
            if (direction === Direction.Descending) {
                if (temp < arr[j]) {
                    temp = arr[j]
                    index = j
                }
            } else {
                if (temp > arr[j]) {
                    temp = arr[j]
                    index = j
                }
            }
            yield {
                arr: arr, sortedArr: sortedArr, i, j
            }
        }
        swap(arr, i, index)
        sortedArr.push(i)
    }
    yield {
        arr: arr, sortedArr: sortedArr, i: arr.length, j: arr.length
    }
}

function* bubbleIterator(arr: number[], direction: Direction) {
    const sortedArr: number[] = []
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (direction === Direction.Descending) {
                if (arr[j] < arr[j + 1]) {
                    swap(arr, j, j + 1)
                }
            } else {
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1)
                }
            }
            yield {
                arr: arr, sortedArr: sortedArr, i: j, j: j + 1
            }
        }
        sortedArr.push(i)
    }
    sortedArr.push(sortedArr[sortedArr.length - 1] - 1)
    yield {
        arr: arr, sortedArr: sortedArr, i: arr.length, j: arr.length
    }
}

export {swap, selectIterator, bubbleIterator, randomArray}
