import { Pagination } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { displayApartmentsListService } from './displayApartmentsListService.model';
import { ApartmentsList } from './view/ApartmentsList';
import { ApartmentsSearch } from './view/ApartmentsSearch';

export const ApartmentsListContainer = () => {
  const handleSearch = useEvent(
    displayApartmentsListService.inputs.searchApartments
  );
  const setPageNumber = useEvent(
    displayApartmentsListService.inputs.setPageNumber
  );

  const apartmentsList = useStore(
    displayApartmentsListService.outputs.$apartmentsList
  );
  const { pageNumber, pageSize, totalItems } = useStore(
    displayApartmentsListService.outputs.$pagedInfo
  );

  const isLoading = useStore(displayApartmentsListService.outputs.$isLoading);

  const { ApartmentsListGate } = displayApartmentsListService.gates;

  const isEmpty = !apartmentsList?.length;

  const isShowPagination = !isEmpty && !isLoading;

  return (
    <>
      <ApartmentsListGate />
      <ApartmentsSearch handleSearch={handleSearch} />
      <ApartmentsList apartmentsList={apartmentsList} isLoading={isLoading} />
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
