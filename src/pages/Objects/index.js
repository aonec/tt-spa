import React, { useState, useEffect } from "react"
import { Link as LinkItem, useRouteMatch } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import axios from "services/ajax"
import { useCanselToken } from "hooks"
import { title_page } from "styles/helper"
import { Icon, Button } from "components"

export const Objects = ({ match }) => {
  const { url } = match
  const [state, setState] = useState({ loading: true })
  const { token, cancel } = useCanselToken()
  useEffect(() => {
    get()
    return () => cancel()
  }, [])

  async function get() {
    try {
      const result = await axios(url, { cancelToken: token })
      setState(result.data.successResponse)
    } catch (error) {}
  }

  return styled(title_page)(
    <>
      <title_page>Объекты</title_page>
      {state.items?.map((item) => <ObjListItem key={item.id} {...item} />)}
    </>
  )
}

const ObjListItem = ({ styles, id, street, number, numberOfTasks, city }) => {
  const { url } = useRouteMatch()

  return styled(styles)(
    <item>
      <LinkItem to={`${url}${id}`}>
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

ObjListItem.defaultProps = {
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
