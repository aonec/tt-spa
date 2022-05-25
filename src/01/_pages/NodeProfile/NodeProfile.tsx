import React, { useEffect, useMemo, useState } from 'react';
import {  useHistory, useParams } from 'react-router-dom';
import { TaskListResponse } from '../../../myApi';
import { TabsItemInterface } from '../../tt-components/interfaces';
import { nodeService } from '01/features/nodes/displayNode/models';
import { useStore } from 'effector-react';
import { Content } from './NodeProfile.content';

export const NodeProfile = () => {
  const { nodeId } = useParams<{ nodeId: string }>();
  const { push } = useHistory();
  const path = `/nodes/${nodeId}`;
  const [addDevice, setAddDevice] = useState(false);
  const [tasks, setTasks] = useState<TaskListResponse[] | null>();
  const { outputs, inputs } = nodeService;
  const node = useStore(outputs.$node);
  const loading = useStore(outputs.$loading);
  const isReadings = useStore(outputs.$readings)

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
        setAddDevice={setAddDevice}
        nodeId={nodeId}
        path={path}
      />
    </>
  );
};
export default NodeProfile;
