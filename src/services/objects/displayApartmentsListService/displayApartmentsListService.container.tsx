import { Pagination } from 'antd';
import { useUnit } from 'effector-react';
import React, { FC } from 'react';
import { displayApartmentsListService } from './displayApartmentsListService.model';
import { ApartmentsList } from './view/ApartmentsList';
import { ApartmentsSearch } from './view/ApartmentsSearch';
import { HeaderInject } from '../objectsProfileService/view/ObjectsProfile/ObjectsProfile.types';
import { SizeWrapper } from '../objectsProfileService/view/ObjectsProfile/ObjectsProfile.styled';
import { getApartmentsQuery } from './displayApartmentsListService.api';

const { inputs, outputs, gates } = displayApartmentsListService;
const { ApartmentsListGate } = gates;

export const ApartmentsListContainer: FC<HeaderInject> = ({ Header }) => {
  const {
    apartments,
    handleSearch,
    pagedInfo,
    setPageNumber,
    isLoading,
    isApartmentFetched,
  } = useUnit({
    handleSearch: inputs.searchApartments,
    setPageNumber: inputs.setPageNumber,
    apartments: outputs.$apartmentsList,
    pagedInfo: outputs.$pagedInfo,
    isLoading: outputs.$isLoading,
    isApartmentFetched: getApartmentsQuery.$succeeded,
  });

  const { pageNumber, pageSize, totalItems } = pagedInfo;

  const isEmpty = !apartments?.length;

  const isShowPagination = !isEmpty && !isLoading;

  console.log(isApartmentFetched, isEmpty);

  return (
    <>
      <ApartmentsListGate />
      <Header>
        <ApartmentsSearch
          handleSearch={handleSearch}
          isSearchError={isApartmentFetched && isEmpty}
        />
      </Header>
      <SizeWrapper>
        <ApartmentsList
          apartments={apartments}
          isLoading={isLoading}
          isEmpty={isEmpty}
          isApartmentFetched={isApartmentFetched}
        />
      </SizeWrapper>
      {isShowPagination && (
        <Pagination
          showSizeChanger={false}
          current={pageNumber}
          onChange={setPageNumber}
          total={totalItems}
          pageSize={pageSize}
        />
      )}
    </>
  );
};
