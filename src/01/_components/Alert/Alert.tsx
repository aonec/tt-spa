import { Alert } from 'antd';
import React from 'react';

interface Props {
  show: boolean;
  message?: string | null;
}

export const ErrorAlert: React.FC<Props> = ({ show, message, children }) => {
  const description = `${
    message ? message + '.' : ''
  } Пожалуйста, обновите страницу или повторите попытку позже.`;

  return show ? (
    <Alert
      message="Ошибка"
      description={description}
      type="error"
      showIcon
      closable
      style={{ marginBottom: 24 }}
    />
  ) : (
    <>{children}</>
  );
};
