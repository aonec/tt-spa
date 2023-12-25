import React from 'react';
import { Meta } from '@storybook/react';
import { SelectedEntityPanel } from '.';
import { CalculatorIcon } from 'ui-kit/icons';
import {
  CalculatorModel,
  CalculatorSerialNumber,
  Wrapper,
} from './SelectedEntityPanel.stories.styled';

export default {
  title: 'SelectedEntityPanel',
  component: SelectedEntityPanel,
  parameters: { layout: 'centered' },
} as Meta<typeof SelectedEntityPanel>;

export const Overview = () => (
  <Wrapper>
    <SelectedEntityPanel onRemove={() => {}} onEdit={() => {}}>
      <CalculatorIcon />
      <CalculatorSerialNumber>72371</CalculatorSerialNumber>
      <CalculatorModel>( ВКТ-7 )</CalculatorModel>
    </SelectedEntityPanel>
  </Wrapper>
);
