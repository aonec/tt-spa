import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Popover } from 'antd';
import styled from 'styled-components';
import React from 'react';
import {
  ActiveFiltersIcon,
  FilterIcon,
  FilterIconBlue,
  FilterIconTransparent,
} from 'ui-kit/icons';
import { Loader } from 'ui-kit/Loader';
import { StyledSquareButton } from './FilterButton.styled';

interface Props {
  onClear?(): void;
  active?: boolean;
  allowClear?: boolean;
}

export const FilterButton: React.FC<Props> = ({
  onClear,
  active,
  children,
  allowClear,
}) => {
  return (
    <Popover
      placement="bottomRight"
      content={
        <div>
          <div>{children}</div>
          {allowClear && (
            <>
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
            </>
          )}
        </div>
      }
    >
      <div style={{ cursor: 'pointer' }}>
        {active ? <FilterIconBlue /> : <FilterIcon />}
      </div>
    </Popover>
  );
};

export const FilterButtonForMap = styled(
  ({
    onClick,
    isLoading,
    isActiveFilters,
  }: {
    onClick?: () => void;
    isLoading?: boolean;
    isActiveFilters?: boolean;
  }) => (
    <StyledSquareButton onClick={onClick}>
      <div>
        <Loader show={isLoading} />
        {!isLoading &&
          (isActiveFilters ? <ActiveFiltersIcon /> : <FilterIconTransparent />)}
      </div>
    </StyledSquareButton>
  ),
)``;
