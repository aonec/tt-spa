import React from "react"
import { useParams } from "react-router-dom"
import { deleteDoc } from "01/_api/task_profile_page"

export const useDocuments = ({ documents = null }, pageDispatch) => {
  const { 0: taskId } = useParams()
  const [state, dispatch] = React.useReducer(documnetReducer, {
    hiddenDocs: true,
  })

  React.useEffect(() => {
    if (documents) {
      dispatch({ type: "update_doc", documents })
      console.log(documents)
    }
  }, [documents])

  React.useEffect(() => {
    const { deleteId } = state
    if (deleteId) {
      console.log(123)
      deleteDoc(taskId, deleteId).then((deleteId) =>
        dispatch({ type: "success", deleteId })
      )
    }
  }, [state.deleteId])

  return {
    ...state,
    del(deleteId) {
      dispatch({ type: "start_delete", deleteId })
    },
  }
}

function documnetReducer(state, action) {
  const { documents = [], type = "", deleteId = null } = action
  const { items = [] } = state
  switch (type) {
    case "update_doc":
      return { items: documents, hiddenDocs: !documents.length }
    case "start_delete":
      console.log(deleteId)
      return {
        ...state,
        items: items.map((doc) =>
          doc.id === deleteId ? { ...doc, deleted: true } : doc
        ),
        deleteId,
      }
    case "success":
      return {
        ...state,
        items: items.filter((doc) => doc.id !== deleteId),
      }
    default:
      console.error("doc", type)
      return state
  }
}
