export const useApartmentInfo = (apartInfo) => {
  const { housingStock = {}, apartmentNumber, homeowners = [], comment } =
    apartInfo || {};

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
    ],
    comment: comment,
  };
};
