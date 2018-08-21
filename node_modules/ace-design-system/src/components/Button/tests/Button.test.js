import React from 'react';

import Button from '../Button';
import ButtonLabel from '../../ButtonLabel/ButtonLabel'
import ButtonBase from '@material-ui/core/Button';

import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Primary Button', () => {

    const buttonLabel = "Label"
    const component = mount(<Button label={buttonLabel}/>)

    test('defualt behavior renders primary button element with primary_button class', () => {
        expect(component.find('button').hasClass('primary_button')).toBe(true) 

    });

    test('defualt behavior renders ButtonLabel child component', () => {
        expect(component.find(ButtonLabel).length).toBe(1) 
        expect(component.find('.button_label').length).toBe(1) 

    });

    test('renders button with label copy', () => {
        expect(component.find('.button_label').length).toBe(1)
        
        console.log(component.find('.button_label'))
        console.log(component.html())

        expect(component.find('.button_label').text()).toBe(buttonLabel)

    });

    test('calls onClick function on click behavior', () => {
        const clickListener = jest.fn()
        const localComponent = mount(<Button label={buttonLabel} onClick={clickListener}/>)

        localComponent.simulate('click')

        const clickListCount = clickListener.mock.calls.length
        expect(clickListCount).toBe(1);

    });

    test('active=null property renders an idle button', () => {
        const localComponent = mount(<Button label={buttonLabel} active={null}/>)
        
        expect(localComponent.find('button.idle.primary_button').length).toBe(1)
        expect(localComponent.find('button.active.primary_button').length).toBe(0)
        expect(localComponent.find('button.disabled.primary_button').length).toBe(0)

    });

    test('active=true property renders an idle button', () => {
        const localComponent = mount(<Button label={buttonLabel} active={true}/>)
        
        expect(localComponent.find('button.idle.primary_button').length).toBe(0)
        expect(localComponent.find('button.active.primary_button').length).toBe(1)
        expect(localComponent.find('button.disabled.primary_button').length).toBe(0)

    });


    test('active=true property renders an idle button', () => {
        const localComponent = mount(<Button label={buttonLabel} active={false}/>)
        
        expect(localComponent.find('button.idle.primary_button').length).toBe(0)
        expect(localComponent.find('button.active.primary_button').length).toBe(0)
        expect(localComponent.find('button.disabled.primary_button').length).toBe(1)
        

    });

})

