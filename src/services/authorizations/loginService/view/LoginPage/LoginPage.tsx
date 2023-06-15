import React, { FC } from 'react';
import { LoginPageProps } from './LoginPage.types';
import {
  ButtonDevSettings,
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
} from './LoginPage.styled';
import { ReactComponent as Emblem } from './assets/emblem.svg';
import { ReactComponent as LoginPageBackground } from './assets/loginPageBackground.svg';
import { Input } from 'ui-kit/Input';
import { DevSettingsModal } from 'services/developmentSettings/developmentSettings.container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { fromEnter } from 'ui-kit/shared_components/DatePickerNative';
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';

export const LoginPage: FC<LoginPageProps> = ({
  isDevMode,
  handlePostLogin,
  isLoading,
  openDevSettingsModal,
}) => {
  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object().shape({
      email: yup.string().required('Это поле обязательно'),
      password: yup.string().required('Это поле обязательно'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (data) => {
      const { email, password } = data;
      const trimmedEmail = email.trim();

      handlePostLogin({
        email: trimmedEmail,
        password,
      });
    },
  });

  const next = useSwitchInputOnEnter('login', true);

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
        <Title>Вход в систему</Title>
        <Form>
          <div>
            <Label>Электронная почта</Label>
            <Input
              autoFocus
              placeholder="Введите email"
              type="email"
              readOnly={isLoading}
              value={values.email}
              onChange={(e) => {
                setFieldValue('email', e.target.value);
              }}
              onKeyDown={fromEnter(() => next(0))}
              data-reading-input="login"
            />
            <ErrorMessage>{errors.email}</ErrorMessage>
          </div>

          <div>
            <Label>Пароль</Label>
            <InputPassword
              name="password"
              placeholder="Введите пароль"
              readOnly={isLoading}
              value={values.password}
              onChange={(event) => {
                setFieldValue('password', event.target.value);
              }}
              onKeyDown={fromEnter(handleSubmit)}
              data-reading-input="login"
            />
            <ErrorMessage>{errors.password}</ErrorMessage>
          </div>

          <ButtonLogin
            floating
            isLoading={isLoading}
            onClick={() => handleSubmit()}
          >
            Вход в систему
          </ButtonLogin>
        </Form>
        {isDevMode && (
          <>
            <DevSettingsModal />
            <ButtonDevSettings onClick={openDevSettingsModal}>
              Development settings
            </ButtonDevSettings>
          </>
        )}
      </RightBlockWrapper>
    </PageWrapper>
  );
};
