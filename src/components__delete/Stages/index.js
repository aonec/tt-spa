import React from "react"
import styled, { css, use } from "reshadow/macro"

import { title_section } from "styles/helper"
import { Button as Btn, Icon } from "components"

export const Stages = ({ styles, stages }) => {
  return styled(styles, title_section)(
    <stages>
      <title_section>Этапы выполнения</title_section>
      <ul>
        {stages?.map(
          (
            { id, name, number, status, type, closingTime, perpetrator },
            i,
            arr
          ) => (
            <stage key={id} {...use({ status })}>
              <icon as="span">
                {status === "Done" ? (
                  <Icon icon="ok" />
                ) : type === "Switch" ? (
                  <Icon icon="choice" />
                ) : type === "Final" ? (
                  <Icon icon="finish" />
                ) : (
                  number
                )}
              </icon>
              <title as="span">{name}</title>
              {closingTime && (
                <>
                  <span>{perpetrator.name}</span>
                  <span>{new Date(closingTime).toLocaleString()}</span>
                </>
              )}
              {arr[i + 1]?.status === "InProgress" && <Btn>вернуть этап</Btn>}
            </stage>
          )
        )}
      </ul>
    </stages>
  )
}

Stages.defaultProps = {
  styles: css`
    stages,
    stage {
      display: grid;
    }
    stages {
      align-content: start;
      grid-gap: 16px;
      font-size: 14px;
    }

    stage {
      --active: rgba(var(--primary));
      grid-template-columns: repeat(4, auto);
      place-content: start;
      grid-column-gap: 16px;
      grid-row-gap: 8px;
      padding-bottom: 20px;
      position: relative;

      &:not(:last-child) icon::before {
        content: "";
        border: inherit;
        position: absolute;
        left: 15px;
        top: 36px;
        bottom: 4px;
      }

      &[|status="InProgress"] {
        & icon {
          background-color: var(--active);
          border-color: var(--active);
          color: #fff;
        }

        & title {
          font-weight: 500;
        }
      }
      &[|status="Waiting"] {
        & icon {
          background-color: rgb(var(--bg));
          border-color: rgb(var(--bg));
        }
        & title {
          opacity: 0.6;
        }
      }

      &[|status="Done"] {
        & title {
          opacity: 0.6;
        }
        & icon {
          border-color: var(--active);
          color: var(--active);
        }
      }
    }
    icon {
      display: inline-grid;
      place-content: center;
      width: 32px;
      height: 32px;
      border: 1px solid;
      border-radius: 50%;
      grid-row: 1 / 3;
      grid-column: 1 / 2;
    }

    title {
      grid-column: 2 / -1;
      grid-row: 1;
    }

    time,
    username {
      grid-row: 2;
    }

    time {
      grid-column: 3 / span 1;
    }

    username {
      grid-column: 2 / span 1;
    }

    Btn {
      grid-column: 2 / -1;
      grid-row: 3;
      justify-self: start;
    }

    span {
      opacity: 0.32;
      font-size: 12px;
    }
  `,
}
