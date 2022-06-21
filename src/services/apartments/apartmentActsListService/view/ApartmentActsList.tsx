import { PendingLoader } from '01/shared/ui/PendingLoader';
import { Empty } from 'antd';
import React, { FC, useMemo } from 'react';
import { ApartmentActItem } from './ApartmentActItem';
import { AddButton, ListHeader, Wrapper } from './ApartmentActsList.styled';
import { ApartmentActsListProps } from './ApartmentActsList.types';

export const ApartmentActsList: FC<ApartmentActsListProps> = ({
  acts,
  isLoading,
  handleOpeningCreateActModal,
  handleOpeningDeleteActModal,
  handleOpeningEditActModal,
  handleSaveFile,
  actTypes,
}) => {
  const isShowActsList = Boolean(acts?.length && !isLoading);

  const actsList = useMemo(
    () =>
      Boolean(acts?.length) &&
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
      {isLoading && <PendingLoader loading={isLoading} />}
      {!acts?.length && !isLoading && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет актов" />
      )}

      <Wrapper>
        {isShowActsList && (
          <>
            <ListHeader>
              <div>Дата</div>
              <div>№ акта</div>
              <div>Название документа</div>
              <div>Ресурс</div>
              <div>Тип</div>
            </ListHeader>
            {actsList}
          </>
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
