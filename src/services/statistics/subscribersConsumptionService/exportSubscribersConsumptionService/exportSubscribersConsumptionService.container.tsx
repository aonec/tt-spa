import { useEvent, useStore } from 'effector-react';
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
  const isOpen = useStore(outputs.$isModalOpen);
  const fileName = useStore(outputs.$fileName);

  const closeModal = useEvent(inputs.closeModal);
  const setFileName = useEvent(inputs.setFileName);
  const handleExportStatistic = useEvent(inputs.exportStatistic);
  const setFilter = useEvent(inputs.setSubscriberStatisticsFilter);

  const isButtonDisabled = !Boolean(fileName.length);
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
