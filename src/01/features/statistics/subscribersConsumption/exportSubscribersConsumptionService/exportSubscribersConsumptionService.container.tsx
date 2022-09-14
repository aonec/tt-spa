import { InputSC } from '01/shared/ui/Fields';
import { ModalTT } from '01/shared/ui/ModalTT';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { exportSubscribersConsumptionService } from './exportSubscribersConsumptionService.model';
import { TextWrapper } from './exportSubscribersConsumptionService.styled';

const { inputs, outputs } = exportSubscribersConsumptionService;

export const ExportSubscribersConsumptionContainer = () => {
  const isOpen = useStore(outputs.$isModalOpen);
  const fileName = useStore(outputs.$fileName);

  const closeModal = useEvent(inputs.closeModal);
  const setFileName = useEvent(inputs.setFileName);
  const handleExportStatistic = useEvent(inputs.exportStatistic);

  const isButtonDisabled = !Boolean(fileName.length);
  const buttonText = isButtonDisabled
    ? 'Введите название файла'
    : 'Выгрузить список';

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
