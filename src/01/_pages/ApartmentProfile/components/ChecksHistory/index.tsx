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
import {
  ApartmentCheckResponse,
  EDocumentType,
  ECheckType,
  DocumentResponse,
} from 'myApi';
import moment from 'moment';
import { ReactComponent as DocumentIcon } from './documentIcon.svg';
import { ReactComponent as DownloadIcon } from './downloadIcon.svg';
import { saveAs } from 'file-saver';
import { message } from 'antd';
import axios from '01/axios';

export const ChecksHistory = () => {
  const params = useParams();
  const apartmentId = (params as any)[1];

  const documents = useStore($apartmentChecksDocuments);
  const pending = useStore(fetchApartmentChecksDocumentsFx.pending);

  const renderDocument = ({
    checkingDate,
    checkingAct: document,
    checkType,
  }: ApartmentCheckResponse) => {
    const onSaveFile = getOnSaveFile(document!);
    return (
      <ListItem temp="1fr 1fr 2fr">
        <b style={{ color: 'rgba(39, 47, 90, 1)' }}>
          {moment(checkingDate).format('DD.MM.YYYY')}
        </b>
        <div>{getCheckingActDocument(checkType)}</div>
        <Flex style={{ justifyContent: 'space-between' }}>
          <Flex>
            <div style={{ minWidth: 18 }}>
              <DocumentIcon />
            </div>
            <Space w={7} />
            {document?.name || (
              <span style={{ color: '#b3b3b3' }}>Нет документа</span>
            )}
          </Flex>
          <div style={{ minWidth: 18 }}>
            {document?.id && (
              <DownloadIcon
                style={{ cursor: 'pointer' }}
                onClick={onSaveFile}
              />
            )}
          </div>
        </Flex>
      </ListItem>
    );
  };

  return (
    <Wrap>
      <ApartmentChecksDocuments apartmentId={apartmentId} />
      <PendingLoader loading={pending}>
        <Header temp="1fr 1fr 2fr">
          <div>Дата</div>
          <div>Тип</div>
          <div>Заключение</div>
        </Header>
        {documents?.map(renderDocument)}
      </PendingLoader>
    </Wrap>
  );
};

export function translateDocumentType(type: EDocumentType) {
  const types = {
    [EDocumentType.AdditionalMaterials]: 'Дополнительные материалы',
    [EDocumentType.ApartmentAccessDeniedAct]: null,
    [EDocumentType.ApartmentCheckingAct]: 'Акт плановой проверки',
    [EDocumentType.ApartmentStoppingStatement]: 'Заявление о непроживании',
    [EDocumentType.ApartmentUnauthorizedInterferenceAct]: null,
    [EDocumentType.Common]: null,
    [EDocumentType.DeviceAcceptanceAct]: 'Акт-допуск',
    [EDocumentType.DeviceCheckAct]: 'Акт поверки прибора',
    [EDocumentType.DeviceClosingAct]: 'Акт закрытия прибора',
    [EDocumentType.DeviceCommercialAccountingAct]: null,
    [EDocumentType.DeviceCommissionCheckAct]: 'Акт комиссионной проверки',
    [EDocumentType.DeviceDeploymentAct]: 'Акт установки прибора',
    [EDocumentType.DevicePassport]: 'Паспорт прибора',
    [EDocumentType.DeviceTestCertificates]: 'Сертификат о поверке',
    [EDocumentType.HeatingSeasonChangingStatement]: null,
    [EDocumentType.HeatingSeasonEndingOrder]: null,
    [EDocumentType.HeatingSeasonStartingOrder]: null,
    [EDocumentType.ImportedFile]: null,
    [EDocumentType.NodeAdmissionAct]: null,
    [EDocumentType.Photo]: 'фото',
    [EDocumentType.ProfilePhoto]: 'Фото профиля',
  };

  return (types as any)[type] || 'Документ';
}

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
  width: 720px;
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
