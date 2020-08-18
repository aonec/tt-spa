import React from "react"
import { useRouteMatch } from "react-router-dom"

import axios from "01/axios"
import { api } from "../api"
import { createObjHeader } from "./utils"

let cancel
async function fetchObjectId(config) {
  try {
    const res = await axios({
      ...config,
      cancelToken: new axios.CancelToken((e) => {
        cancel = e
      }),
    })
    const url = res.config.url
    const data = res.data.successResponse
    const header = createObjHeader(data)
    console.log(header)
    console.log(data)
    return Promise.resolve({ info: {}, header })
  } catch (error) {}
}

export const useObjectId = () => {
  const [state, setState] = React.useState({})
  const { url, path, isExact, params } = useRouteMatch("/object/:objId/")
  const apartments = useRouteMatch(path + "apartments")
  const devices = useRouteMatch(path + "devices")
  const { objId } = params

  React.useEffect(() => {
    if (isExact && !state.info)
      fetchObjectId(api.getObjectId(objId)).then(setState)
  }, [isExact])

  return {
    header: state.header,
    url,
    tabList: [
      { name: "Общие данные", to: url, exact: true },
      { name: "Kвартиры", to: url + "/apartments" },
      { name: "ОДПУ", to: url + "/devices" },
    ],
  }
}
