import React from 'react';
import styled from 'reshadow/macro';
import * as s from '01/r_comp';
import styledC from 'styled-components';
import { Link } from 'react-router-dom';
import { CorrectionReadingsPanel } from '01/features/tasks/correctionReadings';
import { useStore } from 'effector-react';
import { $task } from '01/features/tasks/displayTask/models';
import { TasksProfileContext } from './context';
import { usePageFetch } from './hooks/usePageFetch';
import { usePanel } from './hooks/usePanel';
import { useStages } from './hooks/useStages';
import { useDocuments } from './hooks/useDocuments';
import { useInformation } from './hooks/useInformation';
import { useInformationDevice } from './hooks/useInformationDevice';

import { Header } from './components/Header';
import { Panel } from './components/Panel';
import { Steps } from './components/Steps';
import { Stages } from './components/Stages';
import { Documents } from './components/Documents';
import { Information } from './components/Information';
import { InformationDevice } from './components/InformationDevice';
import TaskComments from './components/Comments/TaskComments';
import NodeInformation from '../NodeProfile/components/Information';
import { Icon as IconTT } from '../../tt-components/Icon';
import DeviceIcons from '../../_components/DeviceIcons';
import { TaskNodeStatistic } from '../../features/nodes/displayNode/TaskNodeStatistic';
import { getNodeIdFromTask } from './utlis';
import { IndividualDevicesList } from './components/IndividualDevicesList';
import { ReadingsHistoryModal } from '01/features/readings/displayReadingHistory/ReadingsHistoryModal';
import { GoBack } from 'ui-kit/shared_components/GoBack';

function reducer(state, action) {
  const { type, data } = action;
  switch (type) {
    case 'success':
      return { ...state, ...data, stageData: null };
    // после того, как завершение этапа закончилось
    case 'revert_stage':
      return {
        ...state,
        stageData: { data, move: 'revert' },
        panelLoading: true,
      };
    // вернуть этап
    case 'push_stage':
      return {
        ...state,
        stageData: { data, move: 'push' },
        panelLoading: true,
      };
    // после нажатия на "Завершить этап"
    default:
      console.error('task id', type);
      return state;
  }
}

export const TaskProfile = () => {
  const [state, dispatch] = React.useReducer(reducer, {});
  usePageFetch(state, dispatch);
  const panel = usePanel(state, dispatch);
  // панель действий
  const stages = useStages(state, dispatch);
  // ?
  const docs = useDocuments(state, dispatch);
  // прикрепленные файлы

  const info = useInformation(state);
  // ?
  const infoDevice = useInformationDevice(state);

  const { device, node } = state;
  const { type, id } = device || {};
  const { icon, color } = DeviceIcons[node?.resource] || {};
  const { calculator } = state;

  // в каждый компонент в пропсах приходят данные, собранные из одноименных хуков сверху

  const isIndividualDeviceReadingCheckType =
    state.type === 'IndividualDeviceReadingsCheck';

  const nodeId = state && getNodeIdFromTask(state);

  const task = useStore($task);

  const individualDevices = task?.individualDevices;

  const isIndividualDevicesEmpty = !individualDevices?.length;

  return styled(s.grid)(
    <TasksProfileContext.Provider value={{ ...state, dispatch }}>
      <ReadingsHistoryModal readonly />
      <GoBack path="/tasks/" />
      <Header {...state.header} state={state} />
      {isIndividualDeviceReadingCheckType ? (
        <CorrectionReadingsPanel />
      ) : (
        <Panel {...panel} device={device} state={state} />
      )}
      <Steps />
      <Documents {...docs} />
      <grid>
        <div>
          {state.comments !== undefined ? (
            <TaskComments comments={state.comments} />
          ) : null}
          <Information {...info} />
          <InformationDevice {...infoDevice} type={type} id={id} />
          {nodeId && <TaskNodeStatistic id={nodeId} />}
          {!isIndividualDevicesEmpty && (
            <IndividualDevicesList devices={individualDevices} />
          )}

          {node ? (
            <div style={{ marginTop: 16 }}>
              <NodeLink to={`/nodes/${node.id}`}>
                <div>
                  <IconTT
                    icon={icon}
                    fill={color}
                    size={24}
                    style={{ marginRight: 8 }}
                  />
                  Узел {node.number}
                </div>
              </NodeLink>

              <div style={{ marginLeft: 32, marginTop: 8 }}>
                <span style={{ color: 'var(--main-100)' }}>
                  {calculator.model}
                </span>{' '}
                <span style={{ color: 'var(--main-60)' }}>
                  ({calculator.serialNumber})
                </span>
              </div>
              <NodeInformation node={node} calculator={calculator} task />
            </div>
          ) : null}
        </div>
        <Stages {...stages} state={state} />
      </grid>
    </TasksProfileContext.Provider>
  );
};

const NodeLink = styledC(Link)`
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
  color: var(--main-100);
  &:hover h2 {
    color: var(--primary-100);
  }
`;

export default TaskProfile;
