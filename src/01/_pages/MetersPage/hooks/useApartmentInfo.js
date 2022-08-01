/* eslint-disable */

import { getApartmentAddressString } from "../../../../utils/getApartmentAddress";


export const useApartmentInfo = (apartInfo, homeownerIndex) => {
  const { homeownerAccounts = [], comment } = apartInfo || {};

  const homeowner = homeownerAccounts[homeownerIndex || 0] || {};

  return {
    title: getApartmentAddressString(apartInfo),
    userInfo: [
      ['Собственник', homeowner.name],
      ['Телефон', homeowner?.phoneNumber ?? '-'],
    ],
    comment: comment,
  };
};
