/* eslint-disable */

import { getHousingStockAddress } from "../utils/getHousingStockAddress";


export const useApartmentInfo = (apartInfo, homeownerIndex) => {
  const {
    housingStock = {},
    apartmentNumber,
    homeownerAccounts = [],
    comment,
  } = apartInfo || {};

  const homeowner = homeownerAccounts[homeownerIndex || 0] || {};

  return {
    title: getHousingStockAddress(apartmentNumber, housingStock),
    userInfo: [
      ['Собственник', homeowner.name],
      ['Телефон', homeowner?.phoneNumber ?? '-'],
    ],
    comment: comment,
  };
};
