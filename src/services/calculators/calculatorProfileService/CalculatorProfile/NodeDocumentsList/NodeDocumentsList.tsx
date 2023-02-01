import { Empty } from 'antd';
import React, { FC } from 'react';
import { NodeDocumentsItem } from './NodeDocumentsItem';
import { ListHeader } from './NodeDocumentsList.styled';
import { NodeDocumentsListProps } from './NodeDocumentsList.types';

export const NodeDocumentsList: FC<NodeDocumentsListProps> = ({
  documents,
}) => {
  const isDocsExist = documents.length !== 0;

  const list = documents.map((document) => (
    <NodeDocumentsItem document={document} />
  ));

  return (
    <>
      {!isDocsExist && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Нет докуменов"
        />
      )}
      {isDocsExist && (
        <>
          <ListHeader>
            <div>Дата</div>
            <div>Название документа</div>
          </ListHeader>
          {list}
        </>
      )}
    </>
  );
};
