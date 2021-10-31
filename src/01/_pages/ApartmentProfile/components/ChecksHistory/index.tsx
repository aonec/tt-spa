import {
  $apartmentChecksDocuments,
  ApartmentChecksDocuments,
  fetchApartmentChecksDocumentsFx,
} from '01/features/apartments/displayApartmentChecksHistory/models';
import { Grid } from '01/shared/ui/Layout/Grid';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import { DocumentResponse } from 'myApi';
import moment from 'moment';

export const ChecksHistory = () => {
  const params = useParams();
  const apartmentId = (params as any)[1];

  const documents = useStore($apartmentChecksDocuments);
  const pending = useStore(fetchApartmentChecksDocumentsFx.pending);

  const renderDocument = (document: DocumentResponse) => {
    return (
      <ListItem temp="1fr 1fr 2fr">
        <div>{moment(document?.uploadingTime).format('DD.MM.YYYY')}</div>
        <div>{document.type}</div>
        <div>{document.name}</div>
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

const Wrap = styled.div`
  width: 662px;
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
