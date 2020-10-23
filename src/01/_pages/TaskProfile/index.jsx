import React from 'react';

import styled from 'reshadow/macro';

import * as s from '01/r_comp';
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
import ModalChangeOdpu from './components/Modals/ModalChangeOdpu';
import ModalDeregisterDevice from './components/Modals/ModalDeregisterDevice';

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
      // console.log("stagedata", data)
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

  console.log('TaskProfile info', info);
  // ?
  // debugger;
  // console.log('TaskProfile info', info);

  // в каждый компонент в пропсах приходят данные, собранные из одноименных хуков сверху

  return styled(s.grid)(
    <TasksProfileContext.Provider value={{ ...state, dispatch }}>
      <Header {...state.header} />
      <Panel {...panel} />
      <Steps />
      <Documents {...docs} />
      <grid>
        <Information {...info} />
        <Stages {...stages} />
        <InformationDevice {...infoDevice} />
      </grid>
      <ModalChangeOdpu {...infoDevice} />
      <ModalDeregisterDevice {...infoDevice} />
    </TasksProfileContext.Provider>,
  );
};

export default TaskProfile;
