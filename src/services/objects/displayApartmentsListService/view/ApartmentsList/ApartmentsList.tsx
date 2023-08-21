import React, { FC, useMemo } from 'react';
import { ApartmentItem } from './ApartmentItem';
import { ApartmentsListProps } from './ApartmentsList.types';
import { TypeAddressToStart } from 'ui-kit/shared/TypeToStart';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { NothingFound } from 'ui-kit/shared/NothingFound';

export const ApartmentsList: FC<ApartmentsListProps> = ({
  apartments,
  isLoading,
  isApartmentFetched,
  isEmpty,
}) => {
  const apartmentsList = useMemo(() => {
    return apartments?.map((apartment) => (
      <ApartmentItem key={apartment.id} apartment={apartment} />
    ));
  }, [apartments]);

  return (
    <div>
      <WithLoader isLoading={isLoading}>
        {apartmentsList}
        {isEmpty && !isApartmentFetched && <TypeAddressToStart />}
        {isEmpty && isApartmentFetched && <NothingFound />}
      </WithLoader>
    </div>
  );
};
