import React from "react"
import styled, { css, use } from "reshadow/macro"
import { Icon, Loader } from "01/components"

const styles = css`
  documnet {
    box-shadow: var(--shadow);
    padding: 16px;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 16px;
    align-items: center;
    grid-gap: 8px;
    line-height: 32px;

    &[|deleted] {
      cursor: not-allowed;
      & > * {
        pointer-events: none;
      }
    }
  }

  a {
    display: contents;
  }

  a {
    &:hover {
      color: var(--primary-100);
    }
  }
  h4,
  span {
    display: inline-flex;
    align-items: center;
  }
  span {
    opacity: 0.6;
  }
  Icon {
    margin-right: 8px;
  }

  del {
    color: var(--main-60);
    cursor: pointer;
    &:hover {
      color: var(--error);
    }
  }
`

export const Documents = ({
  items = [],
  hiddenDocs = true,
  del = () => {},
}) => {
  if (hiddenDocs) return null
  return styled(styles)(
    items.map(
      ({
        id,
        url = null,
        deleted = false,
        author = null,
        canBeEdited = null,
        name = null,
        uploadingTime = null,
      }) => (
        <documnet key={id} {...use({ deleted })}>
          <a href={url} target="_blank" rel="noreferrer noopener">
            <h4>
              <Icon icon="doc" size="24" />
              {name}
            </h4>
            <span>
              <Icon icon="username" />
              {author}
            </span>
            <span>
              <Icon icon="calendar" />
              {new Date(uploadingTime).toLocaleString()}
            </span>
          </a>
          {canBeEdited && (
            <Loader show={deleted}>
              <del as="Icon" icon="del" onClick={() => del(id)} />
            </Loader>
          )}
        </documnet>
      )
    )
  )
}

// author: "Исполнитель УК А."
// canBeEdited: false
// id: 1345897
// name: "file.pdf"
// uploadingTime: "2020-06-25T11:02:12.213014"
// url: "https://documents-storage.storag
