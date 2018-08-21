import React from 'react';

import Input from '../Input';

import { shallow, mount } from 'enzyme';


describe('Input Field', () => {

    beforeEach(() => {

    })

    test('defualt behavior renders Input component with input_field class', () => {
        const component = mount(<Input />)

        expect(component.find('input').hasClass('input_field')).toBe(true) 

    });

    test('defualt behavior renders Input component and sibling label', () => {
        const component = mount(<Input />)
        const inputWrapper = component.find('.field_control')
        const wrapperChild_input = inputWrapper.find('input.input_field')
        const wrapperChild_label = inputWrapper.find('label.input_label')
        
        expect(wrapperChild_input.length).toBe(1) 
        expect(wrapperChild_label.length).toBe(1) 
  
    });
    
    test ("defualt type prop is 'text", () => {
        const component = mount(<Input />)
        const inputField = component.find('input.input_field')

        expect(inputField.props().type).toBe('text') 
  
    })

    test ("type prop updates input_field type property", () => {
        const component = mount(<Input type={'number'} />)
        const inputField = component.find('input.input_field')

        expect(inputField.props().type).toBe('number') 
  
    })

    test ("label prop updates input_label innerHTML", () => {
        const ELlabel = "label_test"
        const component = mount(<Input label={ELlabel} />)
        const inputLabel= component.find('label.input_label')

        expect(inputLabel.text()).toBe(ELlabel) 

    })

    test ("value prop assigns label name", () => {
        const labelName = "label_name"
        const component = mount(<Input name={labelName} />)
        const inputEL= component.find('input.input_field')

        expect(inputEL.props().name).toBe(labelName) 
    })

    test("onChange assigns the input targer value to the component state", () => {
        const changeVal = "change_val"
        const labelName = 'label_name'
        const component = mount(<Input name={labelName} />)
        const inputEL= component.find('input.input_field')
        
        inputEL.simulate('change', { target: { value: changeVal } });

        expect(component.state()[labelName]).toBe(changeVal) 
    })

    test("callback prop is called onChange", () => {
        const cbListenter = jest.fn()
        const component = mount(<Input callback={cbListenter} />)
        const inputEL= component.find('input.input_field')
        
        inputEL.simulate('change');

        const clickListCount = cbListenter.mock.calls.length
        expect(clickListCount).toBe(1);
    })


})
