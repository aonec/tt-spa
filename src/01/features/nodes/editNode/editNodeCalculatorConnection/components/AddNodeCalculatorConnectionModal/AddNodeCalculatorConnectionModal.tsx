import { Button, Form } from 'antd';
import { useForm } from 'effector-forms/dist';
import { CalculatorIntoHousingStockResponse, PipeNodeResponse } from 'myApi';
import React, { FC } from 'react';

import { Flex } from '../../../../../../shared/ui/Layout/Flex';
import { Grid } from '../../../../../../shared/ui/Layout/Grid';
import { ModalTT } from '../../../../../../shared/ui/ModalTT';
import { StyledSelect } from '../../../../../../_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { ErrorMessage } from '../../../../../contractors/addContractors';
import { CreateCalculatorModalContainer } from './CreateCalculatorModal/CreateCalculatorModalContainer';
import { createCalcuatorService } from './CreateCalculatorModal/models';
import { AddNodeCalculatorConnectionForm } from './models';

interface Props {
  onClose(): void;
  isOpen: boolean;
  calculators: CalculatorIntoHousingStockResponse[] | null;
  form: AddNodeCalculatorConnectionForm;
  loading: boolean;
  node?: PipeNodeResponse | null;
}

const calculatorConnectionInputNumbers = [1, 2, 3]

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
          <StyledSelect
            placeholder="Серийный номер или IP адрес"
            value={fields.calculatorId.value || undefined}
            onChange={fields.calculatorId.onChange as any}
          >
            {calculators &&
              calculators?.map((calculator) => (
                <StyledSelect.Option key={calculator.id} value={calculator.id}>
                  {/* {calculator.serialNumber} ({calculator.model}) */}
                </StyledSelect.Option>
              ))}
          </StyledSelect>
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
          <StyledSelect
            placeholder="Выберите номер ввода"
            value={fields.entryNumber.value || undefined}
            onChange={fields.entryNumber.onChange as any}
          >
            {calculatorConnectionInputNumbers.map((value) => (
              <StyledSelect.Option key={value} value={value}>
                {value}
              </StyledSelect.Option>
            ))}
          </StyledSelect>
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
