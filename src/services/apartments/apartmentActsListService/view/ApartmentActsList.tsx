import { PendingLoader } from '01/shared/ui/PendingLoader';
import { Empty } from 'antd';
import React, { FC, useMemo } from 'react';
import { ActTypeExtendedSearch } from './ActTypeExtendedSearch';
import { ApartmentActItem } from './ApartmentActItem';
import {
  AddButton,
  ColumnTitle,
  ExtendedSearchWrapper,
  ListHeader,
  Wrapper,
} from './ApartmentActsList.styled';
import { ApartmentActsListProps } from './ApartmentActsList.types';
import { ResourceExtendedSearch } from './ResourceExtendedSearch';

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
              <ResourceExtendedSearch
                handleUpdateResources={handleUpdateResources}
              />
                </ExtendedSearchWrapper>
            </ColumnTitle>
            <ColumnTitle>
              Тип
              <ExtendedSearchWrapper>
                <ActTypeExtendedSearch
                  actTypes={actTypes}
                  handleUpdateTypes={handleUpdateTypes}
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
