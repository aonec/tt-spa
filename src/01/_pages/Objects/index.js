import React from "react"
import styled, { css } from "reshadow/macro"
import { Link as LinkRow } from "react-router-dom"

import axios, { cancel } from "01/axios"
import { Loader, Icon } from "01/components"

const styles = css`
  obj_item {
    display: grid;
    grid-template-columns: 2fr repeat(3, 0.5fr);
    align-items: center;
    width: 100%;
    line-height: 32px;
    padding: 8px;

    &:hover {
      box-shadow: var(--shadow);
    }
  }
  span,
  city,
  task {
    display: flex;
    align-items: center;
  }
  city,
  task {
    opacity: 0.8;
  }

  task Icon {
    color: var(--error);
    margin-left: 16px;
    margin-right: 8px;
  }
  aparts {
    opacity: 0.6;
  }

  LinkRow {
    display: contents;
    &:hover {
      color: var(--primary-100);
    }
  }
`

export const Objects = () => {
  const [state, setState] = React.useState({ items: null })

  React.useEffect(() => {
    ;(async () => {
      const res = await axios.get("housingstocks")
      setState(res)
    })()
    return () => cancel()
  }, [])

  const { items } = state
  return styled(styles)(
    <>
      <h1>Объекты</h1>
      <Loader show={!items} size="32">
        {items?.map(
          ({ city, id, number, numberOfTasks, street, numberOfApartments }) => {
            const task = numberOfTasks ? (
              <task>
                <Icon icon="alarm" />
                Задач: {numberOfTasks}
              </task>
            ) : null

            return (
              <obj_item key={id}>
                <LinkRow to={`/objects/${id}`}>
                  <span>
                    <h4>
                      {street}, {number}
                    </h4>
                    {task}
                  </span>
                  <city>{city}</city>
                  <span></span>
                  <aparts>{numberOfApartments} квартир</aparts>
                </LinkRow>
              </obj_item>
            )
          }
        )}
      </Loader>
    </>
  )
}
