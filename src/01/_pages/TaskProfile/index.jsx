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
import ModalDeregisterDevice from "./components/Modals/ModalDeregisterDevice";

function reducer(state, action) {
  const { type, data } = action;
  switch (type) {
    case 'success':
      return { ...state, ...data, stageData: null };
    case 'revert_stage':
      return {
        ...state,
        stageData: { data, move: 'revert' },
        panelLoading: true,
      };
    case 'push_stage':
      // console.log("stagedata", data)
      return {
        ...state,
        stageData: { data, move: 'push' },
        panelLoading: true,
      };
    default:
      console.error('task id', type);
      return state;
  }
}

export const TaskProfile = () => {
  const [state, dispatch] = React.useReducer(reducer, {});
  usePageFetch(state, dispatch);
  const panel = usePanel(state, dispatch);
  const stages = useStages(state, dispatch);
  const docs = useDocuments(state, dispatch);
  const info = useInformation(state);
  const infoDevice = useInformationDevice(state);
  console.log('TaskProfile info', infoDevice);
  // console.log('infoDevice', infoDevice);
  const buttonHandler = () => {
    console.log("buttonHandler")
    console.log(panel,info,infoDevice )
  }
  return styled(s.grid)(
    <TasksProfileContext.Provider value={{ ...state, dispatch }}>
      <button onClick={buttonHandler}>buttonHandler</button>
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
