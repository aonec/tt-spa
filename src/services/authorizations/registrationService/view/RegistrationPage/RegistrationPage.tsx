import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import queryString from 'query-string';
import { AccessDeniedPage } from 'services/authorizations/AccessDeniedPage';
import {
  ButtonLogin,
  Form,
  InputPassword,
  Label,
  LeftBlockWrapper,
  Logo,
  PageWrapper,
  RightBlockWrapper,
  Title,
  TopHeader,
} from './RegistrationPage.styled';
import { RegistrationPageProps } from './RegistrationPage.types';
import Emblem from '../../../loginService/view/LoginPage/assets/emblem.svg?react';
import LoginPageBackground from '../../../loginService/view/LoginPage/assets/loginPageBackground.svg?react';
import { ErrorMessage } from 'ui-kit/ErrorMessage';

export const RegistrationPage: FC<RegistrationPageProps> = ({
  handleConfirmRegistration,
  isLoading,
}) => {
  const parsedSearch = queryString.parse(window.location.search);
  const token = parsedSearch.token;

  const { handleSubmit, values, errors, setFieldValue } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Введите пароль'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .required('Подтвердите пароль'),
    }),
    validateOnChange: false,
    onSubmit: (data) => {
      if (!token) {
        return;
      }
      handleConfirmRegistration({
        password: data.password,
        token: typeof token === 'string' ? token : token[0] ?? '',
      });
    },
  });

  if (!token) {
    return <AccessDeniedPage />;
  }

  return (
    <PageWrapper>
      <LeftBlockWrapper>
        <TopHeader>
          <Emblem />
          <Logo>TT Management</Logo>
        </TopHeader>
        <LoginPageBackground />
      </LeftBlockWrapper>
      <RightBlockWrapper>
        <Title>Введите пароль для входа в систему</Title>
        <Form>
          <div>
            <Label>Пароль</Label>
            <InputPassword
              autoFocus
              placeholder="Пароль"
              type="password"
              readOnly={isLoading}
              value={values.password}
              onChange={(e) => {
                setFieldValue('password', e.target.value);
              }}
            />
            <ErrorMessage>{errors.password}</ErrorMessage>
          </div>

          <div>
            <Label>Повторите пароль</Label>
            <InputPassword
              name="confirmPassword"
              placeholder="Повторите пароль"
              readOnly={isLoading}
              value={values.confirmPassword}
              onChange={(event) => {
                if (
                  (event.nativeEvent as unknown as { data: string }).data ===
                  ' '
                )
                  return;
                setFieldValue('confirmPassword', event.target.value);
              }}
            />
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          </div>

          <ButtonLogin
            floating
            disabled={isLoading}
            onClick={() => handleSubmit()}
            isLoading={isLoading}
          >
            Вход в систему
          </ButtonLogin>
        </Form>
      </RightBlockWrapper>
    </PageWrapper>
  );
};
