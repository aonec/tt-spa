export const useApartmentInfo = ({ apartInfo = {} }) => {
  const { housingStock = {}, apartmentNumber, homeowners = [] } = apartInfo;
  console.log(apartInfo);
  return {
    title:
      apartmentNumber &&
      `${housingStock.street}, ${housingStock.number}, кв.${apartmentNumber} ${
        housingStock.corpus ? `, к.${housingStock.corpus}` : ''
      }`,
    userInfo: [
      ['Собственник', homeowners[0]?.firstName],
      ['Лицевой счет', homeowners[0]?.personalAccountNumber],
      ['Телефон', homeowners[0]?.phoneNumber ?? '-'],
      ['Управляющая компания', '-'],
      ['Информация об УК', '-'],
    ],
  };
};
