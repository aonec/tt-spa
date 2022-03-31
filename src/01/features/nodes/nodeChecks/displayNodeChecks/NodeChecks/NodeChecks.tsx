import React from 'react';
import { FC } from 'react';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import { CheckHistoryDocument } from './CheckHistoryDocument';
import styled from 'styled-components';
import { Grid } from '01/shared/ui/Layout/Grid';
import { EditApartmentCheckPayload } from '01/features/apartments/checkApartment/models';
import { NodeCheckResponse } from 'myApi';

interface Props {
  documents: NodeCheckResponse[] | null;
  pending: boolean;
  openCheckApartmentModal(payload: void): void;
  removeApartmentCheck(id: number): void;
  openEditApartmentCheckModal(payload: EditApartmentCheckPayload): void;
}

export const checkHistoryTemp = '0.7fr 0.6fr 0.5fr 2.5fr';

export const NodeChecks: FC<Props> = (props) => {
  const {
    documents,
    pending,
    openCheckApartmentModal,
    removeApartmentCheck,
    openEditApartmentCheckModal,
  } = props;

  return (
    <Wrap>
      <PendingLoader loading={pending}>
        <Header temp={checkHistoryTemp}>
          <div>Дата</div>
          <div>Тип</div>
          <div>№ акта</div>
          <div>Заключение</div>
        </Header>
        {documents?.map((document) => (
          <CheckHistoryDocument
            document={document}
            removeApartmentCheck={removeApartmentCheck}
            openEditApartmentCheckModal={openEditApartmentCheckModal}
          />
        ))}
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

export const Wrap = styled.div`
  width: 920px;
`;

export const Header = styled(Grid)`
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

export const ListItem = styled(Grid)`
  padding: 15px 25px;
  border-bottom: 1px solid lightgray;
`;

export const CreateButton = styled.div`
  cursor: pointer;
`;
