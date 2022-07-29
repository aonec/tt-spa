import { Skeleton } from 'antd';
import React, { FC, useMemo } from 'react';
import { TypeAddressToStart } from '../../../../../01/shared/ui/TypeToStart';
import { ApartmentItem } from './ApartmentItem';
import { ApartmentsListProps } from './ApartmentsList.types';

export const ApartmentsList: FC<ApartmentsListProps> = ({
  apartments,
  isLoading,
}) => {
  const apartmentsList = useMemo(() => {
    return apartments?.map((apartment) => (
      <ApartmentItem key={apartment.id} apartment={apartment} />
    ));
  }, [apartments]);

  const isEmpty = useMemo(() => !apartments?.length, [apartments]);

  return (
    <div>
      {isLoading && <Skeleton active />}
      {!isLoading && apartmentsList}
      {isEmpty && !isLoading && <TypeAddressToStart />}
    </div>
  );
};
