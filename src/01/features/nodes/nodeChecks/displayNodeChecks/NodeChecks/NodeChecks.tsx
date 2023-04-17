import React from 'react';
import { FC } from 'react';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { CheckHistoryDocument } from './CheckHistoryDocument';
import styled from 'styled-components';
import { Grid } from '01/shared/ui/Layout/Grid';
import { NodeCheckResponse } from 'myApi';
import { EditNodeCheckPayload } from '../../checkNode/models';
import { useParams } from 'react-router-dom';
import { nodeService } from '01/features/nodes/displayNode/models';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';

interface Props {
  documents: NodeCheckResponse[] | null;
  pending: boolean;
  openCheckNodeModal(payload: void): void;
  removeNodeCheck(id: number): void;
  openEditNodeCheckModal(payload: EditNodeCheckPayload): void;
}

export const checkHistoryTemp = '0.7fr 0.6fr 0.5fr 2.5fr';

const { gates } = nodeService;
const { NodeGate } = gates;

export const NodeChecks: FC<Props> = (props) => {
  const {
    documents,
    pending,
    openCheckNodeModal,
    removeNodeCheck,
    openEditNodeCheckModal,
  } = props;

  const { nodeId } = useParams<{ nodeId: string | undefined }>();

  return (
    <>
      <NodeGate id={Number(nodeId)} />
      <Wrap>
        <WithLoader isLoading={pending}>
          <Header temp={checkHistoryTemp}>
            <div>Дата</div>
            <div>Тип</div>
            <div>№ акта</div>
            <div>Заключение</div>
          </Header>
          {documents?.map((document) => (
            <CheckHistoryDocument
              key={document.id}
              document={document}
              removeCheck={removeNodeCheck}
              openEditCheckModal={openEditNodeCheckModal}
            />
          ))}
        </WithLoader>
        <Space />
        <CreateButton
          className="ant-btn-link"
          onClick={() => openCheckNodeModal()}
        >
          + Создать проверку
        </CreateButton>
      </Wrap>
    </>
  );
};

export const Wrap = styled.div`
  width: 720px;
`;

export const Header = styled(Grid)`
  background: rgba(39, 47, 90, 0.04);
  padding: 16px 24px;
  border-bottom: 1px solid lightgray;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

export const ListItem = styled(Grid)`
  padding: 16px 24px;
  border-bottom: 1px solid lightgray;
`;

export const CreateButton = styled.div`
  cursor: pointer;
`;
