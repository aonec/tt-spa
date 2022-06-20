/* eslint-disable */

export const useApartmentInfo = (apartInfo, homeownerIndex) => {
  const {
    housingStock = {},
    apartmentNumber,
    homeownerAccounts = [],
    comment,
  } = apartInfo || {};

  const { street, number, corpus } = housingStock.address?.mainAddress || {
    street: '',
    number: undefined,
    corpus: '',
  };
  const homeowner = homeownerAccounts[homeownerIndex || 0] || {};

  return {
    title:
      apartmentNumber &&
      housingStock.address?.mainAddress &&
      `${street}, ${number} ${corpus || ''}, кв.${apartmentNumber}`,
    userInfo: [
      ['Собственник', homeowner.name],
      ['Телефон', homeowner?.phoneNumber ?? '-'],
    ],
    comment: comment,
  };
};
