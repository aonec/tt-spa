import React from 'react';
import { Meta } from '@storybook/react';
import { Button } from '.';
import { SettingsIcon } from 'ui-kit/icons';

export default {
  title: 'Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    floating: {
      description: 'Устанавливает width = 100%',
    },
    size: {
      defaultValue: 'middle',
    },
    type: {
      defaultValue: 'primary',
    },
  },
} as Meta<typeof Button>;

export const All = () => (
  <div style={{ display: 'flex', gap: 20, padding: 32 }}>
    <Button>Primary</Button>
    <Button type="danger">Danger</Button>
    <Button type="ghost">Ghost</Button>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 20, padding: 32 }}>
    <Button size="s">small</Button>
    <Button>middle</Button>
  </div>
);

export const Loading = () => (
  <div style={{ display: 'flex', gap: 20, padding: 32 }}>
    <Button isLoading={true}>Primary</Button>
    <Button type="danger" isLoading={true}>
      Danger
    </Button>
    <Button type="ghost" isLoading={true}>
      Ghost
    </Button>
  </div>
);

export const WithIcon = () => (
  <Button size="s" icon={<SettingsIcon />}>
    Reset
  </Button>
);
