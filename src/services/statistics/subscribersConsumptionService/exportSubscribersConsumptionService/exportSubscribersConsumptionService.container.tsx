import { useUnit } from 'effector-react';
import React, { FC, useEffect } from 'react';
import { exportSubscribersConsumptionService } from './exportSubscribersConsumptionService.model';
import { TextWrapper } from './exportSubscribersConsumptionService.styled';
import { ExportSubscribersConsumptionContainerProps } from './exportSubscribersConsumptionService.types';
import { Input } from 'ui-kit/Input';
import { FormModal } from 'ui-kit/Modals/FormModal';

const { inputs, outputs } = exportSubscribersConsumptionService;

export const ExportSubscribersConsumptionContainer: FC<
  ExportSubscribersConsumptionContainerProps
> = ({ filter }) => {
  const {
    closeModal,
    handleExportStatistic,
    fileName,
    isLoading,
    isOpen,
    setFileName,
    setFilter,
  } = useUnit({
    isOpen: outputs.$isModalOpen,
    fileName: outputs.$fileName,
    isLoading: outputs.$isLoading,
    closeModal: inputs.closeModal,
    setFileName: inputs.setFileName,
    handleExportStatistic: inputs.exportStatistic,
    setFilter: inputs.setSubscriberStatisticsFilter,
  });

  const isButtonDisabled = !fileName.length;
  const buttonText = isButtonDisabled
    ? 'Введите название файла'
    : 'Выгрузить список';

  useEffect(() => {
    setFilter(filter);
  }, [filter, setFilter]);

  return (
    <FormModal
      formId="export-subscribers-consumption-container"
      visible={isOpen}
      loading={isLoading}
      title="Выгрузить список квартир"
      onCancel={() => closeModal()}
      submitBtnText={buttonText}
      onSubmit={() => handleExportStatistic()}
      disabled={isButtonDisabled}
      form={
        <>
          <TextWrapper>Название списка</TextWrapper>
          <Input
            small
            value={fileName || undefined}
            onChange={(e) => setFileName(e.target.value)}
          />
        </>
      }
    />
  );
};
