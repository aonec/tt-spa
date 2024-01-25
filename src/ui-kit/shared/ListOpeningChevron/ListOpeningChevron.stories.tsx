import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { ListOpeningChevron } from '.';

export default {
  title: 'ListOpeningChevron',
  component: ListOpeningChevron,
  parameters: { layout: 'centered' },
} as Meta<typeof ListOpeningChevron>;

export const Overview = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ListOpeningChevron
      isOpen={isOpen}
      onClick={() => setIsOpen((prev) => !prev)}
    />
  );
};
