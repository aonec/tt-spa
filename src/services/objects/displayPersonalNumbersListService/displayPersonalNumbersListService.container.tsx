import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { PaginationSC } from './displayPersonalNumberListSevice.styled';
import { displayPersonalNumbersListService } from './displayPersonalNumbersListService.model';
import { PersonalNumbersList } from './view/PersonalNumbersList';
import { PersonalNumbersSearch } from './view/PersonalNumbersSearch';
import { HeaderInject } from '../objectsProfileService/view/ObjectsProfile/ObjectsProfile.types';
import { SizeWrapper } from '../objectsProfileService/view/ObjectsProfile/ObjectsProfile.styled';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { inputs, outputs, gates } = displayPersonalNumbersListService;
const { SearchPersonalNumberGate } = gates;
const { ExistingCitiesGate } = addressSearchService.gates;

export const DisplayPersonalNumbersListContainer: FC<HeaderInject> = ({
  Header,
}) => {
  const cities = useStore(outputs.$cities);
  const apartments = useStore(outputs.$apartments);
  const isLoading = useStore(outputs.$isLoading);
  const apartmentsListPage = useStore(outputs.$apartmentsListPage);

  const handleSearch = useEvent(inputs.searchPersonalNumbers);
  const handlePageNumberChanged = useEvent(inputs.setPageNumber);

  const isNotEmpty = apartments.length > 0;

  return (
    <>
      <SearchPersonalNumberGate />
      <ExistingCitiesGate />
      <Header>
        <PersonalNumbersSearch handleSearch={handleSearch} cities={cities} />
      </Header>
      <SizeWrapper>
        <PersonalNumbersList apartments={apartments} isLoading={isLoading} />
      </SizeWrapper>
      {isNotEmpty && !isLoading && (
        <PaginationSC
          showSizeChanger={false}
          defaultCurrent={1}
          current={apartmentsListPage?.pageNumber}
          onChange={handlePageNumberChanged}
          total={apartmentsListPage?.totalItems}
          pageSize={apartmentsListPage?.pageSize}
        />
      )}
    </>
  );
};
