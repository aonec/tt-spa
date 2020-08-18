import { useEffect, useState } from "react"
import axios from "axios"
import { request } from "services/api"

export const useGETSelectOptions = (urls = []) => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .all(urls.map((url) => request(url)))
      .then(axios.spread((...data) => setData(data.map((item) => item.items))))
  }, [])

  return data
}
