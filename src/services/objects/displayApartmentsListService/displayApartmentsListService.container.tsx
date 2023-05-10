import { Pagination } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { displayApartmentsListService } from './displayApartmentsListService.model';
import { ApartmentsList } from './view/ApartmentsList';
import { ApartmentsSearch } from './view/ApartmentsSearch';
import { HeaderInject } from '../objectsProfileService/view/ObjectsProfile/ObjectsProfile.types';
import { SizeWrapper } from '../objectsProfileService/view/ObjectsProfile/ObjectsProfile.styled';

export const ApartmentsListContainer: FC<HeaderInject> = ({ Header }) => {
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
      <Header>
        <ApartmentsSearch handleSearch={handleSearch} />
      </Header>
      <SizeWrapper>
        <ApartmentsList apartments={apartments} isLoading={isLoading} />
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
