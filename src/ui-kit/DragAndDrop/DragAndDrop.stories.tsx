import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DragAndDrop } from './DragAndDrop';

const meta: Meta<typeof DragAndDrop> = {
  title: 'DragAndDrop',
  component: DragAndDrop,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview: StoryObj<typeof DragAndDrop> = {
  render: (args) => (
    <div style={{ width: '800px', display: 'flex', justifyContent: 'center' }}>
      <DragAndDrop {...args} fileHandler={() => {}} />
    </div>
  ),
};
