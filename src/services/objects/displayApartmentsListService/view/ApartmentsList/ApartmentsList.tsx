import { TypeAddressToStart } from '01/shared/ui/TypeToStart';
import { Skeleton } from 'antd';
import { groupBy } from 'lodash';
import React, { FC, useMemo } from 'react';
import { ApartmentItem } from './ApartmentItem';
import { StreetGroupHeader, StreetGroupWrapper } from './ApartmentsList.styled';
import { ApartmentsListProps } from './ApartmentsList.types';

export const ApartmentsList: FC<ApartmentsListProps> = ({
  apartmentsList,
  isLoading,
}) => {
  const groupedApartments = useMemo(() => {
    const grouped = Object.entries(
      groupBy(apartmentsList, 'housingStock.address.mainAddress.street')
    );

    return grouped.map(([street, apartment], index) => (
      <StreetGroupWrapper key={index}>
        <StreetGroupHeader>{street}</StreetGroupHeader>
        {apartment?.map((apartment) => (
          <ApartmentItem key={apartment.id} apartment={apartment} />
        ))}
      </StreetGroupWrapper>
    ));
  }, [apartmentsList]);

  const isEmpty = useMemo(() => !apartmentsList?.length, [apartmentsList]);

  return (
    <div>
      {isLoading && <Skeleton active />}
      {!isLoading && groupedApartments}
      {isEmpty && !isLoading && <TypeAddressToStart />}
    </div>
  );
};
