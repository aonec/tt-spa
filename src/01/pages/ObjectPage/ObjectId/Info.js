import React from "react"

// import { InfoItem } from "01/components/items/InfoItem"

export const Info = (info = null) => {
  if (!info) return "loading"
  console.log(info)
  return (
    <info>
      {/* {info?.map(({ 0: name, 1: value, 2: url }) => (
        <InfoItem {...{ name, value, url }} />
      ))} */}
    </info>
  )
}

// function createObjInfoList(info = {}) {
//   return [
//     ["Район", info.district],
//     ["Индекс", info["index"]],
//     ["Колличество подъездов", info["numberOfEntrances"]],
//     ["Колличество этажей", info["numberOfFloors"]],
//     ["Лифт", info["isThereElevator"]],
//     ["Количество квартир", info["numberOfApartments"]],
//     ["Общая площадь жилых помещений", info["totalLivingArea"]],
//     ["Площадь нежилых помещений", info["areaOfNonResidential"]],
//     ["Площадь придомовая", info["houseArea"]],
//     ["Общая площадь", info["totalArea"]],
//     ["Год постройки", info["constructionYear"]],
//   ]
// }
