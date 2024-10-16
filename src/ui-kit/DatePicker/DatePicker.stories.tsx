import { Meta } from '@storybook/react';
import { DatePicker } from './DatePicker.styled';

const meta: Meta<typeof DatePicker> = {
  title: 'DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
};

export default meta;

export const Small = () => (
  <div
    style={{
      width: '300px',
      display: 'flex',
      justifyContent: 'center',
      height: '400px',
    }}
  >
    <DatePicker small />
  </div>
);
