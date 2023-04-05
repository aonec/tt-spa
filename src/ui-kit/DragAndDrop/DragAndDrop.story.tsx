import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DragAndDrop } from './DragAndDrop';

const meta: ComponentMeta<typeof DragAndDrop> = {
  title: 'DragAndDrop',
  component: DragAndDrop,
  parameters: { layout: 'centered' },
};

export default meta;

export const Basic: ComponentStory<typeof DragAndDrop> = (args) => (
  <div style={{ width: '800px', display: 'flex', justifyContent: 'center' }}>
    <DragAndDrop {...args} fileHandler={() => {}} />
  </div>
);
