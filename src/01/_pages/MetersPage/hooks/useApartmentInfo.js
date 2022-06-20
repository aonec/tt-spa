/* eslint-disable */

export const useApartmentInfo = (apartInfo, homeownerIndex) => {
  const {
    housingStock = {},
    apartmentNumber,
    homeownerAccounts = [],
    comment,
  } = apartInfo || {};

  const { street, number, corpus } = housingStock.address.mainAddress;
  const homeowner = homeownerAccounts[homeownerIndex || 0] || {};

  return {
    title:
      apartmentNumber &&
      `${street}, ${number}${corpus || ''}, кв.${apartmentNumber}`,
    userInfo: [
      ['Собственник', homeowner.name],
      ['Телефон', homeowner?.phoneNumber ?? '-'],
    ],
    comment: comment,
  };
};
