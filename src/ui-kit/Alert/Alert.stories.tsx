import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Alert } from '.';
import { AlertIconType, AlertType } from './Alert.types';

const meta: ComponentMeta<typeof Alert> = {
  title: 'Alert',
  component: Alert,
  parameters: { layout: 'centered' },
};

export default meta;

export const Info = () => (
  <Alert icon={AlertIconType.info} type={AlertType.default}>
    Выходит срок поверки у прибора
  </Alert>
);

export const Incorrect = () => (
  <Alert icon={AlertIconType.incorrect} type={AlertType.danger}>
    Данные с вычислителя не обрабатываются, так как узел не соответствует
    выбранной конфигурации.
  </Alert>
);

export const Stop = () => (
  <Alert icon={AlertIconType.stop} type={AlertType.danger}>
    На объекте отключение ресурса
  </Alert>
);

export const Warning = () => (
  <Alert icon={AlertIconType.warning} type={AlertType.danger}>
    По данной квартире есть незакрытая задача. Возможность вводить показания
    появится после закрытия задачи.
  </Alert>
);
