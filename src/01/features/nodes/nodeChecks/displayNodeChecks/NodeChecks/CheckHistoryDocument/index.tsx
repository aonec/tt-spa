import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import confirm from 'antd/lib/modal/confirm';
import moment from 'time';
import React from 'react';
import { Pen, Trash } from 'react-bootstrap-icons';
import { checkHistoryTemp, ListItem } from '../NodeChecks';
import { getCheckingActDocument, getOnSaveFile } from '../utils';
import { ReactComponent as DocumentIcon } from '../assets/documentIcon.svg';
import { ReactComponent as DownloadIcon } from '../assets/downloadIcon.svg';
import { NodeCheckResponse } from 'myApi';
import styled from 'styled-components';

interface Props {
  document: NodeCheckResponse;
  removeCheck(id: number): void;
  openEditCheckModal(payload: any): void;
}

export const CheckHistoryDocument = ({
  document: {
    checkingDate,
    checkingAct: document,
    checkType,
    registryNumber,
    id,
  },
  openEditCheckModal,
  removeCheck,
}: Props) => {
  const onSaveFile = getOnSaveFile(document!);
  return (
    <ListItem temp={checkHistoryTemp}>
      <b style={{ color: 'rgba(39, 47, 90, 1)' }}>
        {moment(checkingDate).format('DD.MM.YYYY')}
      </b>
      <div>{getCheckingActDocument(checkType)}</div>
      <div>{registryNumber || '—'}</div>
      <Flex style={{ justifyContent: 'space-between' }}>
        <Flex>
          <div style={{ minWidth: 18 }}>
            <DocumentIcon />
          </div>
          <Space w={7} />
          <DocumentName>
            {document?.name || (
              <span style={{ color: '#b3b3b3' }}>Нет документа</span>
            )}
          </DocumentName>
        </Flex>
        <Flex>
          <Pen
            style={{ fontSize: 16, cursor: 'pointer' }}
            onClick={() =>
              openEditCheckModal({
                checkingDate,
                checkingAct: document,
                checkType,
                registryNumber,
                id,
              } as any)
            }
          />
          <Space />
          <Trash
            style={{ cursor: 'pointer', fontSize: 16 }}
            onClick={() =>
              confirm({
                title: 'Вы уверены, что хотите удалить проверку?',
                okText: 'Да',
                cancelText: 'Нет',
                onOk: () => void removeCheck(id),
              })
            }
          />
          <Space />
          <DownloadIcon style={{ cursor: 'pointer' }} onClick={onSaveFile} />
        </Flex>
      </Flex>
    </ListItem>
  );
};

const DocumentName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 265px;
`;
