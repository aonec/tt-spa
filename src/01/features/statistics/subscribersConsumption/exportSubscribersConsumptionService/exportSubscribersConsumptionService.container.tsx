import { InputSC } from '01/shared/ui/Fields';
import { ModalTT } from '01/shared/ui/ModalTT';
import { useEvent, useStore } from 'effector-react';
import React, { FC, useEffect } from 'react';
import { exportSubscribersConsumptionService } from './exportSubscribersConsumptionService.model';
import { TextWrapper } from './exportSubscribersConsumptionService.styled';
import { ExportSubscribersConsumptionContainerProps } from './exportSubscribersConsumptionService.types';

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
  }, [filter]);

  return (
    <ModalTT
      visible={isOpen}
      title="Выгрузить список квартир"
      onCancel={() => closeModal()}
      saveBtnText={buttonText}
      onSubmit={() => handleExportStatistic()}
      disabled={isButtonDisabled}
    >
      <TextWrapper>Название списка</TextWrapper>
      <InputSC
        value={fileName || undefined}
        onChange={(e) => setFileName(e.target.value)}
      />
    </ModalTT>
  );
};
