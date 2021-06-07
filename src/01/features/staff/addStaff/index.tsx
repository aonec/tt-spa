import { ModalText } from '01/shared/ui/Modal/Modal';
import { ButtonTT, StyledModal } from '01/tt-components';
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
  const { submit: onSubmit, fields } = useForm(addStaffForm);
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
      <ModalText>
        {/* {renderPostContractsAlert()} */}
        {/* <form onSubmit={() => onSubmit()}>
          <Form.Item label="Название организации">
            <InputTT
              name="name"
              type="text"
              value={fields.name.value}
              disabled={pending}
              onChange={(e) => fields.name.onChange(e.target.value)}
            />
            <ErrorMessage>
              {fields.name.errorText({
                required: 'Это поле обязательное',
              })}
            </ErrorMessage>
          </Form.Item>
          <Form.Item label="Электронная почта">
            <InputTT
              type="email"
              value={fields.email.value}
              disabled={pending}
              onChange={(e) => fields.email.onChange(e.target.value)}
            />
            <ErrorMessage>
              {fields.email.errorText({
                email: 'Введите корректный адрес электронной почты',
              })}
            </ErrorMessage>
          </Form.Item>
          <button
            disabled={!eachValid || pending}
            type="submit"
            style={{ display: 'none' }}
          />
        </form> */}
      </ModalText>
    </StyledModal>
  );
};
