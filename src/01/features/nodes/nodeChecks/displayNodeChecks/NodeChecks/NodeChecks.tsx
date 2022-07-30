import React from 'react';
import { FC } from 'react';
import { CheckHistoryDocument } from './CheckHistoryDocument';
import styled from 'styled-components';
import { EditNodeCheckPayload } from '../../checkNode/models';
import { Grid } from '../../../../../shared/ui/Layout/Grid';
import { Space } from '../../../../../shared/ui/Layout/Space/Space';
import { PendingLoader } from '../../../../../shared/ui/PendingLoader';
import { NodeCheckResponse } from '../../../../../../api/types';

interface Props {
  documents: NodeCheckResponse[] | null;
  pending: boolean;
  openCheckNodeModal(payload: void): void;
  removeNodeCheck(id: number): void;
  openEditNodeCheckModal(payload: EditNodeCheckPayload): void;
}

export const checkHistoryTemp = '0.7fr 0.6fr 0.5fr 2.5fr';

export const NodeChecks: FC<Props> = (props) => {
  const {
    documents,
    pending,
    openCheckNodeModal,
    removeNodeCheck,
    openEditNodeCheckModal,
  } = props;

  return (
    <Wrap>
      <PendingLoader  loading={pending}>
        <Header temp={checkHistoryTemp}>
          <div>Дата</div>
          <div>Тип</div>
          <div>№ акта</div>
          <div>Заключение</div>
        </Header>
        {documents?.map((document) => (
          <CheckHistoryDocument
            document={document}
            removeCheck={removeNodeCheck}
            openEditCheckModal={openEditNodeCheckModal as any}
          />
        ))}
      </PendingLoader>
      <Space />
      <CreateButton
        className="ant-btn-link"
        onClick={() => openCheckNodeModal()}
      >
        + Создать проверку
      </CreateButton>
    </Wrap>
  );
};

export const Wrap = styled.div`
  width: 720px;
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
