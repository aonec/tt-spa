import { Skeleton } from 'antd';
import React, { FC, useMemo } from 'react';
import { PersonalNumberItem } from './PersonalNumberItem';
import { PersonalNumbersListProps } from './PersonalNumbersList.types';

export const PersonalNumbersList: FC<PersonalNumbersListProps> = ({
  apartments,
  isLoading,
}) => {
  const apartmentsList = useMemo(
    () =>
      apartments.map((apartment) => (
        <PersonalNumberItem key={apartment.id} apartment={apartment} />
      )),
    [apartments]
  );

  return (
    <>
      {isLoading && <Skeleton active />}
      {!isLoading && apartmentsList}
    </>
  );
};
