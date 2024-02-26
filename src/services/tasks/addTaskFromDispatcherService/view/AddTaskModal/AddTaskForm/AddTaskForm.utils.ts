import {
  ExistingApartmentNumberType,
  PreparedAddress,
} from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.types';
import { AddTask, AddressOption } from './AddTaskForm.types';
import _ from 'lodash';
import { ErpTaskReasonGroupResponse } from 'api/types';
import { TaskReasonTypeDictionary } from 'dictionaries';
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

  return sortReasonBySimilarity(search, reasons);
}

function sortReasonBySimilarity(
  search: string,
  reasons: ErpTaskReasonGroupResponse[],
) {
  return reasons.sort((aReason, bReason) => {
    const aReasonWithResource = `${TaskReasonTypeDictionary[aReason.type]} ${
      aReason.name
    }`;
    const bReasonWithResource = `${TaskReasonTypeDictionary[bReason.type]} ${
      bReason.name
    }`;

    const aReasonPoints = countSimilarityPoints(search, aReasonWithResource);
    const bReasonPoints = countSimilarityPoints(search, bReasonWithResource);

    return bReasonPoints - aReasonPoints;
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
