import React from "react"
import { useParams, useHistory } from "react-router-dom"

import { useCancelFetch } from "01/_hooks"
import { getTask, moveStage } from "01/_api/task_profile_page"

export const usePageFetch = (state, dispatch) => {
  const { 0: id } = useParams()
  const { replace } = useHistory()
  useCancelFetch()
  React.useEffect(() => {
    getTask(id).then((data) => dispatch({ type: "success", data }))
  }, [])

  React.useEffect(() => {
    const { stageData = null, isReplace = false } = state
    if (isReplace) replace("/tasks/")
    if (stageData) {
      moveStage(id, stageData.move, stageData.data).then((data) =>
        dispatch({ type: "success", data })
      )
    }
  }, [state])
}

// React.useEffect(() => {
//   // getTaskPage(url, dispatch)
//   getTask(id)
//   return () => cancel()
// }, [url])

// React.useEffect(() => {
//   const { move, stageData, isReplace } = state
//   if (isReplace) replace("/tasks/")
//   if (move) {
//     postMoveStage(url, move, stageData, dispatch, replace)
//   }
// }, [state])
