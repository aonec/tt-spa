import React, { FC, useCallback } from 'react';
import {
  ButtonSC,
  HeaderWrapper,
  StickyWrapper,
  Wrapper,
} from './ActsJournalProfile.styled';
import { ActsJournalProfileProps } from './ActsJournalProfile.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { AddNewActForm } from './AddNewActForm/AddNewActForm';
import { ActsList } from './ActsList';
import { ActsListHeader } from './ActsListHeader';

export const ActsJournalProfile: FC<ActsJournalProfileProps> = ({
  handleCreateAct,
  isCreateLoading,
  isActsLoading,
  actsPagedData,
  updateActsFilter,
  actsFilter,
  setPageNumber,
  actCreated,
  handleResetAddressSearchForm,
  setModalOpen,
  uploadedFile,
  setViewModalOpen,
  handleDeleteDoc,
  handleOpenDoc,
  resetActAddress,
}) => {
  const handleClearAddress = useCallback(() => {
    updateActsFilter({
      HousingStockNumber: undefined,
      Street: undefined,
      Corpus: undefined,
      ApartmentNumber: undefined,
    });
    handleResetAddressSearchForm();
  }, [updateActsFilter, handleResetAddressSearchForm]);

  return (
    <>
      <Wrapper>
        <StickyWrapper>
          <HeaderWrapper>
            <AddressSearchContainer
              isCityPreselected
              autoBurn
              fields={[
                SearchFieldType.City,
                SearchFieldType.Street,
                SearchFieldType.House,
                SearchFieldType.Corpus,
                SearchFieldType.Apartment,
              ]}
              customTemplate={[
                { fieldType: SearchFieldType.City, templateValue: '0.75fr' },
                { fieldType: SearchFieldType.Street, templateValue: '1.5fr' },
                { fieldType: SearchFieldType.House, templateValue: '0.75fr' },
                {
                  fieldType: SearchFieldType.Apartment,
                  templateValue: '0.75fr',
                },
              ]}
              initialValues={{
                city: actsFilter.City,
                house: actsFilter.HousingStockNumber,
                street: actsFilter.Street,
                corpus: actsFilter.Corpus,
                apartment: actsFilter.ApartmentNumber,
              }}
              handleSubmit={(values) =>
                updateActsFilter({
                  City: values.city,
                  Street: values.street,
                  HousingStockNumber: values.house,
                  Corpus: values.corpus,
                  ApartmentNumber: values.apartment,
                })
              }
            />
            <ButtonSC type="ghost" size="s" onClick={handleClearAddress}>
              Очистить
            </ButtonSC>
          </HeaderWrapper>
          <ActsListHeader
            setActsFilter={updateActsFilter}
            filter={actsFilter}
          />
          <AddNewActForm
            addNewAct={handleCreateAct}
            isCreateLoading={isCreateLoading}
            actCreated={actCreated}
            setModalOpen={setModalOpen}
            uploadedFile={uploadedFile}
            setViewModalOpen={setViewModalOpen}
            handleDeleteDoc={handleDeleteDoc}
            resetActAddress={resetActAddress}
          />
        </StickyWrapper>
        <ActsList
          actsPagedData={actsPagedData}
          isActsLoading={isActsLoading}
          setPageNumber={setPageNumber}
          handleOpenDoc={handleOpenDoc}
        />
      </Wrapper>
    </>
  );
};
