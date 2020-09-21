import React, { useEffect, useContext } from "react"
import { Route, useRouteMatch, Switch } from "react-router-dom"
import styled from "reshadow/macro"

import { title_section } from "styles/helper"
import { SimpleListItem, DeviceItemList } from "components"
import { HousingStocksContext } from "./context"

export const HousingStocksObjectInfo = () => {
  const { path, url } = useRouteMatch()

  const [state, dispatch] = useContext(HousingStocksContext)
  console.log(1, path)
  useEffect(() => {
    if (!url.includes("devices") && !state.index) dispatch({ type: "get" })
    if (url.includes("devices") && !state.devices) dispatch({ type: "get" })
  }, [path])
  useEffect(
    () => () => {
      console.log("clear")
    },
    []
  )
  const {
    get,
    district,
    index,
    numberOfEntrances,
    numberOfApartments,
    numberOfFloors,
    totalLivingArea,
    areaOfNonResidential,
    houseArea,
    totalArea,
    constructionYear,
    isThereElevator,
    devices,
  } = state

  return styled(title_section)(
    <Route path={"/housingstocks/:housingstockId"} exact>
      <title_section>Информация</title_section>
      <ul>
        {[
          { title: "Район", value: district },
          // { title: "Тип дома", value: "" },
          { title: "Индекс", value: index },
          { title: "Колличество подъездов", value: numberOfEntrances },
          { title: "Колличество этажей", value: numberOfFloors },
          { title: "Лифт", value: isThereElevator },
          { title: "Количество квартир", value: numberOfApartments },
          {
            title: "Общая площадь жилых помещений",
            value: totalLivingArea,
          },
          {
            title: "Площадь нежилых помещений",
            value: areaOfNonResidential,
          },
          { title: "Площадь придомовая", value: houseArea },
          { title: "Общая площадь", value: totalArea },
          { title: "Год постройки", value: constructionYear },
        ].map((item) => (
          <SimpleListItem key={item.title} {...item} />
        ))}
      </ul>
    </Route>
  )
}
