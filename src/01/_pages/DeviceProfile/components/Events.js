import React, { useState, useEffect } from "react"
import styled, { css } from "reshadow/macro"
import { useHistory } from "react-router-dom"
import { Loader, Icon } from "01/components"
const styles = css`
  e_list,
  e_item {
    display: grid;
    grid-gap: 16px;
    align-items: center;
  }

  e_item {
    padding: 8px;
    grid-row-gap: 8px;
    cursor: pointer;
    &:hover {
      color: var(--primary-100);
    }

    & e_title,
    & e_name {
      grid-column: 1 / -1;
    }
  }

  e_name {
    opacity: 0.45;
  }
  
  timer,
  perp {
    display: inline-flex;
    opacity: 0.6;
  }
  status {
    display: inline-flex;
    color: #17B45A;
    
  }

  timer_text {
    margin: 0 4px;
  }

  Icon {
    margin-right: 8px;
  }
`


export const Events = ({ title = "", loading = true, items = [] }) => {

  const [state, setState] = useState(1);
  const [perpetrator, serPerpetrator] = useState({
    id: 0,
    name: '24.06.2020 10:32 — 31.07.2020 14:32'
  });
  const { push } = useHistory()

  const timer = [{
    text: 'text',
    stage: {
      timeStr: 'timeStr',
      before: 'before'
    }
  }];

  items = [
    {
      id: 0,
      value: 'test'
    },
    {
      id: 1,
      value: 'test'
    }
  ]

  return styled(styles)(
    <section>
      <h2>{title}</h2>
      <e_list>
        {/* <Loader show={loading} /> */}
        {items.map(({ id, currentStage, name, timer = {} }) => {
          return (
            <e_item key={id} onClick={() => push("/tasks/" + id)}>
              <e_title as="h4">Некорректные показания</e_title>
              <status>
                <Icon icon="ok" />
                <span>{timer.text}Выполнено</span>
              </status>
              <perp>
                <Icon icon="calendar" />
                <user_name>{perpetrator.name}</user_name>
              </perp>
            </e_item>
          )
        }
        )}
      </e_list>
    </section>
  )
}