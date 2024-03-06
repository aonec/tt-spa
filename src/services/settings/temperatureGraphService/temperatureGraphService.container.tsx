import React from 'react';
import { TemperatureGraph } from './view/TemperatureGraph';
import { temperatureGraphService } from './temperatureGraphService.models';
import { useUnit } from 'effector-react';
import { AddTemperatureFileModal } from './view/AddTemperatureFileModal';
import { EditDeviationModal } from './view/EditDeviationModal';

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
    isUploadModalOpen,
    setUploadModalOpen,
    handleGetTemplateFile,
    isFileLoading,
    handlePostTemplateFile,
    file,
    setFile,
    temperatureLimits,
    isDeviationEditModalOpen,
    setEditDeviationModalOpen,
  } = useUnit({
    temperatureNormative: outputs.$temperatureNormative,
    isEditing: outputs.$isEditing,
    handleEditTemperatureNormative: inputs.handleEditTemperatureNormative,
    setEditedTemperatureNormative: inputs.setEditedTemperatureNormative,
    isLoading: outputs.$isLoading,
    errorColumns: outputs.$errorColumns,
    isUploadModalOpen: outputs.$isUploadModalOpen,
    setUploadModalOpen: inputs.setUploadModalOpen,
    handleGetTemplateFile: inputs.handleGetTemplateFile,
    isFileLoading: outputs.$isFileLoading,
    handlePostTemplateFile: inputs.handlePostTemplateFile,
    setFile: inputs.setFile,
    file: outputs.$file,
    temperatureLimits: outputs.$temperatureLimits,
    isDeviationEditModalOpen: outputs.$isDeviationEditModalOpen,
    setEditDeviationModalOpen: inputs.setEditDeviationModalOpen,
  });
  return (
    <>
      <TemperatureGraphGate />
      <AddTemperatureFileModal
        isModalOpen={isUploadModalOpen}
        setModalOpen={setUploadModalOpen}
        handleGetTemplateFile={handleGetTemplateFile}
        isFileLoading={isFileLoading}
        handlePostTemplateFile={handlePostTemplateFile}
        file={file}
        setFile={setFile}
      />
      <EditDeviationModal
        isOpen={isDeviationEditModalOpen}
        setModalOpen={setEditDeviationModalOpen}
        temperatureLimits={temperatureLimits}
        handleEdit={setEditedTemperatureNormative}
      />
      <TemperatureGraph
        temperatureNormative={temperatureNormative}
        isEditing={isEditing}
        handleEditTemperatureNormative={handleEditTemperatureNormative}
        setEditedTemperatureNormative={setEditedTemperatureNormative}
        isLoading={isLoading}
        errorColumns={errorColumns}
        temperatureLimits={temperatureLimits}
        setEditDeviationModalOpen={setEditDeviationModalOpen}
      />
    </>
  );
};
