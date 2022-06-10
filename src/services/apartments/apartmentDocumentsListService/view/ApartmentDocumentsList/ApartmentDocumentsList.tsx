import { PendingLoader } from '01/shared/ui/PendingLoader';
import { Empty } from 'antd';
import React, { FC, useMemo } from 'react';
import { ApartmentDocumentItem } from './ApartmentDocumentItem';
import {
  AddButton,
  ListHeader,
  Wrapper,
} from './ApartmentDocumentsList.styled';
import { ApartmentDocumentsListProps } from './ApartmentDocumentsList.types';

export const ApartmentDocumentsList: FC<ApartmentDocumentsListProps> = ({
  documents,
  isLoading,
}) => {
  const isShowDocumentsList = documents.length && !isLoading;

  const documentsList = useMemo(
    () =>
      documents.map((document) => (
        <ApartmentDocumentItem document={document} />
      )),
    [documents]
  );

  return (
    <>
      {isLoading && <PendingLoader loading={isLoading} />}
      {documents && !documents.length && !isLoading && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Нет документов"
        />
      )}
      {isShowDocumentsList && (
        <Wrapper>
          <ListHeader>
            <div>Дата</div>
            <div>№ док</div>
            <div>Название документа</div>
            <div>Тип</div>
          </ListHeader>
          {documentsList}
          <AddButton className="ant-btn-link">+ Добавить документ</AddButton>
        </Wrapper>
      )}
    </>
  );
};
