import React from 'react';
import renderer from 'react-test-renderer';
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";


describe('test circle', () => {
    test('without char', () => {
        const tree = renderer.create(<Circle />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('with char', () => {
        const tree = renderer.create(<Circle letter='i' />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('with head', () => {
        const tree = renderer.create(<Circle head='test' />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('with React element in head', () => {
        const tree = renderer.create(<Circle head={<p>test</p>} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('with tail', () => {
        const tree = renderer.create(<Circle tail='test' />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('with React element in tail', () => {
        const tree = renderer.create(<Circle tail={<p>test</p>} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('with index', () => {
        const tree = renderer.create(<Circle index={123} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('with isSmall prop', () => {
        const tree = renderer.create(<Circle isSmall />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('default state', () => {
        const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('changing state', () => {
        const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
    test('modified state', () => {
        const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})