import React from "react"
import styled, { css } from "reshadow/macro"
import { Avatar, Button, Icon } from "components"

export const CommentItem = ({
  styles,
  id,
  author,
  createdAt,
  text,
  canBeEdited,
  state,
  dispatch,
}) => {
  const { editId, editValue, touched, act } = state

  return styled(styles)(
    <comment>
      <Avatar />
      <author>{author}</author>
      <time>{new Date(createdAt).toLocaleString()}</time>
      {editId === id ? (
        <comment_edit>
          <textarea
            value={editValue}
            onChange={(e) =>
              dispatch({ type: "change_edit_value", payload: e.target.value })
            }
          />
          <Button
            primary
            disabled={!touched}
            onClick={() => act !== "edit" && dispatch({ type: "put_start" })}
          >
            Сохранить
          </Button>
          <Button
            onClick={() => act !== "edit" && dispatch({ type: "edit_cancel" })}
          >
            Отмена
          </Button>
        </comment_edit>
      ) : (
        <p>{text}</p>
      )}
      {canBeEdited && editId !== id && (
        <btns>
          <button
            onClick={() =>
              act !== "delete" &&
              dispatch({ type: "edit_start", payload: { text, id } })
            }
          >
            <Icon icon="edit" />
          </button>
          <button
            onClick={() =>
              act !== "delete" &&
              dispatch({ type: "delete_start", payload: id })
            }
          >
            <Icon icon="del" />
          </button>
        </btns>
      )}
    </comment>
  )
}

CommentItem.defaultProps = {
  styles: css`
    comment {
      display: grid;
      grid-column-gap: 16px;
      grid-row-gap: 8px;
      grid-template-columns: auto auto 1fr auto;
      align-content: start;
      grid-template-areas:
        "ava name time ."
        "ava text text text";
    }

    Avatar {
      grid-area: ava;
    }

    p {
      grid-area: text;
      margin: 0;
    }

    author,
    time {
      font-size: 12px;
    }

    author {
      opacity: 0.6;
    }

    time {
      opacity: 0.32;
    }

    comment_edit {
      grid-area: text;
      display: grid;
      grid-gap: 8px;
      grid-template-columns: auto auto 1fr;
      justify-content: start;
      & textarea {
        grid-column: 1 / -1;
      }
    }

    btns {
      display: flex;
      & > button {
        padding: 4px;
        color: inherit;
      }

      & > :first-child:hover {
        color: rgba(var(--primary));
      }

      & > :last-child:hover {
        color: rgba(var(--error));
      }
    }
  `,
}
