export const useApartmentInfo = (apartInfo, homeownerIndex) => {
  const { housingStock = {}, apartmentNumber, homeowners = [], comment } =
    apartInfo || {};

  const homeowner = homeowners[homeownerIndex || 0] || {};

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
      ['Телефон', homeowners[0]?.phoneNumber ?? '-'],
    ],
    comment: comment,
  };
};
