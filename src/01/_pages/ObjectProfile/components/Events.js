import React from "react"
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

  timer_text {
    margin: 0 4px;
  }

  Icon {
    margin-right: 8px;
  }
`

export const Events = ({ title = "", loading = true, items = [] }) => {
  const { push } = useHistory()
  return styled(styles)(
    <section>
      <h2>{title}</h2>
      <e_list>
        <Loader show={loading} />
        {items.map(({ id, currentStage, name, perpetrator, timer = {} }) => (
          <e_item key={id} onClick={() => push("/tasks/" + id)}>
            <e_title as="h4">{currentStage.name}</e_title>
            <e_name>{name}</e_name>
            <timer>
              <Icon icon="timer" />
              <span>{timer.text}</span>
              <timer_text>{timer.stage.timeStr}</timer_text>
              <before>{timer.stage.before}</before>
            </timer>
            <perp>
              <Icon icon="username2" />
              <user_name>{perpetrator.name}</user_name>
            </perp>
          </e_item>
        ))}
      </e_list>
    </section>
  )
}
