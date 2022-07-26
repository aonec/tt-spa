import { HousingStockShortResponse } from "../api/types";

export const fullAddressesString = (
  address: HousingStockShortResponse | null
) => {
  const additionalAddresses = address?.address?.additionalAddresses || [];
  return additionalAddresses
    .map((elem, i) => {
      if (i === 0) {
       return `${address?.city} ${String.fromCharCode(
          8226
        )} ${`ул. ${address?.street}`}, ${address?.number}${
          address?.corpus ? `, к.${address.corpus}` : ''
        }, ${elem?.street}, ${elem.number}${
          elem.corpus ? `, к.${elem.corpus}` : ''
        }`;
      } else {
       return `${elem.street}, ${elem.number}`;
      }
    })
    .join('; ');
};

export const additionalAddressesString = (
  address: HousingStockShortResponse | null
) => {
  const additionalAddresses = address?.address?.additionalAddresses || [];

  return additionalAddresses
    .map((elem, i) => {
      if (i === 0) {
       return `${address?.city}, ${`ул. ${address?.street}`}, ${address?.number}${
          address?.corpus ? `, к.${address?.corpus}` : ''
        }, ${elem?.street}, ${elem.number}${
          elem.corpus ? `, к.${elem.corpus}` : ''
        }`;
      } else {
        return `${elem.street}, ${elem.number}`;
      }
    })
    .join('; ');
};
