import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ActionButton } from '.';
import {
  ButtonsWrapper,
  HeatIconSC,
  TimerIconSC,
  UploadIconSC,
} from './ActionButton.styled.stories';

export default {
  title: 'ActionButton',
  component: ActionButton,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof ActionButton>;

export const Alone: ComponentStory<typeof ActionButton> = (args) => (
  <div style={{ width: 300 }}>
    <ActionButton
      {...args}
      onClick={() => void null}
      icon={<UploadIconSC />}
      text="Text"
    />
  </div>
);

export const Choose = () => {
  const [activeButton, setActiveButton] = useState(1);

  return (
    <ButtonsWrapper>
      <ActionButton
        onClick={() => setActiveButton(1)}
        active={activeButton === 1}
        icon={<TimerIconSC />}
        text="Временное отключение"
      />
      <ActionButton
        onClick={() => setActiveButton(2)}
        active={activeButton === 2}
        icon={<HeatIconSC />}
        text="Межотопительный сезон"
      />
    </ButtonsWrapper>
  );
};
