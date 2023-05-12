import { Button, Form } from 'antd';
import { useForm } from 'effector-forms/dist';
import { CalculatorIntoHousingStockResponse, PipeNodeResponse } from 'myApi';
import React, { FC } from 'react';
import { Flex } from '../../../../../../shared/ui/Layout/Flex';
import { Grid } from '../../../../../../shared/ui/Layout/Grid';
import { ModalTT } from '../../../../../../shared/ui/ModalTT';
import { CreateCalculatorModalContainer } from './CreateCalculatorModal/CreateCalculatorModalContainer';
import { createCalcuatorService } from './CreateCalculatorModal/models';
import { AddNodeCalculatorConnectionForm } from './models';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Select } from 'ui-kit/Select';

interface Props {
  onClose(): void;
  isOpen: boolean;
  calculators: CalculatorIntoHousingStockResponse[] | null;
  form: AddNodeCalculatorConnectionForm;
  loading: boolean;
  node?: PipeNodeResponse | null;
}

const calculatorConnectionInputNumbers = [1, 2, 3];

export const AddNodeCalculatorConnectionModal: FC<Props> = ({
  onClose,
  isOpen,
  calculators,
  form,
  loading,
  node,
}) => {
  const { fields, submit } = useForm(form);
  const calculator = node?.calculator;
  return (
    <ModalTT
      loading={loading}
      visible={isOpen}
      onCancel={onClose}
      title={
        calculator
          ? 'Редактирование подключения вычислителя'
          : 'Подключение вычислителя'
      }
      onSubmit={submit}
      centered
    >
      <CreateCalculatorModalContainer />
      <Grid temp="1fr 1fr" gap="15px">
        <Form.Item label="Вычислитель, к которому подключен узел">
          <Select
            placeholder="Серийный номер или IP адрес"
            value={fields.calculatorId.value || undefined}
            onChange={fields.calculatorId.onChange as any}
          >
            {calculators?.map((calculator) => (
              <Select.Option key={calculator.id} value={calculator.id}>
                {calculator.serialNumber} ({calculator.model})
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>
            {fields.calculatorId.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </Form.Item>
        <Flex style={{ transform: 'translateY(10px)' }}>
          <Button
            type="link"
            onClick={() =>
              createCalcuatorService.inputs.openCreateCalculatorModal()
            }
          >
            + Добавить вычислитель
          </Button>
        </Flex>
        <Form.Item label="Номер ввода">
          <Select
            placeholder="Выберите номер ввода"
            value={fields.entryNumber.value || undefined}
            onChange={fields.entryNumber.onChange as any}
          >
            {calculatorConnectionInputNumbers.map((value) => (
              <Select.Option key={value} value={value}>
                {value}
              </Select.Option>
            ))}
          </Select>
          <ErrorMessage>
            {fields.entryNumber.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </Form.Item>
      </Grid>
    </ModalTT>
  );
};
