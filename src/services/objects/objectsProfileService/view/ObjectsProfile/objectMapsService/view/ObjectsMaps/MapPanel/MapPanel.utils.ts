import { StreetWithHousingStockNumbersResponse } from 'myApi';

export function getAddressSearchData(
  data: StreetWithHousingStockNumbersResponse[] | null = []
) {
  return data?.reduce((acc, elem) => {
    const addresses =
      elem.addresses?.map((address) => ({
        id: address.housingStockId,
        addressString: `ул. ${elem.street}, д. ${address.housingStockNumber}`,
      })) || [];

    return [...acc, ...addresses];
  }, [] as { id: number; addressString: string }[]);
}

export function countSimilarityPoints(
  addressSearch: string,
  addressString: string
) {
  const str = addressString.toLowerCase();

  const addressSearchArr = addressSearch.toLowerCase().split(' ');

  return addressSearchArr.reduce(
    (acc, addressSearchSlice) =>
      str.includes(addressSearchSlice) ? acc + 1 : acc,
    0
  );
}
