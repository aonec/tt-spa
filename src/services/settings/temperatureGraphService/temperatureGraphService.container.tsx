import React from 'react';
import { TemperatureGraph } from './view/TemperatureGraph';
import { temperatureGraphService } from './temperatureGraphService.models';
import { useUnit } from 'effector-react';
import { AddTemperatureFileModal } from './view/AddTemperatureFileModal';

const {
  inputs,
  outputs,
  gates: { TemperatureGraphGate },
} = temperatureGraphService;

export const TemperatureGraphContainer = () => {
  const {
    temperatureNormative,
    isEditing,
    handleEditTemperatureNormative,
    setEditedTemperatureNormative,
    isLoading,
    errorColumns,
    isModalOpen,
    setModalOpen,
    handleGetTemplateFile,
    isFileLoading,
  } = useUnit({
    temperatureNormative: outputs.$temperatureNormative,
    isEditing: outputs.$isEditing,
    handleEditTemperatureNormative: inputs.handleEditTemperatureNormative,
    setEditedTemperatureNormative: inputs.setEditedTemperatureNormative,
    isLoading: outputs.$isLoading,
    errorColumns: outputs.$errorColumns,
    isModalOpen: outputs.$isModalOpen,
    setModalOpen: inputs.setModalOpen,
    handleGetTemplateFile: inputs.handleGetTemplateFile,
    isFileLoading: outputs.$isFileLoading,
  });
  return (
    <>
      <TemperatureGraphGate />
      <AddTemperatureFileModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        handleGetTemplateFile={handleGetTemplateFile}
        isFileLoading={isFileLoading}

      />
      <TemperatureGraph
        temperatureNormative={temperatureNormative}
        isEditing={isEditing}
        handleEditTemperatureNormative={handleEditTemperatureNormative}
        setEditedTemperatureNormative={setEditedTemperatureNormative}
        isLoading={isLoading}
        errorColumns={errorColumns}
      />
    </>
  );
};
