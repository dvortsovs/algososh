import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import styles from "./string.module.css";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {getReversingStringSteps} from "../../services/utils";
import {DELAY_IN_MS} from "../../constants/delays";

export const StringComponent: React.FC = () => {
    const [string, setString] = useState('')
    const [reverseSteps, setReverseSteps] = useState<string[][]>([])
    const [currentStep, setCurrentStep] = useState(0)
    const [isLoad, setIsLoad] = useState(false)
    const intervalId = useRef<NodeJS.Timeout>()

    useEffect(() => {
        return () => {
            if (intervalId.current) clearInterval(intervalId.current)
        }
    }, [])

    const buttonHandler = (e: FormEvent) => {
        e.preventDefault()
        setIsLoad(true)
        const steps = getReversingStringSteps(string)
        setReverseSteps(steps)
        setCurrentStep(0)

        if (steps.length) {
            intervalId.current = setInterval(() => {
                setCurrentStep(currentStep => {
                    const nextStep = currentStep + 1
                    if (nextStep >= steps.length - 1 && intervalId.current) {
                        setIsLoad(false)
                        clearInterval(intervalId.current)
                    }
                    return nextStep
                })
            }, DELAY_IN_MS)
        }
    }

    return (
        <SolutionLayout title="Строка">
            <section className={styles.main}>
                <form onSubmit={buttonHandler} className={styles.form}>
                    <div className={styles.input}>
                        <Input onChange={(e: ChangeEvent<HTMLInputElement>) => setString(e.target.value)} value={string}
                               maxLength={11}
                               isLimitText={true}/>
                        <Button disabled={string.length < 2}
                                text="Развернуть"
                                onClick={buttonHandler}
                                isLoader={isLoad}/>
                    </div>
                </form>
                <div className={styles.string}>
                    {reverseSteps.length ? reverseSteps[currentStep].map((char, index, array) => {
                        if (!isLoad) return <Circle key={index} state={ElementStates.Modified} letter={char}/>
                        if (index === currentStep || index === (array.length - 1) - currentStep)
                            return (<Circle key={index} state={ElementStates.Changing} letter={char}/>)
                        if (index < currentStep || index > (array.length - 1) - currentStep)
                            return (<Circle key={index} state={ElementStates.Modified} letter={char}/>)
                        return (<Circle key={index} letter={char}/>)
                    }) : null}
                </div>
            </section>
        </SolutionLayout>
    );
};
