const objectChanges = [
  ['Дата и время', 'dateandtime'],
  ['Действие', 'action'],
  ['Исполнитель', 'executor'],
  // ["Дата следующей поверки", "numberOfEntrances"],
  // ["Тип ресурса", "numberOfFloors"],
  // ["Место установки", "isThereElevator"],
  // ["Тип пломбы", "numberOfApartments"],
  // ["Пломба", "totalLivingArea"],
  // ["Организация", "areaOfNonResidential"],
  // ["Монтажная организация", "houseArea"],
  // ["Общая площадь", "totalArea"],
  // ["Год постройки", "constructionDate"],
];

// const objectInfo = [
//   ["Город", "city"],
//   ["Район", "district"],
//   ["Индекс", "index"],
//   ["Количество подъездов", "numberOfEntrances"],
//   ["Количество этажей", "numberOfFloors"],
//   ["Наличие лифта", "isThereElevator"],
//   ["Количество квартир", "numberOfApartments"],
//   ["Общая площадь жилых помещений", "totalLivingArea"],
//   ["Площадь нежилых помещений", "areaOfNonResidential"],
//   ["Придомовая площадь", "houseArea"],
//   ["Общая площадь", "totalArea"],
//   ["Год постройки", "constructionDate"],
// ]

export const useDeviceChanges = (props) => {
  return {
    loading: !props.index,
    list: objectChanges.reduce((list, item) => {
      list.push({ title: item[0], value: props[item[1]] });
      return list;
    }, []),
  };
};
