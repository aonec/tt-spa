import React, { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
import styled from "reshadow/macro"

import { title_page, tabs, title_section } from "styles/helper"

import {
  Tab,
  Grid,
  DeviceItemList,
  EventItem,
  Device,
  SimpleListItem,
  Breadcrumbs,
} from "components"
import axios from "services/ajax"
import { useCanselToken } from "hooks"
import { InfoList } from "./InfoList"

export const DeviceId = ({ match, location }) => {
  const { url, path, params } = match
  const { pathname } = location
  const [state, setState] = useState({ loading: true })
  const { token, cancel } = useCanselToken()
  useEffect(() => {
    if (
      !pathname.includes("related") &&
      !pathname.includes("communicationpipes") &&
      !state.device
    )
      get()
    if (pathname.includes("related") && !state.devices) get()
    if (pathname.includes("communicationpipes") && !state.pipes) get()
    return () => cancel()
  }, [pathname])

  // console.log(state)
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
            `Tasks?GroupType=NotArchived&Take=3&DeviceId=${params.device_id}`
          )
        : null
      events &&
        setState((state) => ({ ...state, events: events.data.successResponse }))
    } catch (error) {}
  }
  const { street, number, device, devices, events, pipes } = state

  return styled(title_page, title_section, tabs)(
    <>
      <Breadcrumbs />
      <title_page>
        <Device device={device} size={24} />
      </title_page>
      <tabs>
        <Tab to={url} exact>
          Общая данные
        </Tab>
        <Tab to={url + "/related"}>Подключенные приборы</Tab>
        {device?.resource && (
          <Tab to={url + "/communicationpipes"}>Узел коммуникации</Tab>
        )}
      </tabs>
      <Grid
        left={
          <Switch>
            <Route path={path + "communicationpipes"}>
              <title_section>Узлы</title_section>
              {pipes?.map(({ number, entryNumber, magistral }) => (
                <ul>
                  {[
                    { title: "Номер трубы", value: number },
                    { title: "Номер ввода", value: entryNumber },
                    {
                      title: "Магистраль",
                      value: magistral === "FeedFlow" ? "Подающая" : "Обратная",
                    },
                  ].map((item) => (
                    <SimpleListItem key={item.title} {...item} />
                  ))}
                </ul>
              ))}
            </Route>
            <Route path={path + "related"}>
              <title_section>ОДПУ</title_section>
              <ul>
                {devices?.map((item) => (
                  <DeviceItemList
                    key={item.id}
                    {...item}
                    onClick={() => setState({ loading: true })}
                  />
                ))}
              </ul>
            </Route>
            <Route path={path}>
              <title_section>Информация</title_section>
              <InfoList {...state.device} />
            </Route>
          </Switch>
        }
        right={
          <>
            <title_section>События с прибором</title_section>
            {events?.items.length === 0 && "нет событий"}
            {events?.items.map((event) => (
              <EventItem key={event.id} {...event} />
            ))}
          </>
        }
      />
    </>
  )
}
