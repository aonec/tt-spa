import React from "react"

import { Select } from "01/components/Select"
import axios from "01/axios"

const defautlProps = {
  perpetrator: ["Исполнитель", "Выберите исполнителя"],
}

const initialState = { list: [], loading: true }

export const useSelectFetch = (str, reset) => {
  const [url, setUrl] = React.useState(null)
  const [data, setData] = React.useState(initialState)
  React.useEffect(() => {
    url &&
      (async () => {
        try {
          const res = await axios(url)
          setData({ list: res.data.successResponse.items })
        } catch (error) {}
      })()
    return () => {
      setData(initialState)
      setUrl(null)
    }
  }, [url, reset])

  return { ...data, onClick: () => setUrl(str) }
}
