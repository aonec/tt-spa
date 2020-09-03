const objectInfo = {
  ['Адрес', 'city'],
  // ['Дата выпуска прибора', 'district'],
  ['Дата ввода в эксплуатацию', 'commercialAccountingDate'],
  // ['Срок эксплуатации по нормативу', 'numberOfEntrances'],
  ['Дата поверки прибора', 'numberOfFloors'],
  ['Дата следующей поверки прибора', 'isThereElevator'],
  // ["Тип пломбы", "numberOfApartments"],
  // ["Магнитная пломба", "totalLivingArea"],
  // ["Организация", "areaOfNonResidential"],
  // ["Монтажная организация", "houseArea"],
};

export const useObjectInformation = (props) => ({
  loading: !props.index,
  list: objectInfo.reduce((list, item) => {
    list.push({ title: item[0], value: props[item[1]] });
    return list;
  }, []),
});
