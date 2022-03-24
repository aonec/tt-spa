import { Button, Form } from 'antd';
import React, { FC } from 'react';
import { CalculatorListResponse } from '../../../../../../../myApi';
import { Flex } from '../../../../../../shared/ui/Layout/Flex';
import { Grid } from '../../../../../../shared/ui/Layout/Grid';
import { ModalTT } from '../../../../../../shared/ui/ModalTT';
import { StyledSelect } from '../../../../../../_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { CreateCalculatorModalContainer } from './CreateCalculatorModal/CreateCalculatorModalContainer';
import { createCalcuatorService } from './CreateCalculatorModal/models';

interface Props {
  onClose(): void;
  isOpen: boolean;
  calculators: CalculatorListResponse[];
  form?: {
    calculatorId: {};
  };
}

export const AddNodeCalculatorConnectionModal: FC<Props> = ({
  onClose,
  isOpen,
  calculators,
}) => {
  return (
    <ModalTT
      visible={isOpen}
      onCancel={onClose}
      title="Подключение вычислителя"
    >
      <CreateCalculatorModalContainer />
      <Grid temp="1fr 1fr" gap="15px">
        <Form.Item label="Вычислитель, к которому подключен узел">
          <StyledSelect placeholder="Серийный номер или IP адрес">
            {calculators &&
              calculators?.map((calculator) => (
                <StyledSelect.Option key={calculator.id} value={calculator.id}>
                  {calculator.serialNumber} ({calculator.model})
                </StyledSelect.Option>
              ))}
          </StyledSelect>
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
          <StyledSelect placeholder="Выберите номер ввода">
            {[1, 2, 3].map((value) => (
              <StyledSelect.Option key={value} value={value}>
                {value}
              </StyledSelect.Option>
            ))}
          </StyledSelect>
        </Form.Item>
      </Grid>
    </ModalTT>
  );
};
