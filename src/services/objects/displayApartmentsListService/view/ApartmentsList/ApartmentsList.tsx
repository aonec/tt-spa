import { TypeAddressToStart } from '01/shared/ui/TypeToStart';
import { Skeleton } from 'antd';
import React, { FC } from 'react';
import { ApartmentItem } from './ApartmentItem';
import { Wrapper } from './ApartmentsList.styled';
import { ApartmentsListProps } from './ApartmentsList.types';

export const ApartmentsList: FC<ApartmentsListProps> = ({
  apartmentsList,
  isLoading,
}) => {
  const isEmpty = !apartmentsList || apartmentsList.length === 0;

  return (
    <Wrapper>
      {isLoading && <Skeleton active />}
      {!isLoading &&
        apartmentsList?.map((apartment) => (
          <ApartmentItem apartment={apartment} />
        ))}
      {isEmpty && !isLoading && <TypeAddressToStart />}
    </Wrapper>
  );
};
