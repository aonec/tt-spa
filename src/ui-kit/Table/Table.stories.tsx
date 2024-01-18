import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { CallCenterWorkingReportTable } from 'services/reportsService/reportViewService/view/ReportViewPage/ReportViewTable/EmployeeReport/CallCenterWorkingReportTable';
import { mockData } from './Table.stories.mock';

const meta: Meta<typeof Table> = {
  title: 'Table',
  component: Table,
  parameters: { layout: 'centered' },
};

export default meta;

export const Overview: StoryObj<typeof Table> = {
  render: () => (
    <div style={{ width: '1200px', display: 'flex', justifyContent: 'center' }}>
      <CallCenterWorkingReportTable
        data={{ CallCenterWorkingReport: mockData }}
      />
    </div>
  ),
};
