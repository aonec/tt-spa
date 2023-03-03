import React from 'react';
import { Select, AutoComplete, DatePicker, Input } from 'antd';
import styled from 'styled-components';
import { ReactComponent as FilterIcon } from './icons/filter.svg';
import { Loader } from '01/components';

export const SelectSC = styled(Select)<{ isShadow?: boolean }>`
  width: 100%;

  .ant-select-selector {
    border: 1px solid lightgray;
    padding: 3px 15px;

    border-radius: 4px !important;

    border: 1px solid var(--frame);
    height: var(--h-norm);

    box-shadow: ${({ isShadow = true }) =>
      isShadow ? `0 4px 7px #02004b1f` : 'none'};

    &:hover,
    &:focus {
      border: 1px solid #1890ff;
    }

    &:focus {
      box-shadow: 0 2px 7px #188fffae;
    }
  }
`;

export const StyledAutocomplete = styled(AutoComplete)`
  width: 100%;

  .ant-select-selector {
    border: 1px solid lightgray;
    padding: 3px 15px;

    border-radius: 4px !important;

    border: 1px solid var(--frame);
    height: var(--h-norm);

    box-shadow: 0 4px 7px #02004b1f;

    &:hover,
    &:focus {
      border: 1px solid #1890ff;
    }

    &:focus {
      box-shadow: 0 2px 7px #188fffae;
    }
  }
`;

export const InputSC = styled(Input)<{ isShadow?: boolean }>`
  color: #333333;
  border: 1px solid lightgray;
  padding: 3px 15px;
  transition: 0.2s;

  &:last-child {
    margin-right: 10px;
  }

  border-radius: 4px;

  border: 1px solid var(--frame);
  height: var(--h-norm);

  box-shadow: ${({ isShadow = true }) =>
    isShadow ? '0 4px 7px #02004b1f' : 'none'};

  &:hover,
  &:focus {
    border: 1px solid #1890ff;
  }
`;

export const StyledRangePicker = styled(DatePicker.RangePicker)`
  color: #333333;
  border: 1px solid lightgray;
  padding: 3px 15px;
  transition: 0.2s;

  &:last-child {
    margin-right: 10px;
  }

  border-radius: 4px;

  border: 1px solid var(--frame);
  height: var(--h-norm);

  box-shadow: 0 4px 7px #02004b1f;

  &:hover,
  &:focus {
    border: 1px solid #1890ff;
  }

  &:focus {
    box-shadow: 0 2px 7px #188fffae;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  color: #333333;
  border: 1px solid lightgray;
  padding: 3px 15px;
  transition: 0.2s;

  &:last-child {
  }

  border-radius: 4px;

  border: 1px solid var(--frame);
  height: var(--h-norm);

  box-shadow: 0 4px 7px #02004b1f;

  &:hover,
  &:focus {
    border: 1px solid #1890ff;
  }

  &:focus {
    box-shadow: 0 2px 7px #188fffae;
  }
`;

export const StyledSquareButton = styled.div`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid lightgray;
  padding: 3px 15px;
  transition: 0.2s;

  border-radius: 4px !important;

  border: 1px solid var(--frame);
  height: var(--h-norm);

  box-shadow: 0 4px 7px #02004b1f;

  &:hover,
  &:focus {
    border: 1px solid #1890ff;
  }

  &:focus {
    box-shadow: 0 2px 7px #188fffae;
  }
`;

export const FilterButton = styled(
  ({ onClick, isLoading }: { onClick?: () => void; isLoading?: boolean }) => (
    <StyledSquareButton onClick={onClick}>
      <div>{isLoading ? <Loader show /> : <FilterIcon />}</div>
    </StyledSquareButton>
  ),
)``;
