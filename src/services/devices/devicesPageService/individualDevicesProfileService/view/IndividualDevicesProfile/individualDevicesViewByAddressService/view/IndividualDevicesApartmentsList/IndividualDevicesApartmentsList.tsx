import { Empty, Skeleton } from 'antd';
import React, { FC } from 'react';
import { AddressHeader } from './AddressHeader';
import { Wrapper } from './IndividualDevicesApartmentsList.styled';
import { IndividualDevicesApartmentsListProps } from './IndividualDevicesApartmentsList.types';

export const IndividualDevicesApartmentsList: FC<IndividualDevicesApartmentsListProps> = ({
  housingsByFilter,
  isLoading,
  individualDevicesApartmentsList,
}) => {
  return (
    <Wrapper>
      {isLoading && <Skeleton active />}
      {!isLoading && housingsByFilter && (
        <AddressHeader housingsByFilter={housingsByFilter} />
      )}
      {!isLoading &&
        individualDevicesApartmentsList &&
        JSON.stringify(individualDevicesApartmentsList)}
    </Wrapper>
  );
};
