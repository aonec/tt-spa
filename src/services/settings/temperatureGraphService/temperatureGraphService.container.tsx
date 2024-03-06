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
    handlePostTemplateFile,
    file,
    setFile,
    temperatureLimits,
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
    handlePostTemplateFile: inputs.handlePostTemplateFile,
    setFile: inputs.setFile,
    file: outputs.$file,
    temperatureLimits: outputs.$temperatureLimits,
  });
  return (
    <>
      <TemperatureGraphGate />
      <AddTemperatureFileModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        handleGetTemplateFile={handleGetTemplateFile}
        isFileLoading={isFileLoading}
        handlePostTemplateFile={handlePostTemplateFile}
        file={file}
        setFile={setFile}
      />
      <TemperatureGraph
        temperatureNormative={temperatureNormative}
        isEditing={isEditing}
        handleEditTemperatureNormative={handleEditTemperatureNormative}
        setEditedTemperatureNormative={setEditedTemperatureNormative}
        isLoading={isLoading}
        errorColumns={errorColumns}
        temperatureLimits={temperatureLimits}
      />
    </>
  );
};
