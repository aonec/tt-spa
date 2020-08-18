import React, { useContext } from "react"
import styled from "reshadow/macro"

import { title_section } from "styles/helper"
import { SimpleListItem } from "components"
import { TaskIdContext } from "./contex"

export const InfoList = ({ ...props }) => {
  const [{ id, creationTime, address, housingStockId }] = useContext(
    TaskIdContext
  )
  return styled(title_section)`
    title_section {
      margin-bottom: 16px;
    }
  `(
    <div {...props}>
      <title_section>Подробная информация</title_section>

      <ul>
        {[
          { title: "Причина задачи", value: "1" },
          { title: "Номер задачи", value: id },
          {
            title: "Дата создания",
            value: new Date(creationTime).toLocaleString(),
          },
          {
            title: "Адрес",
            value: address,
            to: `/housingstocks/${housingStockId}`,
          },
          // ["Комментарий к квартире", "1"],
          // ["Тери к квартире", "1"],
          // ["Собственник 1", "1"],
          // ["Статус собственника 1", "1"],
          // ["Юридическое состояние", "1"],
          // ["Номер ЛС собственника 1", "1"],
          // ["Контактный телефон", "1"],
        ].map((item) => (
          <SimpleListItem key={item.title} {...item} />
        ))}
      </ul>
    </div>
  )
}
