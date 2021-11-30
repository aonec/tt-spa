import { Popover } from 'antd';
import React from 'react';
import { ReactComponent as FilterIcon } from './assets/filterIcon.svg';

interface Props {
  onClear?(): void;
  active?: boolean;
}

export const FilterButton: React.FC<Props> = ({
  onClear,
  active,
  children,
}) => {
  return (
    <Popover placement="bottomRight" content={<div>{children}</div>}>
      <FilterIcon />
    </Popover>
  );
};
