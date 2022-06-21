import React from 'react';
import GoBack from '01/tt-components/Breadcrumb';
import { Header } from '01/tt-components/Header';
import { ManagingFirmUserGate } from '../displayManagingFirmUser/models';
import { useHistory, useParams } from 'react-router-dom';
import {
  $competencesCatalog,
  CompetencesGate,
} from '01/features/competences/fetchCompetences/models';
import { ErrorMessage } from '01/features/contractors/addContractors';
import {
  $userRoles,
  UserRolesGate,
} from '01/features/userRoles/displayUserRoles/models';
import { ButtonTT, InputTT, MultiSelectTT } from '01/tt-components';
import { Form } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import {
  editManagingUserInfoForm,
  $isUpdateManagingFirmUserSuccess,
  resetEditManagingUserRequest,
  editManagingUserInfoFx,
  EditManagingFirmUserGate,
  $isFormDataLoading,
  $isFetchingFormDataFailed,
  $isEditingManagingFirmUserInfoRequestFailed,
} from './models';
import { usePhoneMask } from '../../addStaff/utils';
import { Loader } from '01/_components/Loader';
import { useEffect } from 'react';
import { ErrorAlert } from '01/_components/Alert';

const FormContainer = styled.div`
  max-width: 480px;
  padding-bottom: 20px;

  .ant-form-item {
    margin: 0 !important;
  }
`;

const FormButtonsWrap = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row-reverse;
`;

interface EditManagingFirmUserPageUrlParams {
  id: string;
}

const useRedirectAfterSuccessRequest = (
  isSuccessUpdated: boolean | null,
  path: string
) => {
  const history = useHistory();
  useEffect(() => {
    if (isSuccessUpdated) {
      history.push(path);
      resetEditManagingUserRequest();
    }
  }, [isSuccessUpdated]);
};

export const EditManagingFirmUserPage = () => {
  const params = useParams<EditManagingFirmUserPageUrlParams>();
  const userId = Number(params.id);
  const history = useHistory();

  const isSuccessUpdated = useStore($isUpdateManagingFirmUserSuccess);

  const competences = useStore($competencesCatalog);
  const userRoles = useStore($userRoles);

  const pendingFetchRequest = useStore($isFormDataLoading);
  const pendingEditRequest = useStore(editManagingUserInfoFx.pending);
  const isFailedFetchFormData = useStore($isFetchingFormDataFailed);
  const isFailedEditUserInfo = useStore(
    $isEditingManagingFirmUserInfoRequestFailed
  );

  const { fields, submit } = useForm(editManagingUserInfoForm);

  const onSubmit = () => submit();
  const onCancel = () => history.push('/companyProfile/staff');

  const phoneMask = usePhoneMask();

  const multipleSelectionCompetences = competences?.map((elem) => ({
    label: '',
    value: elem.id,
  }));

  const multipleSelectionUserRoles = userRoles?.map((elem) => ({
    label: elem.value,
    value: elem.key,
  }));

  useRedirectAfterSuccessRequest(isSuccessUpdated, '/companyProfile/staff');

  const form = (
    <FormContainer>
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
          name="cellphone"
          type="text"
          value={phoneMask.maskValue(fields.cellphone.value)}
          onChange={(e: { target: { value: string } }) =>
            fields.cellphone.onChange(phoneMask.unmaskedValue(e.target.value))
          }
        />
        <ErrorMessage>
          {fields.cellphone.errorText({
            required: 'Это поле обязательное',
            phone: 'Введите корректный номер телефона',
          })}
        </ErrorMessage>
      </Form.Item>
      <Form.Item label="Роль в системе">
        <MultiSelectTT
          mode="multiple"
          value={fields.roleTypes.value}
          options={multipleSelectionUserRoles}
          onChange={fields.roleTypes.onChange}
        />
        <ErrorMessage>
          {fields.roleTypes.errorText({
            required: 'Выберите роль',
          })}
        </ErrorMessage>
      </Form.Item>
      <Form.Item label="Компетенции">
        <MultiSelectTT
          mode="multiple"
          value={fields.firmCompetenceIds.value}
          options={multipleSelectionCompetences}
          onChange={fields.firmCompetenceIds.onChange as any}
        />
      </Form.Item>
      <FormButtonsWrap>
        <ButtonTT color="blue" onClick={onSubmit} disabled={pendingEditRequest}>
          {pendingEditRequest ? <Loader show /> : 'Сохранить'}
        </ButtonTT>
        <ButtonTT
          color="white"
          style={{ marginRight: '15px' }}
          onClick={onCancel}
        >
          Отмена
        </ButtonTT>
      </FormButtonsWrap>
    </FormContainer>
  );

  return (
    <>
      <CompetencesGate />
      <UserRolesGate />
      <ManagingFirmUserGate id={userId} />
      <EditManagingFirmUserGate />
      <GoBack/>
      <Header>Информация о сотруднике. Редактирование </Header>
      <ErrorAlert
        show={isFailedFetchFormData}
        message="Не удалось загрузить данные"
      >
        <ErrorAlert
          show={isFailedEditUserInfo}
          message="Не удалось сохранить данные"
        />
        {pendingFetchRequest ? (
          <div>
            <Loader show />
          </div>
        ) : (
          form
        )}
      </ErrorAlert>
    </>
  );
};
