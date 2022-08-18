import { HousingStockShortResponse } from 'myApi';

export const fullAddressesString = (
  address: HousingStockShortResponse | null
) => {
  const additionalAddresses = address?.address?.additionalAddresses || [];


  return additionalAddresses
    .map((elem, i) => {
      if (i === 0) {
       return `${address?.address?.mainAddress?.city} ${String.fromCharCode(
          8226
        )} ${`ул. ${address?.address?.mainAddress?.street}`}, ${address?.address?.mainAddress?.number}${
          address?.address?.mainAddress?.corpus ? `, к.${address?.address?.mainAddress?.corpus}` : ''
        }, ${elem?.street}, ${elem.number}${
          elem.corpus ? `, к.${elem.corpus}` : ''
        }`;
      } else {
       return `${elem.street}, ${elem.number}`;
      }

    })
    .join('; ');

  return {
    mainAddress: mainAddressText,
    additionalAddress: additionalAddressesText,
  };
};

export const additionalAddressesString = (
  address: HousingStockShortResponse | null
) => {
  const additionalAddresses = address?.address?.additionalAddresses || [];

  return additionalAddresses
    .map((elem, i) => {
      if (i === 0) {
       return `${address?.address?.mainAddress?.city}, ${`ул. ${address?.address?.mainAddress?.street}`}, ${address?.address?.mainAddress?.number}${
          address?.address?.mainAddress?.corpus ? `, к.${address?.address?.mainAddress?.corpus}` : ''
        }, ${elem?.street}, ${elem.number}${
          elem.corpus ? `, к.${elem.corpus}` : ''
        }`;

      } else {
        return `${elem.street}, ${elem.number}`;
      }
    })
    .join('; ');
};
