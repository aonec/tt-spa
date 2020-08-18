import React from "react"
import axios from "01/axios"

import { api } from "../api"

let cancel
async function fetchObjects(c) {
  try {
    const res = await axios({
      ...api.getObjects(),
      cancelToken: new axios.CancelToken((e) => {
        cancel = e
      }),
    })
    const { items } = res.data.successResponse
    return Promise.resolve({ objList: items })
  } catch (error) {}
}

export const useObjects = () => {
  const [state, setState] = React.useState({ loading: true, objectList: [] })
  React.useEffect(() => {
    fetchObjects().then(setState)
    return () => cancel()
  }, [])

  return state
}
