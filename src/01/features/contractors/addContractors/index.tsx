import React from 'react';
import { useForm } from 'effector-forms';
import { useStore } from 'effector-react';
import {
  $isAddContractorsModalVisible,
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
import { Form } from 'antd';
import { Loader } from '01/_components/Loader';

export const AddContractorsFormModal = () => {
  const { fields, submit, eachValid } = useForm(addContractorsForm);
  const pending = useStore(postContractorsFx.pending);
  const isVisible = useStore($isAddContractorsModalVisible);

  const onSubmit = (e: any) => {
    e.preventDefault();
    submit();
  };

  const onCancel = () => cancelAddingContractorsButtonClicked();

  return (
    <StyledModal
      visible={isVisible}
      title={<Header>Добавление нового контрагента</Header>}
      // onOk={handleOk}
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
        <form onSubmit={onSubmit}>
          <Form.Item label="Название организации">
            <InputTT
              name="Название организации"
              type="text"
              value={fields.name.value}
              disabled={pending}
              onChange={(e) => fields.name.onChange(e.target.value)}
            />
            {/* {fields.name.errorText({
                  required: 'name required',
                })} */}
          </Form.Item>
          <Form.Item label="Электронная почта">
            <InputTT
              type="email"
              value={fields.email.value}
              disabled={pending}
              onChange={(e) => fields.email.onChange(e.target.value)}
            />
          </Form.Item>
          {/* {fields.email.errorText({
                required: 'email required',
              })} */}
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
