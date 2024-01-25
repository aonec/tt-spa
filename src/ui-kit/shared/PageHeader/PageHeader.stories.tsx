import React from 'react';
import { Meta } from '@storybook/react';
import { PageHeader } from '.';
import { DeviceIcon } from 'ui-kit/icons';
import { HeaderTitleWrapper } from './PageHeader.stories.styled';

export default {
  title: 'PageHeader',
  component: PageHeader,
  parameters: { layout: 'centered' },
} as Meta<typeof PageHeader>;

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
