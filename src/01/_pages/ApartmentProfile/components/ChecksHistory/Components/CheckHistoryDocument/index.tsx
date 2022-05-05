import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import confirm from 'antd/lib/modal/confirm';
import moment from 'moment';
import React from 'react';
import { Pen, Trash } from 'react-bootstrap-icons';
import { checkHistoryTemp } from '../../CheckHistory.component';
import { ListItem } from '../../CheckHistory.styled';
import { CheckHistoryDocumentProps } from '../../CheckHistory.types';
import { getCheckingActDocument, getOnSaveFile } from '../../utils';
import { ReactComponent as DocumentIcon } from '../../assets/documentIcon.svg';
import { ReactComponent as DownloadIcon } from '../../assets/downloadIcon.svg';
import { IconTT } from '01/shared/ui/IconTT';
import { ResourceInfo } from './components/ResourceInfo';

export const CheckHistoryDocument = ({
  document: {
    checkingDate,
    checkingAct: document,
    checkType,
    registryNumber,
    id,
    actResourceType,
  },
  openEditApartmentCheckModal,
  removeApartmentCheck,
}: CheckHistoryDocumentProps) => {
  const onSaveFile = getOnSaveFile(document!);
  return (
    <ListItem temp={checkHistoryTemp}>
      <b style={{ color: 'rgba(39, 47, 90, 1)' }}>
        {moment(checkingDate).format('DD.MM.YYYY')}
      </b>
      <div>{getCheckingActDocument(checkType)}</div>
      <div>{registryNumber || '—'}</div>
      <div>
        <ResourceInfo resource={actResourceType} />
      </div>
      <Flex style={{ justifyContent: 'space-between' }}>
        <Flex>
          <div style={{ minWidth: 18 }}>
            <DocumentIcon />
          </div>
          <Space w={7} />
          <div>
            {document?.name || (
              <span style={{ color: '#b3b3b3' }}>Нет документа</span>
            )}
          </div>
        </Flex>
        <Flex>
          <Pen
            style={{ fontSize: 16, cursor: 'pointer' }}
            onClick={() =>
              openEditApartmentCheckModal({
                checkingDate,
                checkingAct: document,
                checkType,
                registryNumber: registryNumber!,
                actResourceType, 
                id,
              })
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
                onOk: () => void removeApartmentCheck(id),
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
