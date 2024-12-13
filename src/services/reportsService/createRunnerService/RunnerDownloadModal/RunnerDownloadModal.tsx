import React, { FC, useState } from 'react';
import {
  LeftBlock,
  PanelWrapper,
  RightBlock,
} from './RunnerDownloadModal.styled';
import { Props } from './RunnerDownloadModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { DocumentBoldIcon } from 'ui-kit/icons';
import { YearRangeDictionary } from '../CreateRunnerModal/CreateRunnerModal.constants';
import { YearRangeType } from 'api/types';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';

export const RunnerDownloadModal: FC<Props> = ({
  isOpen,
  handleDownloadFile,
  isDownloading,
  handleReset,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const yearRange = localStorage.getItem(
    'runnerPollYearRange',
  ) as YearRangeType;

  const RunnerDownloadModal = () => {
    return (
      <PanelWrapper>
        <LeftBlock>
          <DocumentBoldIcon /> Бегунок
        </LeftBlock>
        <RightBlock>{YearRangeDictionary[yearRange]}</RightBlock>
      </PanelWrapper>
    );
  };

  return (
    <>
      <FormModal
        visible={isOpen}
        onCancel={() => setDialogOpen(true)}
        onSubmit={() => handleDownloadFile()}
        loading={isDownloading}
        submitBtnText="Скачать"
        title="Скачать бегунок"
        formId="Runner-Download-Modal"
        form={<RunnerDownloadModal />}
      />
      <Dialog
        zIndex={1100}
        width={600}
        title="Вы уверены, что хотите выйти?"
        description="После выхода отчет удалится."
        isOpen={isDialogOpen}
        onCancel={() => setDialogOpen(false)}
        onSubmit={() => {
          setDialogOpen(false);
          handleReset();
        }}
        submitText="Выйти"
        cancelText="Продолжить"
        type="danger"
      />
    </>
  );
};
