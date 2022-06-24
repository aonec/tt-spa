import { HousingStockShortResponse } from "myApi";

interface IAddress {
    address: {
      additionalAddresses: {
          city: string,
          street: string,
          number: number;
      }[];
    };
}
export const additionalAddressesString = (address: HousingStockShortResponse | null) => {
  const additionalAddresses = address?.address?.additionalAddresses || [];

  return additionalAddresses
    .map((elem) => `${elem.city}, ${elem.street}, ${elem.number}`)
    .join('; ');
};

