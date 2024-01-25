import {
  ExistingApartmentNumberType,
  PreparedAddress,
} from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.types';
import { AddTask, AddressOption } from './AddTaskForm.types';
import { countSimilarityPoints } from 'utils/countSimilarityPoints';
import _ from 'lodash';
import { ErpTaskReasonGroupResponse } from 'api/types';

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

export function autocompleteAddress(
  street: string | null,
  streets: PreparedAddress[],
): AddressOption[] {
  if (!street) {
    return [];
  }

  return filterAddressBySimilarity(street, streets).map((elem) => ({
    value: elem.address,
    key: elem.id,
  }));
}

function filterAddressBySimilarity(search: string, streets: PreparedAddress[]) {
  return streets
    .filter((street) =>
      street.address
        .toLocaleLowerCase()
        .startsWith(search.toLocaleLowerCase()[0]),
    )
    .filter((street) => {
      const searchSimilarityPoint = countSimilarityPoints(
        search,
        street.address,
      );
      return Boolean(searchSimilarityPoint);
    })
    .sort((a, b) => {
      const bPoints = countSimilarityPoints(search, b.address);
      const aPoints = countSimilarityPoints(search, a.address);

      return bPoints - aPoints;
    });
}

export function autocompleteReason(
  search: string | null,
  reasons: ErpTaskReasonGroupResponse[],
): ErpTaskReasonGroupResponse[] {
  if (!search) {
    return reasons;
  }

  return filterReasonBySimilarity(search, reasons);
}

function filterReasonBySimilarity(
  search: string,
  reasons: ErpTaskReasonGroupResponse[],
) {
  return reasons.sort((a, b) => {
    const bPoints = countSimilarityPoints(search, b.name!);
    const aPoints = countSimilarityPoints(search, a.name!);

    return bPoints - aPoints;
  });
}

export const filterData = (data: AddTask) => {
  if (!data.isSourceNumberRequired && data.isSubscriberRequired) {
    return _.omit(data, ['requestNumber']);
  }
  if (!data.isSubscriberRequired && data.isSourceNumberRequired) {
    return _.omit(data, ['subscriberName', 'phoneNumber']);
  }
  if (!data.isSubscriberRequired && !data.isSourceNumberRequired) {
    return _.omit(data, ['subscriberName', 'phoneNumber', 'requestNumber']);
  }
  return data;
};
