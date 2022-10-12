import { Empty, Skeleton } from 'antd';
import React, { FC, useMemo } from 'react';
import {
  ColumnTitle,
  ListHeader,
  Wrapper,
} from './ApartmentDocumentsList.styled';
import { ApartmentDocumentsListProps } from './ApartmentDocumentsList.types';
import { ApartmentDocumentsListItem } from './ApartmentDocumentsListItem';

export const ApartmentDocumentsList: FC<ApartmentDocumentsListProps> = ({
  documentsList,
  isLoading,
  handleSaveFile,
}) => {
  const list = useMemo(
    () =>
      documentsList.map((document) => (
        <ApartmentDocumentsListItem
          document={document}
          key={document.id}
          handleSaveFile={handleSaveFile}
        />
      )),
    [documentsList]
  );

  const isDocumentsListEmpty = documentsList.length === 0;

  return (
    <Wrapper>
      {!isLoading && (
        <>
          <ListHeader>
            <ColumnTitle>Дата</ColumnTitle>
            <ColumnTitle>№ док</ColumnTitle>
            <ColumnTitle>Название документа</ColumnTitle>
          </ListHeader>
          {list}
          {isDocumentsListEmpty && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Нет документов"
            />
          )}
        </>
      )}
      {isLoading && <Skeleton active />}
    </Wrapper>
  );
};
