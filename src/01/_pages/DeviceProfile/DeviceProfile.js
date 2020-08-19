// import React from 'react'
// import styled from 'reshadow/macro'
// import { useParams } from 'react-router-dom'
// import { Tabs } from './components/Tabs'
// import {Information} from "./components/Information";

// export const DeviceProfile = () => {
//   const params = useParams()
//   return styled()(
//     <div>
//       <h1>Информация о ОДПУ</h1>
//       <h2>id прибора: {params[1]}</h2>
//       <p>Компонент обновляется</p>
//       <Tabs />
//       <Information />
//     </div>
//   )
// }

import React from "react"
import styled from "reshadow/macro"

import { Route, useRouteMatch, useParams, useHistory } from "react-router-dom"
import { grid } from "01/r_comp"
import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { Information } from "./components/Information"
import { History } from "./components/History"
import { Events } from "./components/Events"
import { Changes } from "./components/Changes"
import { Documents } from "./components/Documents"

// import { Events } from "./components/Events"
// import { Apartments } from "./components/Apartments"
// import { Devices } from "./components/Devices"
import { useObjectInformation, useFetchPage, useDeviceChanges } from "./hooks"

function reducer(state, action) {
  const { type, data } = action
  switch (type) {
    case "success":
      return { ...state, ...data }
    default:
      console.error("objid", type)
      return state
  }
}

export const DeviceProfile = () => {
  const [state, dispatch] = React.useReducer(reducer, {})
  useFetchPage(state, dispatch)
  const { 0: objid } = useParams()
  const { push } = useHistory()
  const info = useObjectInformation(state)
  const changes = useDeviceChanges(state);
  const { header = [], events = [], aparts = [] } = state
  console.log("changes", changes);
  return styled(grid)(
    <>
      <Header {...header} />
      <Tabs />
      <grid>
        <Route path="/*/(\\d+)" exact>
          <Information {...info} />
          <Events title="Задачи с объектом" {...events} />
        </Route>
        {/* <Route
                  path="/objects/(\\d+)/devices/(\\d+)/(testimony|documents|changes)?"
                  component={DeviceProfile}
                  exact
                /> */}
      </grid>
      <Route path="/*/(\\d+)/documents" exact>
        <Documents {...info} />
      </Route>

      <Route path="/*/(\\d+)/testimony" exact>
        <History {...info} />
      </Route>

      <Route path="/*/(\\d+)/changes" exact>
        <Changes {...info} />
      </Route>

    </>
  )
}


// import React from 'react'
// import styled from 'reshadow/macro'
// import { useParams } from 'react-router-dom'
// import { Tabs } from './components/Tabs'

// export const DeviceProfile = () => {
//   const params = useParams()
//   console.log(params[1])
//   return styled()(
//     <div>
//       Профиль прибора ОДПУ
//       {/* <Tabs /> */}
//       <h2>id прибора: {params[1]}</h2>
//       <p>Компонент обновляется</p>
//     </div>
//   )
// }