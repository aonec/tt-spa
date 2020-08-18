import React from "react"
import styled, { css, use } from "reshadow/macro"

import { button } from "01/r_comp"
import { Icon } from "01/components/Icon"
import { Loader } from "01/components"

const styles = css`
  stage_item {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-row-gap: 8px;
    grid-column-gap: 16px;
    padding-bottom: 20px;
    position: relative;
    &[|status] {
      --status-color: var(--main-80);
      --status-border: var(--bg);
      --status-bg: var(--bg);
      --stage-name-opacity: 0.6;
      --span: 1;
    }
    &[|status="Done"] {
      --status-color: var(--primary-100);
      --status-border: var(--primary-100);
      --status-bg: #fff;
      --span: 2;
    }

    &[|status="InProgress"] {
      --stage-name-opacity: 0.8;
      --status-color: #fff;
      --status-bg: var(--primary-100);
      --status-border: var(--primary-100);
    }
    &:not(:last-child)::before {
      content: "";
      position: absolute;
      border: 1px solid;
      border-color: var(--status-border);
      bottom: 2px;
      top: 34px;
      left: 16px;
    }
  }

  circle {
    grid-row: 1 / var(--span);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid var(--status-border);
    display: inline-grid;
    place-items: center;
    color: var(--status-color);
    background: var(--status-bg);
  }

  stage_name {
    grid-column: 2 / -1;
    opacity: var(--stage-name-opacity);
    align-self: center;
  }

  time,
  user_name {
    grid-column: 2;
    grid-row: 2;
    font-size: 12px;
    opacity: 0.32;
  }

  time {
    grid-column: 3;
  }

  button {
    grid-column: 2 / -1;
    justify-self: start;
  }
`

export const Stages = ({ items = [], revertProps = {}, panelLoading }) => {
  return styled(styles, button)(
    <section>
      <h2>Этапы задачи</h2>
      <stage_list>
        {items.map(({ id, name, icon, number, info, status, canRevert }) => (
          <stage_item key={id} {...use({ status })}>
            <circle as="span">{icon ? <Icon icon={icon} /> : number}</circle>
            <stage_name>{name}</stage_name>
            {info && (
              <>
                <user_name>{info.name}</user_name>
                <time>{info.time}</time>
              </>
            )}
            {canRevert && (
              <button {...revertProps} disabled={panelLoading ?? false}>
                <span>Вернуть этап</span>
                <Loader show={panelLoading ?? false} />
              </button>
            )}
          </stage_item>
        ))}
      </stage_list>
    </section>
  )
}
