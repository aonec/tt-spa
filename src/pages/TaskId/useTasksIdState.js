import { useReducer, useEffect } from "react"
import { useRouteMatch } from "react-router-dom"

import axios from "services/ajax"

export default () => {
  const { url } = useRouteMatch()
  const [{ config, ...state }, dispatch] = useReducer(reducer, {
    url,
    config: { method: "get", url },
    loading: { initial: true },
  })

  useEffect(() => {
    config && getData()
  }, [config])

  async function getData() {
    try {
      const result = await axios(config)
      const { successResponse } = result.data
      dispatch({ type: "fetch_success", payload: successResponse })
    } catch (error) {
      dispatch({ type: "fetch_error" })
    }
  }

  return [state, dispatch]
}

function reducer(state, action) {
  const { url, loading } = state
  switch (action.type) {
    case "fetch_success":
      return {
        ...state,
        ...action.payload,
        loading: {},
      }
    case "fetch_error": {
      return { ...state, loading: {} }
    }
    case "document_delete":
      return {
        ...state,
        config: { method: "delete", url: url + "/documents/" + action.payload },
        loading: { deleteDocument: action.payload },
      }

    case "push_stage":
      return {
        ...state,
        config: {
          method: "post",
          url: url + "/pushstage",
          data: action.payload,
        },
        loading: { pushStage: true },
      }
    case "revert_stage":
      return {
        ...state,
        config: {
          method: "post",
          url: url + "/revertstage",
          data: action.payload,
        },
        loading: { revertStage: true },
      }
    default:
      console.error(action.type)
      return state
  }
}
