import React from 'react';
import { Meta } from '@storybook/react';
import { ResourceInfo } from '.';
import { EActResourceType } from 'api/types';

export default {
  title: 'ResourceInfo',
  component: ResourceInfo,
  parameters: { layout: 'centered' },
} as Meta<typeof ResourceInfo>;

export const All = () => <ResourceInfo resource={EActResourceType.All} />;

export const ColdWaterSupply = () => (
  <ResourceInfo resource={EActResourceType.ColdWaterSupply} />
);

export const HotWaterSupply = () => (
  <ResourceInfo resource={EActResourceType.HotWaterSupply} />
);

export const Electricity = () => (
  <ResourceInfo resource={EActResourceType.Electricity} />
);

export const Heat = () => <ResourceInfo resource={EActResourceType.Heat} />;
