import React from 'react';
import { ApartmentCheckResponse } from 'myApi';
import { FC } from 'react';
import { ListItem, Header, Wrap, CreateButton } from './CheckHistory.styled';
import { CheckHistoryComponentProps } from './CheckHistory.types';
import { getCheckingActDocument, getOnSaveFile } from './utils';
import moment from 'moment';
import { ReactComponent as DocumentIcon } from './assets/documentIcon.svg';
import { ReactComponent as DownloadIcon } from './assets/downloadIcon.svg';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Pen, Trash } from 'react-bootstrap-icons';
import confirm from 'antd/lib/modal/confirm';
import { ApartmentChecksDocuments } from '01/features/apartments/displayApartmentChecksHistory/models';
import { PendingLoader } from '01/shared/ui/PendingLoader';

const temp = '0.7fr 0.6fr 0.5fr 2.5fr';

export const ChecksHistoryComponent: FC<CheckHistoryComponentProps> = (
  props
) => {
  const {
    apartmentId,
    documents,
    pending,
    openCheckApartmentModal,
    removeApartmentCheck,
    openEditApartmentCheckModal,
  } = props;

  const renderDocument = ({
    checkingDate,
    checkingAct: document,
    checkType,
    registryNumber,
    id,
  }: ApartmentCheckResponse) => {
    const onSaveFile = getOnSaveFile(document!);
    return (
      <ListItem temp={temp}>
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

  return (
    <Wrap>
      <ApartmentChecksDocuments apartmentId={apartmentId} />
      <PendingLoader loading={pending}>
        <Header temp={temp}>
          <div>Дата</div>
          <div>Тип</div>
          <div>№ акта</div>
          <div>Заключение</div>
        </Header>
        {documents?.map(renderDocument)}
      </PendingLoader>
      <Space />
      <CreateButton
        className="ant-btn-link"
        onClick={() => openCheckApartmentModal()}
      >
        + Создать проверку
      </CreateButton>
    </Wrap>
  );
};
