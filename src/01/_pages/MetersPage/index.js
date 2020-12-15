import React from "react"
import {NavLink, Route} from "react-router-dom"
import { useFetchPage } from "./hooks/useFetchPage"
import { useFilter } from "./hooks/useFiter"
import { useApartments } from "./hooks/useApartments"
import { useApartmentInfo } from "./hooks/useApartmentInfo"
import { useMeterDevices } from "./hooks/useMeterDevices"

import { Apartments } from "./components/Apartments"
import { Filter } from "./components/Filter"
import { ApartmentInfo } from "./components/ApartmentInfo"
import { MeterDevices } from "./components/MeterDevices"
import {MeterDevicesNew} from "./components/MeterDevices/MeterDevicesNew";
import HousesReadings from "./components/HousesReadings/HousesReadings";
import Arrow from "../../_components/Arrow/Arrow";
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export const MetersPage = () => {

  const [state, dispatch] = React.useReducer(reducer, {})
  useFetchPage(state, dispatch);
  const filter = useFilter(dispatch)
  const aparts = useApartments(state, filter)
  const apartInfo = useApartmentInfo(state)
  const meterDev = useMeterDevices(state)

  const onChange = () => {}

    return (
    <div style={{maxWidth: 960}}>
      <h1>Ввод показаний</h1>

      <Tabs defaultActiveKey="1">
        <TabPane tab={<NavLink to="/meters/apartments">По квартирам</NavLink>} key="1">
          <Route path="/*/apartments" exact>
            <Filter {...filter} />
            <Apartments {...aparts} />
          </Route>
          <Route path="/*/apartments/:id">
            <ApartmentInfo {...apartInfo} />
            {/*<MeterDevices {...meterDev} />*/}
            <MeterDevicesNew {...meterDev} />
          </Route>
        </TabPane>
        {/*<TabPane tab={<NavLink to="/meters/houses">По домам</NavLink>} key="2">*/}
        {/*  <HousesReadings />*/}
        {/*</TabPane>*/}
      </Tabs>


    </div>
  )
}

function reducer(state, action) {
  const { type, params, data } = action
  switch (type) {
    case "success":
      return { ...state, ...data }
    case "get_apartments":
      return { ...state, params, apartments: { loading: true } }

    default:
      console.error("meters", type)
      return state
  }
}

