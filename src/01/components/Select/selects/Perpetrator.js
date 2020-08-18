import React from "react"
import axios from "01/axios"

import { Select } from "../Select"

export const Perpetrator = ({ getData = () => {}, ...props }) => {
  const [data, setData] = React.useState({ loading: null })

  React.useEffect(() => {
    data.loading &&
      axios
        .get("ManagingFirmUsers", {
          params: { RoleNames: "ManagingFirmExecutor" },
        })
        .then((data) => setData({ items: data.items }))
  }, [data])

  return (
    <Select
      big
      placeholder="Выберите исполнителя"
      labelText={"Исполнитель"}
      list={data.items ?? []}
      loading={data.loading}
      onClick={() => !data.items && setData({ loading: true })}
      getSelectData={(id) => getData({ nextPerpetratorId: id[0] ?? null })}
      {...props}
    />
  )
}
