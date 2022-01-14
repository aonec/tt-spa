import {
  $apartmentChecksDocuments,
  ApartmentChecksDocuments,
  fetchApartmentChecksDocumentsFx,
} from '01/features/apartments/displayApartmentChecksHistory/models';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import { ApartmentCheckResponse, ECheckType, DocumentResponse } from 'myApi';
import moment from 'moment';
import { ReactComponent as DocumentIcon } from './documentIcon.svg';
import { ReactComponent as DownloadIcon } from './downloadIcon.svg';
import { saveAs } from 'file-saver';
import { message } from 'antd';
import axios from '01/axios';
import {
  openCheckApartmentModal,
  removeApartmentCheckEv,
} from '01/features/apartments/checkApartment/models';
import { $apartmentEditMode } from '01/features/apartments/displayApartment/models';
import { Pen, Trash } from 'react-bootstrap-icons';
import confirm from 'antd/lib/modal/confirm';

export const ChecksHistory = () => {
  const params = useParams();
  const apartmentId = (params as any)[1];

  const documents = useStore($apartmentChecksDocuments);
  const pending = useStore(fetchApartmentChecksDocumentsFx.pending);

  const isEditMode = useStore($apartmentEditMode);

  const renderDocument = ({
    checkingDate,
    checkingAct: document,
    checkType,
    registryNumber,
    id,
  }: ApartmentCheckResponse) => {
    const onSaveFile = getOnSaveFile(document!);
    return (
      <ListItem temp="1fr 1fr 1fr 2.5fr">
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
          <Flex style={{ minWidth: 18, fontSize: 16 }}>
            {isEditMode ? (
              <>
                <Pen style={{ cursor: 'pointer' }} />
                <Space />
                <Trash
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    confirm({
                      title: 'Вы уверены, что хотите удалить проверку?',
                      okText: 'Да',
                      cancelText: 'Нет',
                      onOk: () => void removeApartmentCheckEv(id),
                    })
                  }
                />
              </>
            ) : (
              document?.id && (
                <DownloadIcon
                  style={{ cursor: 'pointer' }}
                  onClick={onSaveFile}
                />
              )
            )}
          </Flex>
        </Flex>
      </ListItem>
    );
  };

  return (
    <Wrap>
      <ApartmentChecksDocuments apartmentId={apartmentId} />
      <PendingLoader loading={pending}>
        <Header temp="1fr 1fr 1fr 2.5fr">
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

const CreateButton = styled.div`
  cursor: pointer;
`;

function getCheckingActDocument(type: ECheckType) {
  return type === ECheckType.Planned ? 'Плановая' : 'Внеплановая';
}

export const getOnSaveFile = (document: DocumentResponse) =>
  async function onSaveFile() {
    try {
      const url: string = await axios.get(`Documents/${document.id}`);
      saveAs(url, document.name!);
    } catch (error) {
      message.error('Не удалось скачать файл');
    }
  };

const Wrap = styled.div`
  width: 920px;
`;

const Header = styled(Grid)`
  background: rgba(39, 47, 90, 0.04);
  padding: 15px 25px;
  border-bottom: 1px solid lightgray;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

const ListItem = styled(Grid)`
  padding: 15px 25px;
  border-bottom: 1px solid lightgray;
`;
