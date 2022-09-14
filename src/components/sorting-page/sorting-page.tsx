import React, {useEffect, useRef, useState} from "react";
import styles from './sorting.module.css'
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Direction} from "../../types/direction";
import {Column} from "../ui/column/column";
import {ElementStates} from "../../types/element-states";
import {swap} from "../../services/utils";
import {sortType} from "../../types/sort-type";
import {DELAY_IN_MS} from "../../constants/delays";

export const SortingPage: React.FC = () => {
    const [arr, setArr] = useState<number[]>([])
    const [changingIndex, setChangingIndex] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [typeSort, setTypeSort] = useState<sortType>(sortType.Select)
    const [isLoadAsc, setIsLoadAsc] = useState(false)
    const [isLoadDesc, setIsLoadDesc] = useState(false)

    const done = useRef<number[]>([])

    useEffect(() => {
        randomArr()
    }, [])

    const randomArr = () => {
        const newArr: number[] = []
        const len = Math.floor(Math.random() * (18 - 3) + 3)
        for (let i = 0; i < len; i++) {
            newArr.push(Math.floor(Math.random() * 101))
        }
        setArr(newArr)
        setChangingIndex(0)
        setCurrentIndex(0)
        done.current = []
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

    const sort = (direction: Direction, type: sortType) => {
        direction === Direction.Descending ? setIsLoadDesc(true) : setIsLoadAsc(true)
        const sequence = type === sortType.Select ? selectIterator(arr, direction) : bubbleIterator(arr, direction)
        done.current = []
        const cycle = setInterval(() => {
            let i = sequence.next()
            if (!i.done) {
                setArr([...i.value.arr])
                setCurrentIndex(i.value.j + 1)
                setChangingIndex(i.value.i + 1)
                done.current = i.value.sortedArr
            } else {
                direction === Direction.Descending ? setIsLoadDesc(false) : setIsLoadAsc(false)
                clearInterval(cycle)
            }
        }, DELAY_IN_MS)
    }

    return (
        <SolutionLayout title="Сортировка массива">
            <section className={styles.main}>
                <form className={styles.form}>
                    <div className={styles.radio}>
                        <RadioInput onClick={() => setTypeSort(sortType.Select)} label={'Выбор'} name={'algorithm'}
                                    defaultChecked/>
                        <RadioInput onClick={() => setTypeSort(sortType.Bubble)} label={'Пузырёк'} name={'algorithm'}/>
                    </div>
                    <div className={styles.direction}>
                        <Button disabled={isLoadDesc}
                                onClick={() => sort(Direction.Ascending, typeSort)}
                                isLoader={isLoadAsc} sorting={Direction.Ascending} linkedList={'big'}
                                text={'По возрастанию'}/>
                        <Button disabled={isLoadAsc}
                                onClick={() => sort(Direction.Descending, typeSort)}
                                isLoader={isLoadDesc} sorting={Direction.Descending} linkedList={'big'}
                                text={'По убыванию'}/>
                    </div>
                    <div className={styles.random}>
                        <Button disabled={isLoadAsc || isLoadDesc} text={'Новый массив'} onClick={randomArr}
                                linkedList={'big'}/>
                    </div>
                </form>
                <ul className={styles.columns}>
                    {arr.map((item, index) => {
                            if (done.current.includes(index)) return (
                                <li key={index} className={styles.column}>
                                    <Column state={ElementStates.Modified} index={item}/>
                                </li>
                            )
                            if (currentIndex === index + 1 || changingIndex === index + 1) return (
                                <li key={index} className={styles.column}>
                                    <Column state={ElementStates.Changing} index={item}/>
                                </li>
                            )
                            return (
                                <li key={index} className={styles.column}>
                                    <Column state={ElementStates.Default} index={item}/>
                                </li>
                            )
                        }
                    )}
                </ul>
            </section>
        </SolutionLayout>
    );
};
