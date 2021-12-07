import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Popover } from 'antd';
import React from 'react';
import { ReactComponent as FilterIcon } from './assets/filterIcon.svg';
import { ReactComponent as FilterIconBlue } from './assets/filterIconBlue.svg';

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
    <Popover
      placement="bottomRight"
      content={
        <div>
          <div>{children}</div>
          <div style={{ marginTop: -10 }}>
            <SpaceLine />
          </div>
          <div
            onClick={onClear}
            className="ant-btn-link"
            style={{ marginTop: -5, cursor: 'pointer' }}
          >
            Сбросить
          </div>
        </div>
      }
    >
      <div style={{ cursor: 'pointer' }}>
        {active ? <FilterIconBlue /> : <FilterIcon />}
      </div>
    </Popover>
  );
};
