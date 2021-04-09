import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import {DeleteButton} from '../components'

configure({adapter: new Adapter()})

describe('re-usable component test', () => {
    it('<DeleteButton /> test', () => {
        const DELETE_BUTTON_PROPS = {
            onDelete: () => {},
            type: 'test',
        }
        const component = shallow(<DeleteButton {...DELETE_BUTTON_PROPS} />)
        expect(component).toBeDefined()
    })
})
