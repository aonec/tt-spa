import { PendingLoader } from '01/shared/ui/PendingLoader';
import { Empty } from 'antd';
import React, { FC, useMemo } from 'react';
import { CreateApartmentActContainer } from 'services/apartments/createApartmentActService';
import { ApartmentActItem } from './ApartmentActItem';
import {
  AddButton,
  ListHeader,
  Wrapper,
} from './ApartmentActsList.styled';
import { ApartmentActsListProps } from './ApartmentActsList.types';

export const ApartmentActsList: FC<ApartmentActsListProps> = ({
  documents,
  isDocumentsEmpty,
  isLoading,
  handleOpeningCreateDocumentModal,
}) => {
  const isShowDocumentsList = !isDocumentsEmpty && !isLoading;

  const documentsList = useMemo(
    () =>
      documents.map((document) => (
        <ApartmentActItem document={document} />
      )),
    [documents]
  );

  return (
    <>
      <CreateApartmentActContainer/>
      {isLoading && <PendingLoader loading={isLoading} />}
      {isDocumentsEmpty && !isLoading && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Нет актов"
        />
      )}
      {isShowDocumentsList && (
        <Wrapper>
          <ListHeader>
            <div>Дата</div>
            <div>№ акта</div>
            <div>Название документа</div>
            <div>Ресурс</div>
            <div>Тип</div>
          </ListHeader>
          {documentsList}
          <AddButton
            className="ant-btn-link"
            onClick={handleOpeningCreateDocumentModal}
          >
            + Добавить документ
          </AddButton>
        </Wrapper>
      )}
    </>
  );
};
