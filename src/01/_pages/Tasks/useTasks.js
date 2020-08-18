import React from "react"
import { useParams } from "react-router-dom"

import { getTasks } from "01/_api/tasks_page"
import { useCancelFetch } from "01/_hooks"

function reducer(state, action) {
  const { type, data } = action
  switch (type) {
    case "reset":
      return { ...state, items: null }
    case "success":
      return { ...state, ...data }
    default:
      console.error("tasks", type)
      return state
  }
}

export const useTasks = () => {
  const [state, dispatch] = React.useReducer(reducer, {})
  const { 0: grouptype } = useParams()
  useCancelFetch([grouptype])
  React.useEffect(() => {
    getTasks(grouptype).then((data) => dispatch({ type: "success", data }))
    return () => dispatch({ type: "reset" })
  }, [grouptype])
  return state
}
