import { AddressShortResponse } from 'api/types';
import { ModifiedAddressShortResponse } from './AddressStreetGroup.types';

//разбивает строку на число и буквы
function splitStringByLetter(address: AddressShortResponse) {
  const string = address.number;

  if (string === null) {
    return null;
  }

  const regex = /[а-яА-Яa-zA-Z]+/;
  const startLetterIndex = string.search(regex);
  if (startLetterIndex === -1) {
    return { ...address, number: [string] };
  }
  const number = string.slice(0, startLetterIndex);
  const letter = string.slice(startLetterIndex);

  return { ...address, number: [number, letter] };
}

// сортирует по номеру и буквам, потом обратно "склеевает" в одну строку
function sortArray(addresses: ModifiedAddressShortResponse[]) {
  addresses.sort((a, b) => {
    const numComparison = parseInt(a.number[0]) - parseInt(b.number[0]);
    const letterComparison = (a.number[1] || '').localeCompare(
      b.number[1] || '',
    );
    return numComparison !== 0 ? numComparison : letterComparison;
  });

  return addresses.map((address) => {
    const joinedNumber = address.number.join('');
    return { ...address, number: joinedNumber };
  });
}

// возвращает отсортированный массив адресов путем очерёдного вызова вышепредставленных функций
export const sortStickyBodyAddress = (
  addresses: (AddressShortResponse & { isDistributed: boolean })[] | null,
) => {
  if (!addresses) {
    return [];
  }

  const filteredAddresses = addresses.filter(Boolean);

  const splitedAddressesArr = filteredAddresses
    .map((address) => {
      return splitStringByLetter(address);
    })
    .filter(Boolean) as ModifiedAddressShortResponse[];

  const sortedFlatArray = sortArray(splitedAddressesArr);

  return sortedFlatArray;
};
