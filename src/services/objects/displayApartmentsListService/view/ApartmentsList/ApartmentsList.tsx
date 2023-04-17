import React, { FC, useMemo } from 'react';
import { ApartmentItem } from './ApartmentItem';
import { ApartmentsListProps } from './ApartmentsList.types';
import { TypeAddressToStart } from 'ui-kit/shared_components/TypeToStart';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';

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
      <WithLoader isLoading={isLoading}>
        {apartmentsList}
        {isEmpty && <TypeAddressToStart />}
      </WithLoader>
    </div>
  );
};
