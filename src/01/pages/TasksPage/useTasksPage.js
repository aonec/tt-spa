import React from "react"
import { useHistory, useRouteMatch } from "react-router-dom"

import axios from "01/axios"

const initialState = { loading: true, items: null }

export const useTasksPage = () => {
  const tasks = useRouteMatch("/tasks/:grouptype")
  const { replace } = useHistory()
  const [state, setState] = React.useState(initialState)
  const { token, cancel } = axios.CancelToken.source()
  React.useEffect(() => {
    if (!tasks) replace("executing")
    if (tasks) {
      setState({ ...state, ...initialState })
      getTasks(cancel)
    }
    return () => cancel()
    // eslint-disable-next-line 
  }, [tasks?.params.grouptype])

  async function getTasks(cancel) {
    try {
      const res = await axios.get("tasks", {
        params: tasks?.params,
        cancelToken: token,
      })
      setState({ ...res.data.successResponse, loading: false })
    } catch (error) {}
  }

  return {
    ...state,
    tabList: [
      { name: "К исполнению", to: "executing" },
      { name: "Наблюдаемые", to: "observing" },
      { name: "Архив", to: "archived" },
    ],
  }
}
