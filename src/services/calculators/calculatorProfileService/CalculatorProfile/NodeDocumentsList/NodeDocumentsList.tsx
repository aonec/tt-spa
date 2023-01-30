import { Empty } from 'antd';
import React, { FC } from 'react';
import { DocumentsList } from 'ui-kit/DocumentsService/view/DocumentsList';
import { ListHeader } from './NodeDocumentsList.styled';
import { NodeDocumentsListProps } from './NodeDocumentsList.types';

export const NodeDocumentsList: FC<NodeDocumentsListProps> = ({
  documents,
}) => {
  const isDocsExist = documents.length !== 0;

  return (
    <>
    <ListHeader>
      <div>Название документа</div>
      <div>Дата</div>

    </ListHeader>
      {!isDocsExist && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Нет докуменов"
        />
      )}
      {isDocsExist && <DocumentsList documents={documents} isLoading={false} />}
    </>
  );
};
