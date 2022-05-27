/* eslint-disable */

export const useApartmentInfo = (apartInfo, homeownerIndex) => {
  const {
    housingStock = {},
    apartmentNumber,
    homeownerAccounts = [],
    comment,
  } = apartInfo || {};

  const homeowner = homeownerAccounts[homeownerIndex || 0] || {};

  return {
    title:
      apartmentNumber &&
      `${housingStock.street}, ${housingStock.number}${
        housingStock.corpus || ''
      }, кв.${apartmentNumber}`,
    userInfo: [
      ['Собственник', homeowner.name],
      ['Телефон', homeowner?.phoneNumber ?? '-'],
    ],
    comment: comment,
  };
};
