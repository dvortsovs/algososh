import React, {ChangeEvent, FormEvent, useState} from "react";
import styles from "./string.module.css";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {swap} from "../../services/utils";
import {DELAY_IN_MS} from "../../constants/delays";

export const StringComponent: React.FC = () => {
    const [string, setString] = useState('')
    const [arr, setArr] = useState<string[]>([])
    const [position, setPosition] = useState([0, 0])
    const [isLoad, setIsLoad] = useState(false)

    const buttonHandler = (e: FormEvent) => {
        e.preventDefault()
        setIsLoad(true)
        const arr = string.toUpperCase().split('')
        if (arr.length < 2) {
            setIsLoad(false)
            setArr(arr)
            return
        }
        setArr(arr)
        let start = 0
        let end = arr.length - 1
        setPosition([start, end])
        const recursion = setInterval(() => {
            swap<string>(arr, start, end)
            start++
            end--
            setArr([...arr])
            setPosition([start, end])
            if (start > end) {
                setIsLoad(false)
                clearInterval(recursion)
            }
        }, DELAY_IN_MS)
    }

    return (
        <SolutionLayout title="Строка">
            <section className={styles.main}>
                <form onSubmit={buttonHandler} className={styles.form}>
                    <div className={styles.input}>
                        <Input onChange={(e: ChangeEvent<HTMLInputElement>) => setString(e.target.value)} value={string}
                               maxLength={11} isLimitText={true}/>
                        <Button text="Развернуть" onClick={buttonHandler} isLoader={isLoad}/>
                    </div>
                </form>
                <div className={styles.string}>
                    {arr.map((char, index) => {
                        if (!isLoad) return <Circle key={index} state={ElementStates.Modified} letter={char}/>
                        if (index === position[0] || index === position[1])
                            return (<Circle key={index} state={ElementStates.Changing} letter={char}/>)
                        if (index < position[0] || index > position[1])
                            return (<Circle key={index} state={ElementStates.Modified} letter={char}/>)
                        return (<Circle key={index} letter={char}/>)
                    })}
                </div>
            </section>
        </SolutionLayout>
    );
};
