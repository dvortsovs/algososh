import {getReversingStringSteps} from "../services/utils";

describe('getReversingStringSteps test', () => {
    test('with even string length', () => {
        const steps = getReversingStringSteps('1234')
        expect(steps[steps.length - 1].join('')).toBe('4321')
    })
    test('with uneven string length', () => {
        const steps = getReversingStringSteps('12345')
        expect(steps[steps.length - 1].join('')).toBe('54321')
    })
    test('with one char', () => {
        const steps = getReversingStringSteps('1')
        expect(steps[steps.length - 1].join('')).toBe('1')
    })
    test('without char', () => {
        const steps = getReversingStringSteps('')
        expect(steps[steps.length - 1].join('')).toBe('')
    })
})