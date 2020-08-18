import React from "react"
import { SimpleListItem } from "components"

export const InfoList = ({
  district,
  index,
  numberOfEntrances,
  numberOfFloors,
  isThereElevator,
  numberOfApartments,
  totalLivingArea,
  areaOfNonResidential,
  houseArea,
  totalArea,
  constructionYear,
}) => {
  if (!district) return null
  return (
    <ul>
      {[
        { title: "Район", value: district },
        // { title: "Тип дома", value: "" },
        { title: "Индекс", value: index },
        { title: "Колличество подъездов", value: numberOfEntrances },
        { title: "Колличество этажей", value: numberOfFloors },
        { title: "Лифт", value: isThereElevator },
        { title: "Количество квартир", value: numberOfApartments },
        { title: "Общая площадь жилых помещений", value: totalLivingArea },
        { title: "Площадь нежилых помещений", value: areaOfNonResidential },
        { title: "Площадь придомовая", value: houseArea },
        { title: "Общая площадь", value: totalArea },
        { title: "Год постройки", value: constructionYear },
      ].map((item) => (
        <SimpleListItem key={item.title} {...item} />
      ))}
    </ul>
  )
}
