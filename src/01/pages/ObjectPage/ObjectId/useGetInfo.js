import React from "react"
import { useRouteMatch } from "react-router-dom"

import axios from "01/axios"

export const useGetInfo = () => {
  const [info, setInfo] = React.useState(null)

  const infoPage = useRouteMatch()

  React.useEffect(() => {
    const url = infoPage.url.replace(/objects/gi, "housingstocks")
    if (infoPage.isExact && !info)
      (async () => {
        const res = await axios(url)
        setInfo(createObjInfoList(res.data.successResponse))
      })()
    // eslint-disable-next-line
  }, [infoPage.isExact])
  console.log(info)
  return { list: info }
}

function createObjInfoList(info = {}) {
  return [
    ["Район", info.district],
    ["Индекс", info.index],
    ["Колличество подъездов", info.numberOfEntrances],
    ["Колличество этажей", info.numberOfFloors],
    ["Лифт", info.isThereElevator],
    ["Количество квартир", info.numberOfApartments],
    ["Общая площадь жилых помещений", info.totalLivingArea],
    ["Площадь нежилых помещений", info.areaOfNonResidential],
    ["Площадь придомовая", info.houseArea],
    ["Общая площадь", info.totalArea],
    ["Год постройки", info.constructionYear],
  ]
}
