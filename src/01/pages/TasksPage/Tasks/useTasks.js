import React from "react"
import { useRouteMatch } from "react-router-dom"
import axios from "01/axios"

const tabItems = [
  { name: "К исполнению", to: "executing" },
  { name: "Наблюдаемые", to: "observing" },
  { name: "Архив", to: "archived" },
]

export const useTasks = () => {
  const [data, setData] = React.useState(null)
  const [tabsTotal, setTabsTotal] = React.useState([0, 0])
  const { params } = useRouteMatch("/tasks/:grouptype")
  React.useEffect(() => {
    let cancel
    ;(async () => {
      setData(null)
      try {
        const res = await axios("tasks", {
          params,
          cancelToken: new axios.CancelToken((e) => {
            cancel = e
          }),
        })
        const { successResponse } = res.data
        const { observingTasksCount, executingTasksCount } = successResponse
        setData(res.data.successResponse)
        setTabsTotal([executingTasksCount, observingTasksCount])
      } catch (error) {
        console.log(error)
      }
    })()
    return () => cancel()
    // eslint-disable-next-line
  }, [params.grouptype])

  return {
    tabs: {
      list: addTotal(tabItems, tabsTotal),
      totals: tabsTotal,
    },
    taskList: { list: data?.items, item: "task", loading: !data },
  }
}

function addTotal(items, arr) {
  return items.map((item, i) =>
    !!arr.i ? { ...item, name: `${item.name} (${arr[i]})` } : item
  )
}
