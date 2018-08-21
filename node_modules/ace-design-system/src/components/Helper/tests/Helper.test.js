import React from 'react';
import { shallow, mount } from 'enzyme';

import Helper from '../Helper';



describe('Helper', () => {

    const contentProp = "testing content"
    const component = mount(<Helper content={contentProp}/>)
    

    test('default behavior renders helper component with helper class', () => {    
        expect(component.find('.helper').length).toBe(1)

    });

    test('renders helper icon img', () => {    
        expect(component.find('img').hasClass('helper-face')).toBe(true)

    });

    test('renders helper content bubble (sibling of icon img)', () => {    
        expect(component.find('div.helper-content').length).toBe(1)
        expect(component.find('img.helper-face + div').hasClass('helper-content')).toBe(true)

    });

    test('renders text passed through content prop in content bubble', () => {
        expect(component.find('div.helper-content p').text()).toBe(contentProp)

    });

    test('renders nothing if inactive [active = false] ', () => {
        const localComponent = 
            mount(<Helper content={contentProp} active={false} />)
        
        expect(localComponent.html()).toBe(null)

    });
    

})

