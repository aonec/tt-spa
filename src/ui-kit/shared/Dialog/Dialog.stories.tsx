import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';

export default {
  title: 'Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
} as Meta<typeof Dialog>;

export const Primary: StoryObj<typeof Dialog> = {
  render: (args) => <Dialog {...args} />,
  args: {
    title: 'Отправить отчёт на почту',
    description:
      'Объём данных слишком большой для прямого скачивания. Мы отправим вам архив с отчётом на почту, которую вы указали при регистрации',
    submitText: 'Отправить отчёт',
    isOpen: true,
    type: 'primary',
  },
};

export const Danger: StoryObj<typeof Dialog> = {
  render: () => (
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
  ),
};
