import { Skeleton } from 'antd';
import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { CreateResourceDisconnectionForm } from '../CreateResourceDisconnectionForm';
import { CreateResourceDisconnectionModalProps } from './CreateResourceDisconnectionModal.types';

export const CreateResourceDisconnectionModal: FC<CreateResourceDisconnectionModalProps> = ({
  isOpen,
  handleClose,
  handleCreateResourceDisconnection,
  cities,
  selectedCity,
  handleSelectCity,
  heatingStations,
  handleSelectHeatingStation,
  treeData,
  disconnectingTypes,
  resourceTypes,
  isInterHeatingSeason,
  isDisconnectionLoading,
  isEdit,
  resourceDisconnection,
  handleEditResourceDisconnection,
  handleUpdateDocument,
}) => {
  const buttonPlaceholder = isEdit
    ? 'Сохранить изменения'
    : 'Создать отключение';
  const modalTitle = isEdit
    ? 'Редактировать отключение ресурса'
    : 'Создать отключение ресурса';

  return (
    <FormModal
      visible={isOpen}
      onCancel={handleClose}
      title={modalTitle}
      submitBtnText={buttonPlaceholder}
      form={
        <>
          {isDisconnectionLoading && <Skeleton active />}
          {!isDisconnectionLoading && (
            <CreateResourceDisconnectionForm
              handleCreateResourceDisconnection={
                handleCreateResourceDisconnection
              }
              formId="createResourceDisconnection"
              heatingStations={heatingStations}
              cities={cities}
              treeData={treeData}
              selectedCity={selectedCity}
              handleSelectCity={handleSelectCity}
              handleSelectHeatingStation={handleSelectHeatingStation}
              disconnectingTypes={disconnectingTypes}
              resourceTypes={resourceTypes}
              isInterHeatingSeason={isInterHeatingSeason}
              resourceDisconnection={resourceDisconnection}
              isEdit={isEdit}
              handleEditResourceDisconnection={handleEditResourceDisconnection}
              handleUpdateDocument={handleUpdateDocument}
            />
          )}
        </>
      }
      formId="createResourceDisconnection"
    />
  );
};
