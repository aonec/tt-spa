import React from "react"
import styled, { css } from "reshadow/macro"
import { Route, Switch, useRouteMatch, Link } from "react-router-dom"

import { Pig } from "./Pig"
import { Tabs } from "./Tabs"
import * as s from "01/r_comp"
import { UploadButton } from "01/components/Upload"
const styles = css`
  steps {
    padding: 8px;
    box-shadow: var(--shadow);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
  }
  button {
    border-radius: 4px;
    place-content: center;
    place-self: end;
    grid-column: 2;
  }
  input_frame:nth-last-child(2) {
    grid-column: 1 / -1;
  }
  UploadButton {
    grid-column: 1;
    & + button {
      grid-row: 6;
    }
  }
`

export const Steps = () => {
  const { url } = useRouteMatch()
  console.log(url)
  return styled(styles, s.input, s.button, s.label)(
    <Route path={`${url}/(step1|step2|step3)`}>
      <steps>
        <Pig label="Выберите дальнейшее действие" text="Замена прибора" />
        <Pig label="Исполнитель" text="" />
        <Tabs url={url} />
        <Switch>
          <Route path="/tasks/(\\d+)/step1">
            <input_frame data-big>
              <input />
            </input_frame>
            <input_frame data-big>
              <input />
            </input_frame>
            <input_frame data-big>
              <input />
            </input_frame>
            <input_frame data-big>
              <input />
            </input_frame>
            <input_frame data-big>
              <input />
            </input_frame>
            <button as="Link" to={url + "/step2"} data-big data-primary>
              <span>Далее</span>
            </button>
          </Route>
          <Route path="/tasks/(\\d+)/step2">
            <label>
              IP адресс вычеслителя
              <input_frame data-big>
                <input />
              </input_frame>
            </label>
            <label>
              Порт
              <input_frame data-big>
                <input />
              </input_frame>
            </label>
            <button as="Link" to={url + "/step3"} data-big data-primary>
              <span>Далее</span>
            </button>
          </Route>
          <Route path="/tasks/(\\d+)/step3">
            <UploadButton text="Загрузите акт выполненных работ" />
            <UploadButton text="Загрузите паспорт прибора" />
            <UploadButton text="Загрузите свидетельство о поверке прибора" />
            <button data-big data-primary>
              <span>Завершение задачи</span>
            </button>
          </Route>
        </Switch>
      </steps>
    </Route>
  )
}
