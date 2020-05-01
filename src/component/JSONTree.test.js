import React from 'react';
import JSONTeee from '.';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';

const treeStatus = {
    expandAll: {
        status: true,
        text: 'Expand all'
    },
    colapseAll: {
        status: false,
        text: 'Colapse all'
    },
};

const setupBy = (method, Component, props) => method(<Component {...props} />);

const setup = (props) => setupBy(shallow, JSONTeee, props);


describe('test JsonTree component', () => {

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);
    const props = {
        data: {
            name: 'sdfds',
            info: {
                age: 1
            }
        }
    };


    afterEach(() => {
        jest.clearAllMocks();
    });

    it('is button visible after first expand', () => {

        const component = setup({ ...props });
        component.find('.list__icon').first().props().onClick();
        expect(component.find(Button)).toBeTruthy();
    })

    it('check state in button after click', () => {
        const component = setup({ ...props });
        component.find('.list__icon').first().props().onClick();
        component.find(Button).props().onClick();
        expect(component.find(Button).text()).toBe(treeStatus.expandAll.text);
    })
})