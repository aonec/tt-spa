import { PendingLoader } from '01/shared/ui/PendingLoader';
import { Empty } from 'antd';
import React, { FC, useMemo } from 'react';
import { CreateApartmentActContainer } from 'services/apartments/createApartmentActService';
import { DeleteApartmentActContainer } from 'services/apartments/deleteApartmentActService';
import { EditApartmentActContainer } from 'services/apartments/editApartmentActService';
import { ApartmentActItem } from './ApartmentActItem';
import { AddButton, ListHeader, Wrapper } from './ApartmentActsList.styled';
import { ApartmentActsListProps } from './ApartmentActsList.types';

export const ApartmentActsList: FC<ApartmentActsListProps> = ({
  acts,
  isLoading,
  handleOpeningCreateActModal,
  handleOpeningDeleteActModal,
  handleOpeningEditActModal,
  actTypes
}) => {
  const isShowactsList = acts && acts.length && !isLoading;

  const actsList = useMemo(
    () =>
      acts &&
      acts.map((act) => (
        <ApartmentActItem
          act={act}
          actTypes= {actTypes}
          openDeleteActModal={handleOpeningDeleteActModal}
          openEditActModal={handleOpeningEditActModal}
        />
      )),
    [acts, actTypes]
  );

  return (
    <>
      <CreateApartmentActContainer />
      <EditApartmentActContainer/>
      <DeleteApartmentActContainer />
      {isLoading && <PendingLoader loading={isLoading} />}
      {acts && !acts.length && !isLoading && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет актов" />
      )}
      {isShowactsList && (
        <Wrapper>
          <ListHeader>
            <div>Дата</div>
            <div>№ акта</div>
            <div>Название документа</div>
            <div>Ресурс</div>
            <div>Тип</div>
          </ListHeader>
          {actsList}
          <AddButton
            className="ant-btn-link"
            onClick={handleOpeningCreateActModal}
          >
            + Добавить акт
          </AddButton>
        </Wrapper>
      )}
    </>
  );
};
