import React from 'react';
import renderer from 'react-test-renderer';

import {Button} from "./button";
import {fireEvent, render, screen} from "@testing-library/react";


describe("test button", () => {
    test('Button without text', () => {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot()
    })

    test('Button with text', () => {
        const tree = renderer.create(<Button text="test" />).toJSON();
        expect(tree).toMatchSnapshot()
    })

    test('Button disabled', () => {
        const tree = renderer.create(<Button disabled={true} />).toJSON();
        expect(tree).toMatchSnapshot()
    })

    test('Button is load', () => {
        const tree = renderer.create(<Button isLoader={true} />).toJSON();
        expect(tree).toMatchSnapshot()
    })

    test('button callback', () => {
        window.alert = jest.fn()
        const callback = () => {
            alert('Callback was called!')
        }
        render(<Button text='button' onClick={callback} />);
        const button = screen.getByText('button')
        fireEvent.click(button)
        expect(window.alert).toHaveBeenCalledWith('Callback was called!')
    })
})

