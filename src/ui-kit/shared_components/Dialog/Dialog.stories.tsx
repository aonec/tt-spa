import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Dialog } from './Dialog';

export default {
  title: 'Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      defaultValue: 'primary',
    },
    isOpen: {
      defaultValue: true,
    },
  },
} as ComponentMeta<typeof Dialog>;

export const Primary: ComponentStory<typeof Dialog> = (args) => (
  <Dialog {...args} />
);
Primary.args = {
  title: 'Отправить отчёт на почту',
  description:
    'Объём данных слишком большой для прямого скачивания. Мы отправим вам архив с отчётом на почту, которую вы указали при регистрации',
  submitText: 'Отправить отчёт',
};

export const Danger: ComponentStory<typeof Dialog> = () => (
  <Dialog
    type="danger"
    submitText="Удалить отключение"
    title="Вы действительно хотите удалить отключение ресурса?"
    description="Если вы подтверждаете удаление, то отключение ресурса закончится на
    всех выбранных объектах автоматически после подтверждения."
    isLoading={true}
    isOpen={true}
    onCancel={() => void null}
  />
);
