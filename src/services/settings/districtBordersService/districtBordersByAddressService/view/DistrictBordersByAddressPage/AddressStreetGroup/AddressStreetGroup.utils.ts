import _ from 'lodash';
import { AddressShortResponse } from 'myApi';

export function splitStringByLetter(address: AddressShortResponse) {
  const string = address.number;
  
  const regex = /[а-яА-Яa-zA-Z]+/;
  const startLetterIndex = string.search(regex);
  if (startLetterIndex === -1) {
    return { ...address, number: [string] };
  }
  const number = string.slice(0, startLetterIndex);
  const letter = string.slice(startLetterIndex);

  return { ...address, number: [number, letter] };
}

function sortArray(
  addresses: ({
    number: string[];
    housingStockId: number;
    buildingId: number;
    housingStockNumber: string | null;
    housingStockCorpus: string | null;
    corpus: string | null;
  })[],
) {
        addresses.sort((a, b) => {
    const numComparison = parseInt(a?.number[0]) - parseInt(b?.number[0]);
    const letterComparison = (a?.number[1] || '').localeCompare(b?.number[1] || '');
    return numComparison !== 0 ? numComparison : letterComparison;
  });

  return arr.map((subarray) => subarray.join(''));
}

export const sortStickyBodyAddress = (
  addresses: AddressShortResponse[] | null,
) => {
  if (!addresses) {
    return [];
  }

  const splitedAddressesArr = addresses.map((address) => {
    return splitStringByLetter(address);
  });

  const sortedFlatArray = sortArray(splitedAddressesArr);

  //   return sortedFlatArray;
};
