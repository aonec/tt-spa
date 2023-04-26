import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { ContextMenuButton } from '.';
import { ContextMenuButtonColor } from './ContextMenuButton.types';

export default {
  title: 'ContextMenuButton',
  component: ContextMenuButton,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof ContextMenuButton>;

export const Overview = () => (
  <ContextMenuButton
    size="small"
    menuButtons={[
      {
        title: 'Редактировать информацию о подрядчике',
        onClick: () => void null,
      },
      {
        title: 'Удалить подрячика',
        onClick: () => void null,
        color: ContextMenuButtonColor.danger,
      },
    ]}
  />
);
