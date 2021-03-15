import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Switch } from 'antd'
import App from './App'

configure({ adapter: new Adapter() })
describe('<App />', () => {
    it('Should render three carachters', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find(Switch).toHaveLength(1))
    })
})
