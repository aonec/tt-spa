import { Pagination } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { displayApartmentsListService } from './displayApartmentsListService.model';
import { ApartmentsList } from './view/ApartmentsList';
import { ApartmentsSearch } from './view/ApartmentsSearch';

export const ApartmentsListContainer = () => {
  const { inputs, outputs } = displayApartmentsListService;

  const handleSearch = useEvent(inputs.searchApartments);
  const setPageNumber = useEvent(inputs.setPageNumber);

  const apartments = useStore(outputs.$apartmentsList);
  const { pageNumber, pageSize, totalItems } = useStore(outputs.$pagedInfo);

  const isLoading = useStore(outputs.$isLoading);

  const { ApartmentsListGate } = displayApartmentsListService.gates;

  const isEmpty = !apartments?.length;

  const isShowPagination = !isEmpty && !isLoading;

  return (
    <>
      <ApartmentsListGate />
      <ApartmentsSearch handleSearch={handleSearch} />
      <ApartmentsList apartments={apartments} isLoading={isLoading} />
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
