import React, { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
import styled from "reshadow/macro"

import { title_page, tabs, title_section } from "styles/helper"

import { Tab, Grid, DeviceItemList, EventItem, Breadcrumbs } from "components"
import axios from "services/ajax"
import { useCanselToken } from "hooks"
import { InfoList } from "./InfoList"

export const ObjectId = ({ match, location }) => {
  const { url, path, params } = match
  console.log(path)
  const { pathname } = location
  const [state, setState] = useState({ loading: true })
  const { token, cancel } = useCanselToken()
  useEffect(() => {
    if (pathname.includes("devices") && !state.devices) get()
    if (!pathname.includes("devices") && !state.index) get()
    return () => cancel()
  }, [pathname])

  async function get() {
    try {
      const result = await axios(pathname, { cancelToken: token })
      setState((state) => ({
        ...state,
        ...result.data.successResponse,
        loading: false,
      }))
      const events = !state.events
        ? await axios(
            `Tasks?GroupType=NotArchived&Take=3&HousingStockId=${params.obj_id}`
          )
        : null
      events &&
        setState((state) => ({ ...state, events: events.data.successResponse }))
    } catch (error) {}
  }
  const { street, number, devices, events } = state

  return styled(title_page, title_section, tabs)(
    <>
      <Breadcrumbs />
      <title_page>{street && `${street}, ${number}`}</title_page>
      <tabs>
        <Tab to={url} exact>
          Общая информация
        </Tab>
        <Tab to={url + "/devices"}>ОДПУ</Tab>
      </tabs>
      <Grid
        left={
          <Switch>
            <Route path={path + "devices"}>
              <title_section>ОДПУ</title_section>
              <ul>
                {devices?.map((item) => (
                  <DeviceItemList key={item.id} {...item} />
                ))}
              </ul>
            </Route>
            <Route path={path}>
              <title_section>Информация</title_section>
              <InfoList {...state} />
            </Route>
          </Switch>
        }
        right={
          <>
            <title_section>События с объектом</title_section>
            {events?.items.map((event) => (
              <EventItem key={event.id} {...event} />
            ))}
          </>
        }
      />
    </>
  )
}
