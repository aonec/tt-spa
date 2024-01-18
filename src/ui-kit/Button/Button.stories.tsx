import React from 'react';
import { Meta, ComponentStory } from '@storybook/react';
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

export const Basic: ComponentStory<typeof Button> = (args) => (
  <div style={{ width: 300, display: 'flex', justifyContent: 'center' }}>
    <Button {...args} />
  </div>
);
Basic.args = { children: 'Click me' };

export const All = () => (
  <div style={{ display: 'flex', gap: 20, padding: 32 }}>
    <Button type="primary">Primary</Button>
    <Button type="danger">Danger</Button>
    <Button type="ghost">Ghost</Button>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 20, padding: 32 }}>
    <Button size="middle">middle</Button>
    <Button size="small">small</Button>
  </div>
);

export const Loading = () => (
  <div style={{ display: 'flex', gap: 20, padding: 32 }}>
    <Button type="primary" isLoading={true}>
      Primary
    </Button>
    <Button type="danger" isLoading={true}>
      Danger
    </Button>
    <Button type="ghost" isLoading={true}>
      Ghost
    </Button>
  </div>
);

export const WithIcon = () => (
  <Button size="small" icon={<SettingsIcon />}>
    Reset
  </Button>
);
