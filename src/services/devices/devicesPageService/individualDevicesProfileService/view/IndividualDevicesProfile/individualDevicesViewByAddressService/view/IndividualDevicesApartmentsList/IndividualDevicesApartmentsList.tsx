import { Skeleton } from 'antd';
import React, { FC } from 'react';
import { Wrapper } from './IndividualDevicesApartmentsList.styled';
import { IndividualDevicesApartmentsListProps } from './IndividualDevicesApartmentsList.types';

export const IndividualDevicesApartmentsList: FC<IndividualDevicesApartmentsListProps> = ({
  housingsByFilter,
  isLoading,
}) => {
  return (
    <Wrapper>
      {isLoading && <Skeleton active />}
      {!isLoading && housingsByFilter && JSON.stringify(housingsByFilter)}
    </Wrapper>
  );
};
