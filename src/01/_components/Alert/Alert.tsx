import { Alert } from 'antd';
import React from 'react';

interface Props {
  show: boolean;
  message?: string | null;
}

export const ErrorAlert: React.FC<Props> = ({ show, message, children }) =>
  show ? (
    <Alert
      message="Ошибка"
      description={`${message}${
        message && '.'
      } Пожалуйста, обновите страницу или повторите попытку позже.`}
      type="error"
      showIcon
      closable
      style={{ marginBottom: 24 }}
    />
  ) : (
    <>{children}</>
  );
