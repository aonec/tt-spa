import React from "react"
import styled from "reshadow/macro"

import { title_section } from "styles/helper"
import { styles } from "./styles"
import { request } from "services/api"
import { CommentItem } from "./CommentItem"
import { Creator } from "./Creator"

export const Comments = ({ comments, url }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    items: comments,
    url: url + "/Comments",
    createValue: "",
    editValue: "",
    editId: null,
    touched: false,
  })

  const { act } = state
  React.useEffect(() => dispatch({ type: "add_comments", payload: comments }), [
    comments,
  ])

  React.useEffect(() => {
    if (act) {
      request(state.config).then((comment) => {
        if (act === "delete") dispatch({ type: "delete_success" })
        if (act === "edit") dispatch({ type: "put_success", payload: comment })
        if (act === "create")
          dispatch({ type: "post_success", payload: comment })
      })
    }
    // eslint-disable-next-line
  }, [act])

  return styled(styles, title_section)(
    <comments>
      <title_section>
        Комментарии{" "}
        {state.items && !!state.items.length && `(${state.items.length})`}
      </title_section>

      {state.items?.map((item) => (
        <CommentItem key={item.id} {...item} {...{ state, dispatch }} />
      ))}
      {/* editor */}
      <Creator {...{ state, dispatch }} />
    </comments>
  )
}

function reducer(state, action) {
  switch (action.type) {
    case "add_comments":
      return { ...state, items: action.payload }
    case "change_create_value":
      return { ...state, createValue: action.payload }
    case "post_start":
      return createPostConfig(state)
    case "post_success":
      return addNewComment(state, action.payload)
    case "delete_start":
      return createDeleteConfig(state, action.payload)
    case "delete_success":
      return deleteComment(state)
    case "edit_start":
      return {
        ...state,
        editValue: action.payload.text,
        editId: action.payload.id,
        touched: false,
      }
    case "edit_cancel":
      return { ...state, editId: null }
    case "change_edit_value":
      return { ...state, editValue: action.payload, touched: true }
    case "put_start":
      return createPutConfig(state)
    case "put_success":
      return addEditComment(state, action.payload)
    default:
      console.warn("comment => ", action.type)
      return state
  }
}

const headers = { "Content-Type": "application/json" }

function createPostConfig(state) {
  const { createValue, url } = state
  return {
    ...state,
    config: {
      method: "post",
      headers,
      url,
      data: JSON.stringify(createValue),
    },
    act: "create",
  }
}

function addNewComment(state, newComment) {
  const { items } = state
  return {
    ...state,
    items: [...items, newComment],
    act: null,
    createValue: "",
  }
}

function createDeleteConfig(state, id) {
  const { url } = state
  return {
    ...state,
    config: { method: "delete", headers, url: url + "/" + id },
    deletedId: id,
    act: "delete",
  }
}

function deleteComment(state) {
  const { items, deletedId } = state
  return {
    ...state,
    items: items.filter((item) => item.id !== deletedId),
    deletedId: null,
    act: null,
    config: null,
  }
}

function createPutConfig(state) {
  const { url, editId, editValue } = state
  return {
    ...state,
    config: {
      method: "put",
      headers,
      url: url + "/" + editId,
      data: JSON.stringify(editValue),
    },
    act: "edit",
  }
}

function addEditComment(state, editComment) {
  const { items } = state
  return {
    ...state,
    items: items.map((item) =>
      item.id === editComment.id ? editComment : item
    ),
    act: null,
    editId: null,
  }
}
