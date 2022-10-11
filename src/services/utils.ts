import {Direction} from "../types/direction";
import {sortType} from "../types/sort-type";

const cleanSwap = <T>(arr: T[], firstIndex: number, secondIndex: number): T[] => {
    const newArr = [...arr]
    const temp = newArr[firstIndex]
    newArr[firstIndex] = newArr[secondIndex]
    newArr[secondIndex] = temp
    return newArr
}

const getReversingStringSteps = (initialString: string) => {
    const stringArr = initialString.toUpperCase().split('')
    const reversingSteps: string[][] = [[...stringArr]]

    if (stringArr.length < 2) {
        return reversingSteps
    }

    let start = 0
    let end = stringArr.length - 1

    while (end > start) {
        const newStep = cleanSwap(reversingSteps[reversingSteps.length - 1], start, end)
        reversingSteps.push(newStep)
        start++
        end--
    }
    return reversingSteps
}

const getFibonacciSteps = (index: number) => {
    const fibonacciSequence: number[] = []
    for (let i = 0; i < index + 1; i++) {
        if (i === 0 || i === 1) {
            fibonacciSequence.push(i)
        } else {
            fibonacciSequence.push(fibonacciSequence[i - 1] + fibonacciSequence[i - 2])
        }
    }
    return fibonacciSequence
}

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

const iteratorProgress = (arr: number[], direction: Direction, sortingType: sortType) => {
    const iterator = sortingType === sortType.Select
        ? selectIterator(arr, direction)
        : bubbleIterator(arr, direction)
    let step = iterator.next()
    let done = step.done
    let value
    while (!done) {
        value = step.value
        step = iterator.next()
        done = step.done
    }
    return value
}

export {swap, selectIterator, bubbleIterator, randomArray, getReversingStringSteps, getFibonacciSteps, iteratorProgress}
