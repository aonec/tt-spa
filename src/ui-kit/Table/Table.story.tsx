import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Table } from './Table';
import { CallCenterWorkingReportTable } from 'services/reportsService/reportViewService/view/ReportViewPage/ReportViewTable/EmployeeReport/CallCenterWorkingReportTable';
import { mockData } from './Table.mock.story';

const meta: ComponentMeta<typeof Table> = {
  title: 'Table',
  component: Table,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview: ComponentStory<typeof Table> = () => (
  <div style={{ width: '1200px', display: 'flex', justifyContent: 'center' }}>
    <CallCenterWorkingReportTable
      data={{ CallCenterWorkingReport: mockData }}
    />
  </div>
);
