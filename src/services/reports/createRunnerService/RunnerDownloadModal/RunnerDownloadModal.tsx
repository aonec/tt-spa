import React, { FC, useState } from 'react';
import { Wrapper } from './RunnerDownloadModal.styled';
import { Props } from './RunnerDownloadModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';

export const RunnerDownloadModal: FC<Props> = ({
  isOpen,
  setOpen,
  handleDownloadFile,
  isDownloading,
}) => {
  const RunnerDownloadModal = () => {
    return <></>;
  };

  return (
    <FormModal
      visible={isOpen}
      onCancel={() => setOpen(false)}
      onSubmit={() => handleDownloadFile()}
      loading={isDownloading}
      submitBtnText="Скачать"
      title="Скачать бегунок"
      formId="Runner-Download-Modal"
      form={<RunnerDownloadModal />}
    />
  );
};
