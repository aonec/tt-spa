import {
  $competencesCatalog,
  CompetencesGate,
} from '01/features/competences/fetchCompetences/models';
import { ErrorMessage } from '01/features/contractors/addContractors';
import {
  $userRoles,
  UserRolesGate,
} from '01/features/userRoles/displayUserRoles/models';
import {
  Footer,
  Header,
  ModalText,
  StyledModal,
} from '01/shared/ui/Modal/Modal';
import { ButtonTT, InputTT, MultiSelectTT } from '01/tt-components';
import { Form } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import {
  $isAddStaffModalVisible,
  addStaffForm,
  addStaffModalCloseButtonClicked,
} from './models';

const FormItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .ant-row {
    width: 100%;
    margin-right: 20px;
  }

  .ant-row:last-child {
    margin-right: 0;
  }
`;

const FormContainer = styled.form`
  .ant-form-item {
    padding-bottom: 0 !important;
  }
`;

export const AddStaffModal: React.FC = () => {
  const visible = useStore($isAddStaffModalVisible);
  const competences = useStore($competencesCatalog);
  const userRoles = useStore($userRoles);
  const { submit: onSubmit, fields, eachValid } = useForm(addStaffForm);
  const onCancel = () => addStaffModalCloseButtonClicked();

  const multipleSelectionCompetences = competences?.map((elem) => ({
    label: elem.value,
    value: elem.key,
  }));

  const multipleSelectionUserRoles = userRoles?.map((elem) => ({
    label: elem.title,
    value: elem.id,
  }));

  return (
    <StyledModal
      visible={visible}
      onCancel={onCancel}
      width={800}
      title={<Header>Добавление нового сотрудника</Header>}
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
      <CompetencesGate />
      <UserRolesGate />
      <ModalText>
        <FormContainer onSubmit={() => onSubmit()}>
          <FormItemsContainer>
            <Form.Item label="Фамилия">
              <InputTT
                name="lastName"
                type="text"
                value={fields.lastName.value}
                onChange={(e) => fields.lastName.onChange(e.target.value)}
              />
              <ErrorMessage>
                {fields.lastName.errorText({
                  required: 'Это поле обязательное',
                })}
              </ErrorMessage>
            </Form.Item>
            <Form.Item label="Имя">
              <InputTT
                type="firstName"
                value={fields.firstName.value}
                onChange={(e) => fields.firstName.onChange(e.target.value)}
              />
              <ErrorMessage>
                {fields.firstName.errorText({
                  email: 'Введите корректный адрес электронной почты',
                })}
              </ErrorMessage>
            </Form.Item>
            <Form.Item label="Отчество">
              <InputTT
                name="middleName"
                type="text"
                value={fields.middleName.value}
                onChange={(e) => fields.middleName.onChange(e.target.value)}
              />
              <ErrorMessage>
                {fields.middleName.errorText({
                  required: 'Это поле обязательное',
                })}
              </ErrorMessage>
            </Form.Item>
          </FormItemsContainer>
          <FormItemsContainer>
            <Form.Item label="Электронная почта">
              <InputTT
                name="email"
                type="text"
                value={fields.email.value}
                onChange={(e) => fields.email.onChange(e.target.value)}
              />
              <ErrorMessage>
                {fields.email.errorText({
                  required: 'Это поле обязательное',
                })}
              </ErrorMessage>
            </Form.Item>
            <Form.Item label="Контактный телефон">
              <InputTT
                maxLength={11}
                width="100%"
                name="cellPhone"
                type="number"
                value={fields.cellPhone.value}
                onChange={(e) => fields.cellPhone.onChange(e.target.value)}
              />
              <ErrorMessage>
                {fields.cellPhone.errorText({
                  required: 'Это поле обязательное',
                })}
              </ErrorMessage>
            </Form.Item>
          </FormItemsContainer>
          <Form.Item label="Роль в системе">
            <MultiSelectTT
              mode="multiple"
              options={multipleSelectionUserRoles}
            />
            <ErrorMessage>
              {fields.cellPhone.errorText({
                required: 'Это поле обязательное',
              })}
            </ErrorMessage>
          </Form.Item>
          <Form.Item label="Компетенции">
            <MultiSelectTT
              mode="multiple"
              options={multipleSelectionCompetences}
            />
            <ErrorMessage>
              {fields.cellPhone.errorText({
                required: 'Это поле обязательное',
              })}
            </ErrorMessage>
          </Form.Item>
          <button
            disabled={!eachValid}
            type="submit"
            style={{ display: 'none' }}
          />
        </FormContainer>
      </ModalText>
    </StyledModal>
  );
};
