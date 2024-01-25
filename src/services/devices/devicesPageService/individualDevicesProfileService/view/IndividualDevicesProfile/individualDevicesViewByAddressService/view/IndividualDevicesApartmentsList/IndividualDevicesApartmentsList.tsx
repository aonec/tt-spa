import React, { FC } from 'react';
import { AddressHeader } from './AddressHeader';
import { IndividualDevicesApartmentItem } from './IndividualDevicesApartmentItem';
import { ListWrapper, Wrapper } from './IndividualDevicesApartmentsList.styled';
import { IndividualDevicesApartmentsListProps } from './IndividualDevicesApartmentsList.types';
import { WithLoader } from 'ui-kit/shared/WithLoader';

export const IndividualDevicesApartmentsList: FC<
  IndividualDevicesApartmentsListProps
> = ({
  housingsByFilter,
  isLoading,
  individualDevicesApartmentsList,
  updateSearchPayload,
}) => {
  return (
    <Wrapper>
      <WithLoader isLoading={isLoading}>
        {housingsByFilter && (
          <AddressHeader
            updateSearchPayload={updateSearchPayload}
            housingsByFilter={housingsByFilter}
          />
        )}
        <ListWrapper>
          {individualDevicesApartmentsList &&
            individualDevicesApartmentsList.map((apartment) => (
              <IndividualDevicesApartmentItem
                key={apartment.apartmentId}
                individualDevicesApartment={apartment}
                housingStockId={housingsByFilter?.current?.id}
              />
            ))}
        </ListWrapper>
      </WithLoader>
    </Wrapper>
  );
};
