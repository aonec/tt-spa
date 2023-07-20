import { Empty } from 'antd';
import { EActResourceType, EActType } from 'api/types';
import React, { FC, useMemo } from 'react';
import { FilterExtendedSearch } from 'ui-kit/shared_components/FilterExtendedSearch';
import { actResourceNamesLookup } from 'ui-kit/shared_components/ResourceInfo/ResourceInfo.utils';
import { ApartmentActItem } from './ApartmentActItem';
import {
  AddButton,
  ColumnTitle,
  ExtendedSearchWrapper,
  ListHeader,
  Wrapper,
} from './ApartmentActsList.styled';
import { ApartmentActsListProps } from './ApartmentActsList.types';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { ActTypesNamesLookup } from 'dictionaries';

export const ApartmentActsList: FC<ApartmentActsListProps> = ({
  acts,
  isLoading,
  handleOpeningCreateActModal,
  handleOpeningDeleteActModal,
  handleOpeningEditActModal,
  handleSaveFile,
  handleUpdateTypes,
  handleUpdateResources,
  selectedFilters,
  isPermitionToChangeApartmentAct,
}) => {
  const isShowActsList = Boolean(acts?.length);

  const actsList = useMemo(
    () =>
      Boolean(acts.length) &&
      acts?.map((act) => (
        <ApartmentActItem
          act={act}
          openDeleteActModal={handleOpeningDeleteActModal}
          openEditActModal={handleOpeningEditActModal}
          saveFile={handleSaveFile}
          key={act.id}
          isPermitionToChangeApartmentAct={isPermitionToChangeApartmentAct}
        />
      )),
    [
      acts,
      handleOpeningDeleteActModal,
      handleOpeningEditActModal,
      handleSaveFile,
      isPermitionToChangeApartmentAct,
    ],
  );

  const resources = Object.entries(actResourceNamesLookup).map(
    ([key, value]) => ({ key: key as EActResourceType, value }),
  );

  const allowedFilters = Object.entries(ActTypesNamesLookup).map(
    ([key, value]) => ({
      key: key as EActType,
      value,
    }),
  );

  return (
    <>
      <Wrapper>
        <WithLoader isLoading={isLoading}>
          <ListHeader>
            <ColumnTitle>Дата</ColumnTitle>
            <ColumnTitle>№ акта</ColumnTitle>
            <ColumnTitle>Название документа</ColumnTitle>
            <ColumnTitle>
              Ресурс
              <ExtendedSearchWrapper>
                <FilterExtendedSearch
                  allowedFilters={resources}
                  handleUpdate={handleUpdateResources}
                  selectedFilters={selectedFilters.resources || []}
                />
              </ExtendedSearchWrapper>
            </ColumnTitle>
            <ColumnTitle>
              Тип
              <ExtendedSearchWrapper>
                <FilterExtendedSearch
                  allowedFilters={allowedFilters}
                  handleUpdate={handleUpdateTypes}
                  selectedFilters={selectedFilters.actTypes || []}
                />
              </ExtendedSearchWrapper>
            </ColumnTitle>
          </ListHeader>

          {isShowActsList && actsList}

          {!acts.length && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Нет актов"
            />
          )}

          {isPermitionToChangeApartmentAct && (
            <AddButton
              className="ant-btn-link"
              onClick={handleOpeningCreateActModal}
            >
              + Добавить акт
            </AddButton>
          )}
        </WithLoader>
      </Wrapper>
    </>
  );
};
