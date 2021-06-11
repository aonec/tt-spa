import {
  $competencesCatalog,
  $isFetchingCompetencesFailed,
  CompetencesGate,
  fetchCompetencesFx,
} from '01/features/competences/fetchCompetences/models';
import { ErrorMessage } from '01/features/contractors/addContractors';
import {
  $isFetchingUserRolesFailed,
  $userRoles,
  fetchUserRolesFx,
  UserRolesGate,
} from '01/features/userRoles/displayUserRoles/models';
import {
  Footer,
  Header,
  ModalText,
  StyledModal,
} from '01/shared/ui/Modal/Modal';
import { ButtonTT, InputTT, MultiSelectTT } from '01/tt-components';
import { ErrorAlert } from '01/_components/Alert';
import { Loader } from '01/_components/Loader';
import { Form } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import {
  $isAddStaffFailed,
  $isAddStaffModalVisible,
  addStaffForm,
  addStaffFx,
  addStaffModalCloseButtonClicked,
} from './models';
import { getValueByPriority, usePhoneMask } from './utils';

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

  const phoneMask = usePhoneMask();

  const { submit: onSubmit, fields, eachValid } = useForm(addStaffForm);

  const onCancel = () => addStaffModalCloseButtonClicked();

  const multipleSelectionCompetences = competences?.map((elem) => ({
    label: elem.title,
    value: elem.id,
  }));

  const multipleSelectionUserRoles = userRoles?.map((elem) => ({
    label: elem.title,
    value: elem.id,
  }));

  const isFailedAddingStaff = useStore($isAddStaffFailed);
  const pendingAddStaffRequest = useStore(addStaffFx.pending);
  const pendingFetchingCompetences = useStore(fetchCompetencesFx.pending);
  const pendingFetchingUserRolse = useStore(fetchUserRolesFx.pending);
  const pendingFetchingData =
    pendingFetchingCompetences || pendingFetchingUserRolse;

  const failedFetchCompetances = useStore($isFetchingCompetencesFailed);
  const failedFetchUserRoles = useStore($isFetchingUserRolesFailed);

  const errorAlert = (
    <ErrorAlert
      show={
        isFailedAddingStaff || failedFetchCompetances || failedFetchUserRoles
      }
      message={getValueByPriority([
        {
          show: isFailedAddingStaff,
          value: 'Не удалось добавить сотрудника',
        },
        {
          show: failedFetchUserRoles || isFailedAddingStaff,
          value: 'Не удалось загрузить данные',
        },
      ])}
    />
  );

  const modalContent = (
    <ModalText>
      <FormContainer onSubmit={() => onSubmit()}>
        <FormItemsContainer>
          <Form.Item label="Фамилия">
            <InputTT
              name="lastName"
              type="text"
              value={fields.lastName.value}
              onChange={(e: { target: { value: string } }) =>
                fields.lastName.onChange(e.target.value)
              }
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
              onChange={(e: { target: { value: string } }) =>
                fields.firstName.onChange(e.target.value)
              }
            />
            <ErrorMessage>
              {fields.firstName.errorText({
                required: 'Это поле обязательное',
              })}
            </ErrorMessage>
          </Form.Item>
          <Form.Item label="Отчество">
            <InputTT
              name="middleName"
              type="text"
              value={fields.middleName.value}
              onChange={(e: { target: { value: string } }) =>
                fields.middleName.onChange(e.target.value)
              }
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
              onChange={(e: { target: { value: string } }) =>
                fields.email.onChange(e.target.value)
              }
            />
            <ErrorMessage>
              {fields.email.errorText({
                required: 'Это поле обязательное',
                email: 'Введите корректный email',
              })}
            </ErrorMessage>
          </Form.Item>
          <Form.Item label="Контактный телефон">
            <InputTT
              width="100%"
              name="cellPhone"
              type="text"
              value={phoneMask.maskValue(fields.cellPhone.value)}
              onChange={(e: { target: { value: string } }) =>
                fields.cellPhone.onChange(
                  phoneMask.unmaskedValue(e.target.value)
                )
              }
            />
            <ErrorMessage>
              {fields.cellPhone.errorText({
                required: 'Это поле обязательное',
                phone: 'Введите корректный номер телефона',
              })}
            </ErrorMessage>
          </Form.Item>
        </FormItemsContainer>
        <Form.Item label="Роль в системе">
          <StyledMultiSelect
            mode="multiple"
            value={fields.userRoleIds.value}
            options={multipleSelectionUserRoles}
            onChange={fields.userRoleIds.onChange as any}
          />
          <ErrorMessage>
            {fields.userRoleIds.errorText({
              required: 'Выберите роль',
            })}
          </ErrorMessage>
        </Form.Item>
        <Form.Item label="Компетенции">
          <StyledMultiSelect
            mode="multiple"
            value={fields.firmCompetenceIds.value}
            options={multipleSelectionCompetences}
            onChange={fields.firmCompetenceIds.onChange as any}
          />
        </Form.Item>
        <button
          disabled={!eachValid}
          type="submit"
          style={{ display: 'none' }}
        />
      </FormContainer>
    </ModalText>
  );

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
          <ButtonTT
            color="blue"
            key="submit"
            onClick={onSubmit}
            disabled={pendingAddStaffRequest}
          >
            {pendingAddStaffRequest ? <Loader show={true} /> : 'Добавить'}
          </ButtonTT>
        </Footer>
      }
    >
      <CompetencesGate />
      <UserRolesGate />
      {errorAlert}
      {pendingFetchingData ? (
        <Loader show={true} />
      ) : (
        !failedFetchUserRoles && !failedFetchCompetances && modalContent
      )}
    </StyledModal>
  );
};

const StyledMultiSelect = styled(MultiSelectTT)`
  min-height: 48px;
`;
