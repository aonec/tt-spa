import React from 'react';
import { useForm } from 'effector-forms';
import { useStore } from 'effector-react';
import {
  $isAddContractorsModalVisible,
  $isFailedAddingContractor,
  addContractorsForm,
  cancelAddingContractorsButtonClicked,
  postContractorsFx,
} from './models';
import {
  Footer,
  Header,
  ModalText,
  StyledModal,
} from '01/shared/ui/Modal/Modal';
import { ButtonTT, InputTT } from '01/tt-components';
import { Alert, Form } from 'antd';
import { Loader } from '01/_components/Loader';
import styled from 'styled-components';

export const ErrorMessage = styled.p`
  color: red;
`;

type InputTTEvent = { target: { value: string } };

export const AddContractorsFormModal = () => {
  const { fields, submit, eachValid } = useForm(addContractorsForm);
  const pending = useStore(postContractorsFx.pending);
  const isVisible = useStore($isAddContractorsModalVisible);
  const isFailedAddingContractor = useStore($isFailedAddingContractor);

  const onSubmit = (e: any) => {
    e.preventDefault();
    submit();
  };

  const onCancel = () => cancelAddingContractorsButtonClicked();

  const renderPostContractsAlert = () =>
    isFailedAddingContractor ? (
      <Alert
        message="Ошибка"
        description="Не удалось добавить котрагента. Пожалуйста, обновите страницу или повторите попытку позже."
        type="error"
        showIcon
        closable
        style={{ marginBottom: 24 }}
      />
    ) : null;

  return (
    <StyledModal
      visible={isVisible}
      title={<Header>Добавление нового контрагента</Header>}
      onCancel={onCancel}
      width={800}
      footer={
        <Footer>
          <ButtonTT color={'white'} key="back" onClick={onCancel}>
            Отмена
          </ButtonTT>
          <ButtonTT
            color="blue"
            disabled={pending}
            key="submit"
            onClick={onSubmit}
          >
            {pending ? <Loader show={true} /> : 'Добавить'}
          </ButtonTT>
        </Footer>
      }
    >
      <ModalText>
        {renderPostContractsAlert()}
        <form onSubmit={onSubmit}>
          <Form.Item label="Название организации">
            <InputTT
              name="name"
              type="text"
              value={fields.name.value}
              disabled={pending}
              onChange={(e: InputTTEvent) =>
                fields.name.onChange(e.target.value)
              }
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
              onChange={(e: InputTTEvent) =>
                fields.email.onChange(e.target.value)
              }
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
        </form>
      </ModalText>
    </StyledModal>
  );
};
