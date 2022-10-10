import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import styles from "./fibonacci.module.css"
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {getFibonacciSteps} from "../../services/utils";

export const FibonacciPage: React.FC = () => {
    const [value, setValue] = useState<string>('')
    const [isLoad, setIsLoad] = useState(false)
    const fibonacciSequence = useRef<number[]>([])
    const [currentStep, setCurrentStep] = useState(0)
    const intervalId = useRef<NodeJS.Timeout>()

    useEffect(() => {
        return () => {
            if (intervalId.current) clearInterval(intervalId.current)
        }
    }, [])

    const buttonHandler = (e: FormEvent) => {
        e.preventDefault()
        const number = Number(value)
        if (number < 0 || number > 19) return
        if (number === 0) return
        setIsLoad(true)
        fibonacciSequence.current = getFibonacciSteps(number)
        setCurrentStep(0)
        intervalId.current = setInterval(() => {
            if (number > 0) {
                setCurrentStep(currentStep => {
                    const nextStep = currentStep + 1
                    if (nextStep > number && intervalId.current) {
                        setIsLoad(false)
                        clearInterval(intervalId.current)
                    }
                    return nextStep
                })
            }
        }, SHORT_DELAY_IN_MS)
    }

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <section className={styles.main}>
                <form onSubmit={buttonHandler} className={styles.form}>
                    <div className={styles.input}>
                        <Input type={"number"} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (!(Number(e.target.value) < 0)) setValue(e.target.value)
                        }}
                               value={value}
                               max={19} isLimitText/>
                        <Button text="Рассчитать" disabled={Number(value) < 0 || Number(value) > 19 || Number(value) === 0}
                                onClick={buttonHandler}
                                isLoader={isLoad}/>
                    </div>
                </form>
                <div className={styles.sequence}>
                    {fibonacciSequence.current.map((num, index) => {
                        if (index <= currentStep) {
                            const char = num.toString()
                            return (<Circle key={index} index={index} letter={char}/>)
                        }
                    })}
                </div>
            </section>
        </SolutionLayout>
    );
};
