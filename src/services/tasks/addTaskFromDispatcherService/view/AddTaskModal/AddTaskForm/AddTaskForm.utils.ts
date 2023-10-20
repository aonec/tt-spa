import {
  ExistingApartmentNumberType,
  PreparedAddress,
} from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.types';
import { AddressOption } from './AddTaskForm.types';
import { countSimilarityPoints } from 'utils/countSimilarityPoints';

export function preparedAddressOption(
  addressSearch: string,
  streets: PreparedAddress[],
): AddressOption[] {
  if (!addressSearch) return [];

  const filteredStreets = streets.filter((street) =>
    street.address
      .toLocaleLowerCase()
      .startsWith(addressSearch.toLocaleLowerCase()),
  );

  return filteredStreets.map((street) => ({
    value: street.address,
    key: street.id,
  }));
}

export function autocompleteApartNumber(
  apartmentNumber: string | null,
  existingApartmentNumbers: ExistingApartmentNumberType[],
): ExistingApartmentNumberType[] {
  if (!apartmentNumber) return existingApartmentNumbers;
  return existingApartmentNumbers.filter((apart) =>
    apart.value
      .toLocaleLowerCase()
      .startsWith(apartmentNumber.toLocaleLowerCase()),
  );
}

export function autocomplete(
  street: string | null,
  streets: PreparedAddress[],
): AddressOption[] {
  if (street === null) {
    return [];
  }

  return filterAddressBySimilarity(street, streets).map((elem) => ({
    value: elem.address,
    key: elem.id,
  }));
}

function filterAddressBySimilarity(
  addressSearch: string,
  streets: PreparedAddress[],
) {
  return streets
    .filter((street) =>
      street.address
        .toLocaleLowerCase()
        .startsWith(addressSearch.toLocaleLowerCase()[0]),
    )
    .filter((street) => {
      const searchSimilarityPoint = countSimilarityPoints(
        addressSearch,
        street.address,
      );
      return Boolean(searchSimilarityPoint);
    })
    .sort((a, b) => {
      const bPoints = countSimilarityPoints(addressSearch, b.address);
      const aPoints = countSimilarityPoints(addressSearch, a.address);

      return bPoints - aPoints;
    });
}
