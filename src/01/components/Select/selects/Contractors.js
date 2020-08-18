import React from "react"
import axios from "01/axios"

import { Select } from "../Select"

export const Contractors = ({ getData = () => {}, ...props }) => {
  const [data, setData] = React.useState({ loading: null })

  React.useEffect(() => {
    data.loading &&
      axios.get("Contractors").then((data) => setData({ items: data.items }))
  }, [data])

  return (
    <Select
      big
      placeholder="Выберите получателя"
      labelText={"Получатель пригласительного письма"}
      list={data.items ?? []}
      loading={data.loading}
      onClick={() => !data.items && setData({ loading: true })}
      getSelectData={(contractorIds) => getData({ contractorIds })}
      {...props}
    />
  )
}
