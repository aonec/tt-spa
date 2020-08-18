import React from "react"
import styled, { css } from "reshadow/macro"

import { Icon } from "components"

export const UploadList = ({
  styles,
  list = [],
  files = null,
  loading = false,
  click = () => {},
}) => {
  return styled(styles)(
    <ul>
      {files &&
        Object.values(files).map(({ name }) => (
          <li key={name}>
            <span>{name}</span>
            <load as="Icon" icon="replacement" />
          </li>
        ))}
      {list.map(({ name, url, id }) => (
        <li key={id} id={id}>
          <a href={url} target="_blank" rel="noreferrer noopener">
            {name}
          </a>
          {!loading ? (
            <button onClick={() => click(id)}>
              <Icon icon="close" />
            </button>
          ) : (
            <load as="Icon" icon="replacement" />
          )}
        </li>
      ))}
    </ul>
  )
}

UploadList.defaultProps = {
  styles: css`
    ul {
      display: flex;
      flex-wrap: wrap;
      font-size: 14px;
      line-height: 16px;
    }

    li {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 8px;
      align-items: center;
      margin: 4px;
    }

    a,
    button {
      cursor: pointer;
      color: inherit;
    }

    button {
      display: inherit;
      &:hover {
        color: rgb(var(--error));
      }
    }

    a:hover {
      color: rgb(var(--primary));
    }

    load,
    span {
      cursor: wait;
    }

    load {
      animation: spin 1000ms infinite linear;
    }

    @keyframes spin {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
}
