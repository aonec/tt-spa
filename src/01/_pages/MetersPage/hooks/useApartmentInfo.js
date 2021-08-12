export const useApartmentInfo = ({ apartInfo = {} }) => {
  const { housingStock = {}, apartmentNumber, homeowners = [] } = apartInfo;

  const homeowner = homeowners[0] || {};

  return {
    title:
      apartmentNumber &&
      `${housingStock.street}, ${housingStock.number}${
        housingStock.corpus || ''
      }, кв.${apartmentNumber}`,
    userInfo: [
      [
        'Собственник',
        homeowner.fillName ||
          `${homeowner.lastName || ''} ${homeowner.firstName || ''} ${
            homeowner.middleName || ''
          }`,
      ],
      ['Лицевой счет', homeowners[0]?.personalAccountNumber],
      ['Телефон', homeowners[0]?.phoneNumber ?? '-'],
      ['Управляющая компания', '-'],
      ['Информация об УК', '-'],
    ],
    comment: apartInfo.comment,
  };
};
