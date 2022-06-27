import { HousingStockShortResponse } from 'myApi';

export const additionalAddressesString = (
  address: HousingStockShortResponse | null
) => {
  const additionalAddresses = address?.address?.additionalAddresses || [];

  return additionalAddresses
    .map((elem, i) =>
      i === 0
        ? `${elem.city}: ${elem.street}, ${elem.number}`
        : `${elem.street}, ${elem.number}`
    )
    .join('; ');
};
