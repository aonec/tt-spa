import React from "react"
import { Link as LinkItem, useParams } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import { Device } from "components"

export const DeviceItemList = ({
  styles,
  id,
  resource,
  model,
  serialNumber,
  onClick = () => {},
}) => {
  const { obj_id } = useParams()
  return styled(styles)(
    <li onClick={onClick}>
      <LinkItem to={`/housingstocks/${obj_id}/devices/${id}`}>
        <Device device={{ resource, model, serialNumber }} />
        <status as="span">Нет данных</status>
        <date as="span">00.00.00 - 00.00.00</date>
      </LinkItem>
    </li>
  )
}

DeviceItemList.defaultProps = {
  styles: css`
    span,
    LinkItem {
      display: grid;
      grid-auto-flow: column;
      align-items: center;
    }
    LinkItem {
      height: 48px;
      grid-template-columns: 1.5fr 1fr 1fr;
      border-bottom: 1px solid rgb(var(--frame));
      padding: 8px;
      color: rgb(var(--main));

      &:hover {
        color: rgb(var(--main));
        & > Device {
          color: rgb(var(--primary));
        }
      }
    }
    model {
      font-size: 16px;
      font-weight: 500;
    }

    span {
      justify-content: start;
      grid-gap: 8px;
    }

    status {
      opacity: 0.8;
    }

    i,
    date {
      font-style: normal;
      opacity: 0.6;
    }

    status,
    date {
      font-size: 14px;
    }
  `,
}
