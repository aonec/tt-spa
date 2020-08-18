const objectInfo = [
  ["Город", "city"],
  ["Район", "district"],
  ["Индекс", "index"],
  ["Количество подъездов", "numberOfEntrances"],
  ["Количество этажей", "numberOfFloors"],
  ["Наличие лифта", "isThereElevator"],
  ["Количество квартир", "numberOfApartments"],
  ["Общая площадь жилых помещений", "totalLivingArea"],
  ["Площадь нежилых помещений", "areaOfNonResidential"],
  ["Придомовая площадь", "houseArea"],
  ["Общая площадь", "totalArea"],
  ["Год постройки", "constructionDate"],
]

export const useObjectInformation = (props) => {
  return {
    loading: !props.index,
    list: objectInfo.reduce((list, item) => {
      list.push({ title: item[0], value: props[item[1]] })
      return list
    }, []),
  }
}
