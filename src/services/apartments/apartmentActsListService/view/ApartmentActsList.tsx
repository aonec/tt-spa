import { Empty } from 'antd';
import React, { FC, useMemo } from 'react';
import { ApartmentActItem } from './ApartmentActItem';
import {
  AddButton,
  ColumnTitle,
  ExtendedSearchWrapper,
  ListHeader,
  Wrapper,
} from './ApartmentActsList.styled';
import { ApartmentActsListProps } from './ApartmentActsList.types';
import { PendingLoader } from '../../../../01/shared/ui/PendingLoader';
import { actResourceNamesLookup } from '../../../../utils/actResourceNamesLookup';
import { FilterExtendedSearch } from '../../../../ui-kit/shared_components/FilterExtendedSearch';
import { EActResourceType } from '../../../../api/types';

export const ApartmentActsList: FC<ApartmentActsListProps> = ({
  acts,
  isLoading,
  handleOpeningCreateActModal,
  handleOpeningDeleteActModal,
  handleOpeningEditActModal,
  handleSaveFile,
  handleUpdateTypes,
  handleUpdateResources,
  actTypes,
  selectedFilters,
}) => {
  const isShowActsList = Boolean(acts?.length && !isLoading);

  const actsList = useMemo(
    () =>
      Boolean(acts.length) &&
      acts?.map((act) => (
        <ApartmentActItem
          act={act}
          actTypes={actTypes}
          openDeleteActModal={handleOpeningDeleteActModal}
          openEditActModal={handleOpeningEditActModal}
          saveFile={handleSaveFile}
          key={act.id}
        />
      )),
    [acts, actTypes]
  );

  const resources = Object.entries(
    actResourceNamesLookup
  ).map(([key, value]) => ({ key: key as EActResourceType, value }));

  return (
    <>
      <Wrapper>
        {!isLoading && (
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
                  selectedFilters={selectedFilters.resources}
                />
              </ExtendedSearchWrapper>
            </ColumnTitle>
            <ColumnTitle>
              Тип
              <ExtendedSearchWrapper>
                <FilterExtendedSearch
                  allowedFilters={actTypes}
                  handleUpdate={handleUpdateTypes}
                  selectedFilters={selectedFilters.actTypes}
                />
              </ExtendedSearchWrapper>
            </ColumnTitle>
          </ListHeader>
        )}

        {isShowActsList && actsList}

        {isLoading && <PendingLoader loading={isLoading} />}
        {!acts.length && !isLoading && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет актов" />
        )}

        {!isLoading && (
          <AddButton
            className="ant-btn-link"
            onClick={handleOpeningCreateActModal}
          >
            + Добавить акт
          </AddButton>
        )}
      </Wrapper>
    </>
  );
};
