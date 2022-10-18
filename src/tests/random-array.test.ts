import {randomArray} from "../services/utils";


describe('random-array test', () => {
    test('array length and value test', () => {
        const arr = randomArray([0, 100], [1, 100])
        expect(arr.length).toBeLessThan(100)
        expect(arr.length).toBeGreaterThan(1)
        arr.forEach(item => {
            expect(item).toBeLessThan(100)
            expect(item).toBeGreaterThan(1)
        })
    })
})