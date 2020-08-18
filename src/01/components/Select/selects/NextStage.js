import React from "react"
import axios from "01/axios"
import { useParams } from "react-router-dom"

import { Select } from "../Select"

export const NextStage = ({ getData = () => {}, ...props }) => {
  const { 0: id } = useParams()
  const [data, setData] = React.useState({ loading: null })

  React.useEffect(() => {
    data.loading &&
      axios
        .get(`tasks/${id}/nextstages`)
        .then((data) => setData({ items: data.items }))
  }, [data])

  return (
    <Select
      big
      placeholder="Выберите действие"
      labelText={"Действия"}
      list={data.items ?? []}
      loading={data.loading}
      onClick={() => !data.items && setData({ loading: true })}
      getSelectData={(id) => getData({ nextStageId: id[0] ?? null })}
      {...props}
    />
  )
}
