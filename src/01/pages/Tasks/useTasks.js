import React from "react"
import { useParams } from "react-router-dom"

import { usePageFetch, useCancel, useStorageData } from "01/hooks"

export function useTasks() {
  const { 0: grouptype } = useParams()
  const { cancelToken, cancel } = useCancel()
  const { fetch, data, loading } = usePageFetch()
  const { executingTasksCount: ex, observingTasksCount: ob } = useStorageData()

  React.useEffect(() => {
    fetch({
      type: "start",
      config: { url: "tasks", params: { grouptype }, cancelToken },
    })
    return () => cancel()
  }, [grouptype])

  return {
    loading,
    tabs: [
      { name: "К исполнению" + (ex ? ` (${ex})` : ""), to: "executing" },
      { name: "Наблюдаемые" + (ob ? ` (${ob})` : ""), to: "observing" },
      { name: "Архивные", to: "archived" },
    ],
    taskList: data?.items ?? [],
  }
}
