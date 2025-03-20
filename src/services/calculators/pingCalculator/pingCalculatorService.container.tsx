import { useUnit } from 'effector-react';
import { pingCalculatorService } from './pingCalculatorService.models';
import {
  calculatorQuery,
  pingCalculatorQuery,
} from './pingCalculatorService.api';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { PingResult } from './PingResult';
import { useEffect, useState } from 'react';
import { Progress } from 'antd';

const { inputs, outputs } = pingCalculatorService;

export const PingCalculatorContainer = () => {
  const {
    calculator,
    isOpen,
    handleClose,
    isLoading,
    handleStartPing,
    isPingLoading,
    pingResult,
  } = useUnit({
    calculator: calculatorQuery.$data,
    isLoading: calculatorQuery.$pending,
    isOpen: outputs.$isModalOpen,
    handleClose: inputs.closeModal,
    handleStartPing: pingCalculatorQuery.start,
    isPingLoading: pingCalculatorQuery.$pending,
    pingResult: pingCalculatorQuery.$data,
  });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (isPingLoading) {
      setPercent(0);
      const start = performance.now();
      const duration = 3000;
      const interval = 50;

      const timer = setInterval(() => {
        const elapsed = performance.now() - start;
        const progress = Math.min((elapsed / duration) * 100, 100);
        setPercent(progress);

        if (progress >= 100) clearInterval(timer);
      }, interval);

      return () => clearInterval(timer);
    } else {
      setPercent(0);
    }
  }, [isPingLoading]);

  const calculatorTitle =
    calculator && `${calculator.model} (${calculator.serialNumber})`;

  return (
    <FormModal
      visible={isOpen}
      disabled={isLoading || isPingLoading}
      onCancel={handleClose}
      formId="calculator-ping"
      submitBtnText={pingResult ? 'Завершить опрос' : 'Запустить опрос'}
      title={`Опрос вычислителя ${calculatorTitle || ''}`}
      onSubmit={() => {
        if (pingResult) {
          handleClose();
          return;
        }
        if (calculator) {
          handleStartPing(calculator.id);
        }
      }}
      form={
        <WithLoader isLoading={isLoading}>
          {!pingResult &&
            'Подтвердите, что вы хотите запустить опрос вычислителя вручную'}
          {pingResult && calculator && (
            <PingResult calculator={calculator} pingResult={pingResult} />
          )}
          {isPingLoading && <Progress percent={Math.round(percent)} />}
        </WithLoader>
      }
    />
  );
};
