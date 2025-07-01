import React from 'react';
import { Meta } from '@storybook/react';
import { Alert } from '.';

const meta: Meta<typeof Alert> = {
  title: 'Alert',
  component: Alert,
  parameters: { layout: 'centered' },
};

export default meta;

export const Info = () => (
  <Alert icon="info">Выходит срок поверки у прибора</Alert>
);

export const Incorrect = () => (
  <Alert icon="incorrect" type="danger">
    Данные с вычислителя не обрабатываются, так как узел не соответствует
    выбранной конфигурации.
  </Alert>
);

export const Stop = () => (
  <Alert icon="stop" type="danger">
    На объекте отключение ресурса
  </Alert>
);

export const Warning = () => (
  <Alert icon="warning" type="danger">
    По данной квартире есть незакрытая задача. Возможность вводить показания
    появится после закрытия задачи.
  </Alert>
);
