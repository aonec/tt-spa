import { HousingStockShortResponse } from 'myApi';

export const fullAddressesString = (
  address: HousingStockShortResponse | null
) => {
  const additionalAddresses = address?.address?.additionalAddresses || [];
  console.log(address?.number);
  return additionalAddresses
    .map((elem, i) =>
      i === 0
        ? `${address?.city} ${String.fromCharCode(8226)} ${`ул. ${address?.street}`}, ${
            address?.number
          }${
            address?.corpus ? `, к.${address.corpus}` : ''
          } ${String.fromCharCode(8226)} ${`ул. ${elem?.street}`}, ${elem.number}${
            elem.corpus ? `, к.${elem.corpus}` : ''
          }`
        : `${`ул. ${elem.street}`}, ${elem.number}`
    )
    .join('; ');
};

export const additionalAddressesString = (
  address: HousingStockShortResponse | null
) => {
  const additionalAddresses = address?.address?.additionalAddresses || [];

  return additionalAddresses
    .map((elem, i) =>
      i === 0
        ? `${address?.city}, ${`ул. ${address?.street}`}, ${address?.number}${
            address?.corpus ? `, к.${address?.corpus}` : ''
          }; ${`ул. ${elem?.street}`}, ${elem.number}${
            elem.corpus ? `, к.${elem.corpus}` : ''
          }`
        : `${`ул. ${elem.street}`}, ${elem.number}`
    )
    .join('; ');
};
