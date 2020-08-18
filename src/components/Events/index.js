import React from "react"
import styled from "reshadow/macro"

import { title_section } from "styles/helper"
import { useEvents } from "./useEvents"

export const Events = ({ start = true }) => {
  const { items } = useEvents(start)
  console.log(items)
  return styled(title_section)(
    <events>
      <title_section>Задачи с объектом</title_section>
      <ul>
        {items.map((item) => (
          <EventItemList key={item.id} {...item} />
        ))}
      </ul>
    </events>
  )
}

const EventItemList = ({ id }) => {
  return styled()(<li>{id}</li>)
}
