import { HousingStockShortResponse } from 'myApi';

export const fullAddressesString = (
  address: HousingStockShortResponse | null
) => {
  const additionalAddresses = address?.address?.additionalAddresses || [];

  const mainAddress = address?.address?.mainAddress;
  const corpusText = mainAddress?.corpus ? `, к.${mainAddress.corpus}` : '';
  const mainAddressText = `${mainAddress?.city} ${String.fromCharCode(
    8226
  )} ${`ул. ${mainAddress?.street}`}, ${mainAddress?.number}${corpusText}`;

  const additionalAddressesText = additionalAddresses
    .map((elem) => {
      return `${elem?.street}, ${elem.number}${
        elem.corpus ? `, к.${elem.corpus}` : ''
      }`;
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
        return `${address?.city}, ${`ул. ${address?.street}`}, ${
          address?.number
        }${address?.corpus ? `, к.${address?.corpus}` : ''}, ${elem?.street}, ${
          elem.number
        }${elem.corpus ? `, к.${elem.corpus}` : ''}`;
      } else {
        return `${elem.street}, ${elem.number}`;
      }
    })
    .join('; ');
};
