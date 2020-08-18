import React from "react"
import { Route, useRouteMatch } from "react-router-dom"
import styled from "reshadow/macro"

import { LinkWrap } from "01/components/LinkWrap"

export const UsCtrList = React.memo(({ users = [], contractors = [] }) => {
  const { path } = useRouteMatch()
  return styled()`
    item {
      grid-column: 1 /-1;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 8px;
    }

    LinkWrap:hover {
      & > phone,
      & > work {
        color: inherit;
      }
    }
    phone,
    work {
      align-self: center;
      display: inline-flex;
    }

    work {
      color: var(--main-60);
      &::before {
        content: "";
        display: block;
        width: 4px;
        height: 4px;
        border-radius: 4px;
        background-color: red;
        place-self: center;
        margin-right: 8px;
      }
    }

    span {
      &:last-child {
      }
      &:nth-child(2) {
      }
    }
  `(
    <>
      <Route path={`/*/users/`} exact>
        {!users && "loaidng"}
        {users?.length === 0 && "Сотрудников нету"}
        {users?.map(({ cellphone, email, executingTaskCount, id, name }) => (
          <item key={id}>
            <LinkWrap to={path + "users/" + id}>
              <h4>{name}</h4>
              <phone>{cellphone}</phone>
              <work>В работе</work>
            </LinkWrap>
          </item>
        ))}
      </Route>
      <Route path={`/*/contractors/`}>
        {!contractors && "loaidng"}
        {contractors?.length === 0 && "Подрядчиков нету"}
        {contractors?.map((item) => 1)}
      </Route>
    </>
  )
})
