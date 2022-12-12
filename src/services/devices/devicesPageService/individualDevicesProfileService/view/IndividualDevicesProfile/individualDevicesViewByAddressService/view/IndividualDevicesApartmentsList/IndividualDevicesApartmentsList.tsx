import { Empty, Skeleton } from 'antd';
import React, { FC } from 'react';
import { AddressHeader } from './AddressHeader';
import { IndividualDevicesApartmentItem } from './IndividualDevicesApartmentItem';
import { ListWrapper, Wrapper } from './IndividualDevicesApartmentsList.styled';
import { IndividualDevicesApartmentsListProps } from './IndividualDevicesApartmentsList.types';

export const IndividualDevicesApartmentsList: FC<IndividualDevicesApartmentsListProps> = ({
  housingsByFilter,
  isLoading,
  individualDevicesApartmentsList,
  updateSearchPayload,
}) => {
  return (
    <Wrapper>
      {isLoading && <Skeleton active />}
      {!isLoading && housingsByFilter && (
        <AddressHeader
          updateSearchPayload={updateSearchPayload}
          housingsByFilter={housingsByFilter}
        />
      )}
      <ListWrapper>
        {!isLoading &&
          individualDevicesApartmentsList &&
          individualDevicesApartmentsList.map((apartment) => (
            <IndividualDevicesApartmentItem
              key={apartment.apartmentId}
              individualDevicesApartment={apartment}
              housingStockId={housingsByFilter?.current?.id}
            />
          ))}
      </ListWrapper>
    </Wrapper>
  );
};
