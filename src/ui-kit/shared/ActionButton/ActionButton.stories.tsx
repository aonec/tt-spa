import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { ActionButton } from '.';
import {
  ButtonsWrapper,
  HeatIconSC,
  TimerIconSC,
} from './ActionButton.stories.styled';

export default {
  title: 'ActionButton',
  component: ActionButton,
  parameters: { layout: 'centered' },
} as Meta<typeof ActionButton>;

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
