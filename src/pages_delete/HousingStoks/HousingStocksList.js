import React, { useEffect, useContext } from "react"
import { useRouteMatch, Link as LinkItem } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import { Button, Icon } from "components"
import { HousingStocksContext } from "./context"
import axios from "axios"
import { useCanselToken } from "hooks"

export const HousingStocksList = () => {
  const { url } = useRouteMatch()
  const [state, dispatch] = useContext(HousingStocksContext)
  const { config, mainPage } = state
  const { token, cancel } = useCanselToken()

  useEffect(() => {
    dispatch({
      type: "get",
      payload: { url, cancelToken: token, page: "mainPage" },
    })
    return () => {
      cancel()
      dispatch({ type: "clear", payload: "mainPage" })
    }
  }, [])

  return (
    <>
      {config && "Загрузка..."}
      {mainPage?.items.map((item) => (
        <HousingStocksListItem key={item.id} {...item} />
      ))}
    </>
  )
}

const HousingStocksListItem = ({
  styles,
  id,
  street,
  number,
  numberOfTasks,
  city,
}) => {
  const { url } = useRouteMatch()

  return styled(styles)(
    <item>
      <LinkItem to={{ pathname: url + id, state: { street, number } }}>
        <cell as="span">
          <h4>
            {street}, {number}
          </h4>
          {!!numberOfTasks && (
            <span>
              <Icon fill="rgb(var(--error))" icon="alarm" />
              Задач: {numberOfTasks}
            </span>
          )}
        </cell>
        <cell>{city}</cell>
      </LinkItem>
      <Button big icon>
        <Icon icon="menu" size={24} />
      </Button>
    </item>
  )
}

HousingStocksListItem.defaultProps = {
  styles: css`
    item,
    span,
    cell,
    LinkItem {
      display: grid;
      grid-auto-flow: column;
      align-items: center;
    }

    item {
      font-size: 14px;
      padding: 8px;
      grid-template-columns: 1fr auto;
    }

    span,
    cell {
      justify-content: start;
      opacity: 0.8;
    }

    span {
      grid-gap: 8px;
    }

    LinkItem,
    item,
    cell {
      grid-gap: 16px;
    }

    LinkItem {
      grid-template-columns: 1fr 1fr;
    }

    h4 {
      font-size: 16px;
      margin: 0.4em 0;
    }
  `,
}
