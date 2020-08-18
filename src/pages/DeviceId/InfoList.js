import React from "react"

import { SimpleListItem } from "components"

export const InfoList = ({
  commercialAccountingDate,
  lastCheckingDate,
  futureCheckingDate,
}) => {
  if (!futureCheckingDate) return null
  return (
    <ul>
      {[
        // { title: "Статус прибора", value: "" },
        {
          title: "Дата ввода в эксплуатацию",
          value: new Date(commercialAccountingDate).toLocaleDateString(),
        },
        {
          title: "Дата начальной поверки",
          value: new Date(lastCheckingDate).toLocaleDateString(),
        },
        {
          title: "Дата следующей поверки",
          value: new Date(futureCheckingDate).toLocaleDateString(),
        },
        // { title: "Тип ресурса", value: "" },
        // { title: "Место установки", value: "" },
        // { title: "Тип пломбы", value: "" },
        // { title: "Магнитная пломба", value: "" },
        // { title: "Организация", value: "" },
        // { title: "Монтажная организация", value: "" },
      ].map((item) => (
        <SimpleListItem key={item.title} {...item} />
      ))}
    </ul>
  )
}
