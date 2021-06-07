import { ErrorMessage } from '01/features/contractors/addContractors';
import { ModalText } from '01/shared/ui/Modal/Modal';
import { ButtonTT, InputTT, StyledModal } from '01/tt-components';
import { Form } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $isAddStaffModalVisible,
  addStaffForm,
  addStaffModalCloseButtonClicked,
} from './models';

export const AddStaffModal: React.FC = () => {
  const visible = useStore($isAddStaffModalVisible);
  const { submit: onSubmit, fields, eachValid } = useForm(addStaffForm);
  const onCancel = () => addStaffModalCloseButtonClicked();

  return (
    <StyledModal
      visible={visible}
      onCancel={onCancel}
      width={800}
      title="Добавление нового сотрудника"
      footer={
        <Footer>
          <ButtonTT color={'white'} key="back" onClick={onCancel}>
            Отмена
          </ButtonTT>
          <ButtonTT color="blue" key="submit" onClick={onSubmit}>
            Добавить
          </ButtonTT>
        </Footer>
      }
    >
      <ModalText style={{ margin: '0 24px' }}>
        <form onSubmit={() => onSubmit()}>
          <Form.Item label="Название организации">
            <InputTT
              name="name"
              type="text"
              value={fields.lastName.value}
              onChange={(e) => fields.lastName.onChange(e.target.value)}
            />
            <ErrorMessage>
              {fields.email.errorText({
                required: 'Это поле обязательное',
              })}
            </ErrorMessage>
          </Form.Item>
          <Form.Item label="Электронная почта">
            <InputTT
              type="email"
              value={fields.email.value}
              onChange={(e) => fields.email.onChange(e.target.value)}
            />
            <ErrorMessage>
              {fields.email.errorText({
                email: 'Введите корректный адрес электронной почты',
              })}
            </ErrorMessage>
          </Form.Item>
          <button
            disabled={!eachValid}
            type="submit"
            style={{ display: 'none' }}
          />
        </form>
      </ModalText>
    </StyledModal>
  );
};
