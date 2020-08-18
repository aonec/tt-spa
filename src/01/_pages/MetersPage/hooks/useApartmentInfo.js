export const useApartmentInfo = ({ apartInfo = {} }) => {
  console.log(apartInfo)
  const { housingStock = {}, apartmentNumber, homeowners = [] } = apartInfo
  return {
    title:
      apartmentNumber &&
      `${housingStock.street}, ${housingStock.number}, кв.${apartmentNumber}`,
    userInfo: [
      ["Собственник", homeowners[0]?.firstName],
      ["Лицевой счет", homeowners[0]?.personalAccountNumber],
      ["Телефон", homeowners[0]?.phoneNumber ?? "-"],
      ["Управляющая компания", "-"],
      ["Информация об УК", "-"],
    ],
  }
}
