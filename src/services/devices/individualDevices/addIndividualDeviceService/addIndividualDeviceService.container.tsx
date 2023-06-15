import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { addIndividualDeviceService } from './addIndividualDeviceService.model';
import { AddIndividualDevicePage } from './AddIndividualDevicePage';

const { inputs, outputs, gates } = addIndividualDeviceService;

export const AddIndividualDeviceContainer = () => {
  return (
    <>
      <AddIndividualDevicePage />
    </>
  );
};
