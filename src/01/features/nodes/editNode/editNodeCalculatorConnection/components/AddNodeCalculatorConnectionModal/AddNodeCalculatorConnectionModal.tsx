import { Button, Form } from 'antd';
import React, { FC } from 'react';
import { Flex } from '../../../../../../shared/ui/Layout/Flex';
import { Grid } from '../../../../../../shared/ui/Layout/Grid';
import { ModalTT } from '../../../../../../shared/ui/ModalTT';
import { StyledSelect } from '../../../../../../_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { CreateCalculatorModalContainer } from './CreateCalculatorModal/CreateCalculatorModalContainer';
import { createCalcuatorService } from './CreateCalculatorModal/models';
import { openAddNodeCalculatorConnectionModal } from './models';

interface Props {
  onClose(): void;
  isOpen: boolean;
}

export const AddNodeCalculatorConnectionModal: FC<Props> = ({
  onClose,
  isOpen,
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
          <StyledSelect placeholder="Серийный номер или IP адрес"></StyledSelect>
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
        <Form.Item label="Вычислитель, к которому подключен узел">
          <StyledSelect placeholder="Серийный номер или IP адрес"></StyledSelect>
        </Form.Item>
      </Grid>
    </ModalTT>
  );
};
