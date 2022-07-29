import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TabsItemInterface } from '../../tt-components/interfaces';
import { useStore } from 'effector-react';
import { Content } from './NodeProfile';
import { nodeService } from '../../features/nodes/displayNode/models';

export const NodeProfile = () => {
  const { nodeId } = useParams<{ nodeId: string }>();
  const { push } = useHistory();
  const path = `/nodes/${nodeId}`;
  const { outputs } = nodeService;
  const node = useStore(outputs.$node);
  const loading = useStore(outputs.$loading);
  const isReadings = useStore(outputs.$readings);

  const readings: TabsItemInterface = {
    title: 'Ввод показаний',
    key: 'readings',
    cb: () => {
      push(`${path}/readings`);
    },
  };

  const tabItems: Array<TabsItemInterface> = useMemo(
    () => [
      {
        title: 'Общая информация',
        key: '',
        cb: () => {
          push(`${path}`);
        },
      },
      {
        title: 'Статистика',
        key: 'stats',
        cb: () => {
          push(`${path}/stats`);
        },
      },
      ...(isReadings ? [readings] : []),
      {
        title: 'Настройки соединения',
        key: 'connection',
        cb: () => {
          push(`${path}/connection`);
        },
      },
      {
        title: 'Подключенные приборы',
        key: 'related',
        cb: () => {
          push(`${path}/related`);
        },
      },
      {
        title: 'Документы',
        key: 'documents',
        cb: () => {
          push(`${path}/documents`);
        },
      },
      {
        title: 'История проверок',
        key: 'checks',
        cb: () => {
          push(`${path}/checks`);
        },
      },
    ],
    [path]
  );

  const { NodeGate } = nodeService.gates;

  return (
    <>
      <NodeGate id={Number(nodeId)} />
      <Content
        tabItems={tabItems}
        node={node}
        loading={loading}
        nodeId={nodeId}
        path={path}
      />
    </>
  );
};
