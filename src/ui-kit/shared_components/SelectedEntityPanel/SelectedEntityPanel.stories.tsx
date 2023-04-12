import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { SelectedEntityPanel } from '.';
import { CalculatorIcon } from 'ui-kit/icons';
import {
  CalculatorModel,
  CalculatorSerialNumber,
  Wrapper,
} from './SelectedEntityPanel.styled.stories';

export default {
  title: 'SelectedEntityPanel',
  component: SelectedEntityPanel,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof SelectedEntityPanel>;

export const Overview = () => (
  <Wrapper>
    <SelectedEntityPanel onRemove={() => {}} onEdit={() => {}}>
      <CalculatorIcon />
      <CalculatorSerialNumber>72371</CalculatorSerialNumber>
      <CalculatorModel>( ВКТ-7 )</CalculatorModel>
    </SelectedEntityPanel>
  </Wrapper>
);
