import React, { FC } from 'react';
import { Descriprion, Wrapper } from './EditDeviationModal.styled';
import { EditDeviationModalProps } from './EditDeviationModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Form } from 'antd';

const formId = 'Edit-Deviation-Form';

export const EditDeviationModal: FC<EditDeviationModalProps> = ({
  isOpen,
  setModalOpen,
  temperatureLimits,
}) => {
  return (
    <FormModal
      title="Min и max отклонение температуры"
      visible={isOpen}
      onCancel={() => setModalOpen(false)}
      formId={formId}
      submitBtnText="Сохранить изменения"
      form={
        <Wrapper>
          <Descriprion>
            Данные значения будут использоваться в алгоритме для выявления
            перетопов и недотопов на узлах.
          </Descriprion>

          <Form.Item label="Текущее min значение" colon={false}>
            <Input />
          </Form.Item>
        </Wrapper>
      }
    />
  );
};
