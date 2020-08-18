import React from "react"

import axios from "01/axios"

import {
  createHeader,
  createPanel,
  createInfo,
  createDeviceInfo,
} from "./utils"
import { api } from "./api"
import { useUpload } from "01/components/Upload"
import { useRouteMatch } from "react-router-dom"

let cancel

async function fetchData(fetchConfig) {
  try {
    const res = await axios({
      ...fetchConfig,
      cancelToken: new axios.CancelToken((e) => {
        cancel = e
      }),
    })
    const url = res.config.url
    const data = res.data.successResponse

    if (url.match(/users/gi)) return Promise.resolve({ users: data.items })
    if (url.match(/contr/gi)) return Promise.resolve({ contrs: data.items })

    return Promise.resolve({
      header: createHeader(data),
      panel: createPanel(data),
      info: createInfo(data),
      deviceInfo: createDeviceInfo(data?.device),
    })
  } catch (error) {}
}

const initialState = {
  data: null,
  loading: true,
  erron: null,
  config: null,
}

export const useTasksId = () => {
  const {
    params: { taskId },
  } = useRouteMatch("/task/:taskId")
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      const { type, payload } = action
      switch (type) {
        case "success":
          console.log(payload)
          return { ...state, ...initialState, ...payload }
        case "get_users":
          return { ...state, config: !state.users && api.getUsers() }
        case "get_contrs":
          return { ...state, config: !state.contrs && api.getContractors() }
        case "push_stage":
          const pushData = createPushData(state)
          return { ...state, config: api.moveStage(taskId, "push", pushData) }
        case "change":
          return { ...state, ...payload }

        default:
          console.error(type)
          return state
      }
    },
    {
      ...initialState,
      config: api.getState(taskId),
    }
  )

  React.useEffect(() => {
    state.config &&
      fetchData(state.config).then(
        (data) => dispatch({ type: "success", payload: data }),
        (error) => dispatch({ type: "error", payload: error })
      )
  }, [state.config])

  React.useEffect(() => () => cancel(), [])
  const uploadProps = useUpload((ids) =>
    dispatch({ type: "change", payload: { documentsIds: ids } })
  )

  return {
    header: state?.header,
    panel: state.panel,
    info: state.info,
    deviceInfo: state.deviceInfo,
    uploadProps,
    pushProps: {
      disabled: isDisable(state),
      onClick() {
        dispatch({ type: "push_stage" })
      },
    },
    selectProps: {
      perpetrator: {
        loading: !state?.users,
        list: state.users ?? [],
        onClick() {
          dispatch({ type: "get_users" })
        },
        getSelectData(id) {
          dispatch({ type: "change", payload: { nextPerpetratorId: id[0] } })
        },
      },
      contractors: {
        onClick() {
          dispatch({ type: "get_contrs" })
        },
      },
    },
  }
}

function isDisable(state) {
  const { nextPerpetratorId = null, documentsIds = [], panel = {} } = state
  if (panel.email) return !nextPerpetratorId
  if (panel.document) return !documentsIds.length
}

function createPushData(state) {
  const { nextPerpetratorId = null, documentsIds = [], panel = {} } = state
  if (panel.email) return { nextPerpetratorId }
  if (panel.document) return { documentsIds, type: "AdditionalMaterials" }
}
