import React, {ChangeEvent, FormEvent, useState} from "react";
import styles from "./fibonacci.module.css"
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
    const [value, setValue] = useState<string>('')
    const [isLoad, setIsLoad] = useState(false)
    const [arr, setArr] = useState<number[]>([])

    const buttonHandler = (e: FormEvent) => {
        e.preventDefault()
        const number = Number(value)
        if (number < 0 || number > 19) return
        if (number === 0) return
        setIsLoad(true)
        const copyArr: number[] = []
        let i = 0
        const cycle = setInterval(() => {
            if (i <= number) {
                if (i === 0) {
                    copyArr.push(0)
                    i++
                    setArr([...copyArr])
                } else if (i === 1) {
                    copyArr.push(1)
                    i++
                    setArr([...copyArr])
                } else {
                    const prev = copyArr[i - 2]
                    const curr = copyArr[i - 1]
                    const next = prev + curr
                    copyArr.push(next)
                    setArr([...copyArr])
                    i++
                }
            } else {
                setIsLoad(false)
                clearInterval(cycle)
            }
        }, SHORT_DELAY_IN_MS)
    }

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <section className={styles.main}>
                <form onSubmit={buttonHandler} className={styles.form}>
                    <div className={styles.input}>
                        <Input type={"number"} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                               value={value}
                               max={19} isLimitText/>
                        <Button text="Рассчитать" onClick={buttonHandler} isLoader={isLoad}/>
                    </div>
                </form>
                <div className={styles.sequence}>
                    {arr.map((num, index) => {
                        const char = num.toString()
                        return (<Circle key={index} index={index} letter={char}/>)
                    })}
                </div>
            </section>
        </SolutionLayout>
    );
};
