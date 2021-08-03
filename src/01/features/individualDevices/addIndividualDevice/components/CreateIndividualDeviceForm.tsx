import { useStore } from 'effector-react';
import React from 'react';
import { $creationDeviceStage } from '../models';
import { BaseInfoStage } from './stages/BaseInfoStage';
import { DocumentsStage } from './stages/DocumentsStage';

export const CreateIndividualDeviceForm = () => {
  const stageNumber = useStore($creationDeviceStage);

  const pages = [<BaseInfoStage />, <DocumentsStage />];

  return <div>{pages[stageNumber]}</div>;
};
