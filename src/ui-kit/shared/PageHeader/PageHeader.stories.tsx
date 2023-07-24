import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { PageHeader } from '.';
import { DeviceIcon } from 'ui-kit/icons';
import { HeaderTitleWrapper } from './PageHeader.styled.stories';

export default {
  title: 'PageHeader',
  component: PageHeader,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof PageHeader>;

export const Overview = () => (
  <PageHeader
    title={
      <HeaderTitleWrapper>
        <DeviceIcon />
        Отчёт по ИПУ
      </HeaderTitleWrapper>
    }
  />
);
