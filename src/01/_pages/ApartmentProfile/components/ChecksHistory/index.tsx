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
import { DocumentResponse, EDocumentType } from 'myApi';
import moment from 'moment';
import { ReactComponent as DocumentIcon } from './documentIcon.svg';
import { ReactComponent as DownloadIcon } from './downloadIcon.svg';

export const ChecksHistory = () => {
  const params = useParams();
  const apartmentId = (params as any)[1];

  const documents: DocumentResponse[] = [
    {
      id: 0,
      name: 'string',
      uploadingTime: '2021-10-31T18:42:16.055Z',
      url: 'string',
      author: 'string',
      canBeEdited: true,
      type: EDocumentType.AdditionalMaterials,
    },
    {
      id: 0,
      name: 'string',
      uploadingTime: '2021-10-31T18:42:16.055Z',
      url: 'string',
      author: 'string',
      canBeEdited: true,
      type: EDocumentType.Common,
    },
  ]; //useStore($apartmentChecksDocuments);
  const pending = useStore(fetchApartmentChecksDocumentsFx.pending);

  const renderDocument = (document: DocumentResponse) => {
    return (
      <ListItem temp="1fr 1fr 2fr">
        <b style={{ color: 'rgba(39, 47, 90, 1)' }}>
          {moment(document?.uploadingTime).format('DD.MM.YYYY')}
        </b>
        <div>{translateDocumentType(document.type)}</div>
        <Flex style={{ justifyContent: 'space-between' }}>
          <Flex>
            <DocumentIcon />
            <Space w={7} />
            {document.name}
          </Flex>
          <DownloadIcon />
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
    [EDocumentType.ApartmentAccessDeniedAct]: 'Акт об отказе в доступе к квартире',
    [EDocumentType.ApartmentCheckingAct]: 'Дополнительные материалы',
    [EDocumentType.ApartmentStoppingStatement]: 'Дополнительные материалы',
    [EDocumentType.ApartmentUnauthorizedInterferenceAct]: 'Дополнительные материалы',
    [EDocumentType.Common]: 'Дополнительные материалы',
    [EDocumentType.DeviceAcceptanceAct]: 'Дополнительные материалы',
    [EDocumentType.DeviceCheckAct]: 'Дополнительные материалы',
    [EDocumentType.DeviceClosingAct]: 'Дополнительные материалы',
    [EDocumentType.DeviceCommercialAccountingAct]: 'Дополнительные материалы',
    [EDocumentType.DeviceCommissionCheckAct]: 'Дополнительные материалы',
    [EDocumentType.DeviceDeploymentAct]: 'Дополнительные материалы',
    [EDocumentType.DevicePassport]: 'Дополнительные материалы',
    [EDocumentType.DeviceTestCertificates]: 'Дополнительные материалы',
    [EDocumentType.HeatingSeasonChangingStatement]: 'Дополнительные материалы',
    [EDocumentType.HeatingSeasonEndingOrder]: 'Дополнительные материалы',
    [EDocumentType.HeatingSeasonStartingOrder]: 'Дополнительные материалы',
    [EDocumentType.ImportedFile]: 'Дополнительные материалы',
    [EDocumentType.NodeAdmissionAct]: 'Дополнительные материалы',
    [EDocumentType.Photo]: 'Дополнительные материалы',
    [EDocumentType.ProfilePhoto]: 'Дополнительные материалы',
  };

  return (types as any)[type] || type;
}

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
