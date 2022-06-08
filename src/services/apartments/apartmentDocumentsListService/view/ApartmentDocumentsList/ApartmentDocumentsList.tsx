import { PendingLoader } from '01/shared/ui/PendingLoader';
import { Empty } from 'antd';
import React, { FC, useMemo } from 'react';
import { ApartmentDocumentItem } from './ApartmentDocumentItem';
import { ListHeader, Wrapper } from './ApartmentDocumentsList.styled';
import { ApartmentDocumentsListProps } from './ApartmentDocumentsList.types';

export const ApartmentDocumentsList: FC<ApartmentDocumentsListProps> = ({
  documents,
  isDocumentsEmpty,
  isLoading,
}) => {
  const isShowDocumentsList = !isDocumentsEmpty && !isLoading;

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
      {isDocumentsEmpty && !isLoading && (
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
            <div>Ресурс</div>
            <div>Тип</div>
          </ListHeader>
          {documentsList}
        </Wrapper>
      )}
    </>
  );
};
