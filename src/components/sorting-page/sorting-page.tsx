import React, {useEffect, useRef, useState} from "react";
import styles from './sorting.module.css'
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Direction} from "../../types/direction";
import {Column} from "../ui/column/column";
import {ElementStates} from "../../types/element-states";
import {bubbleIterator, randomArray, selectIterator} from "../../services/utils";
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
    const intervalId = useRef<NodeJS.Timeout>()

    useEffect(() => {
        randomArr()
        return () => {
            if (intervalId.current) clearInterval(intervalId.current)
        }
    }, [])

    const randomArr = () => {
        setArr(randomArray([0, 101], [3, 18]))
        setChangingIndex(0)
        setCurrentIndex(0)
        done.current = []
    }

    const sort = (direction: Direction, type: sortType) => {
        direction === Direction.Descending ? setIsLoadDesc(true) : setIsLoadAsc(true)
        const sequence = type === sortType.Select ? selectIterator(arr, direction) : bubbleIterator(arr, direction)
        done.current = []
        intervalId.current = setInterval(() => {
            let i = sequence.next()
            if (!i.done) {
                setArr([...i.value.arr])
                setCurrentIndex(i.value.j + 1)
                setChangingIndex(i.value.i + 1)
                done.current = i.value.sortedArr
            } else {
                if (intervalId.current) {
                    direction === Direction.Descending ? setIsLoadDesc(false) : setIsLoadAsc(false)
                    clearInterval(intervalId.current)
                }
            }
        }, DELAY_IN_MS)
    }

    return (
        <SolutionLayout title="???????????????????? ??????????????">
            <section className={styles.main}>
                <form className={styles.form}>
                    <div className={styles.radio}>
                        <RadioInput onClick={() => setTypeSort(sortType.Select)} label={'??????????'} name={'algorithm'}
                                    defaultChecked/>
                        <RadioInput onClick={() => setTypeSort(sortType.Bubble)} label={'??????????????'} name={'algorithm'}/>
                    </div>
                    <div className={styles.direction}>
                        <Button disabled={isLoadDesc}
                                onClick={() => sort(Direction.Ascending, typeSort)}
                                isLoader={isLoadAsc} sorting={Direction.Ascending} linkedList={'big'}
                                text={'???? ??????????????????????'}/>
                        <Button disabled={isLoadAsc}
                                onClick={() => sort(Direction.Descending, typeSort)}
                                isLoader={isLoadDesc} sorting={Direction.Descending} linkedList={'big'}
                                text={'???? ????????????????'}/>
                    </div>
                    <div className={styles.random}>
                        <Button disabled={isLoadAsc || isLoadDesc} text={'?????????? ????????????'} onClick={randomArr}
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
