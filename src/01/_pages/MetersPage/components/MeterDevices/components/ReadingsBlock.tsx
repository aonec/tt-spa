import React, { MutableRefObject } from 'react';

import { Input } from 'antd';
import styled from 'styled-components';
import { useSwitchOnInputs } from '01/hooks/useSwitchInputsOnEnter';

const ReadingLineStyled = styled.div<{
  houseReadings: boolean;
  isDisabled: boolean | undefined;
}>`
  position: relative;

  &:not(:first-child) {
    padding-top: 8px;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--frame);
    padding-bottom: 7px;
  }

  & .ant-input-affix-wrapper-disabled {
    background-color: transparent;

    input {
      color: var(--main-70) !important;
    }
  }
`;

const TarifLabel = styled.span<{ houseReadings: boolean }>`
  width: 20px;
  margin-right: 4px;
  color: rgba(39, 47, 90, 0.32);
`;

interface DeviceRatesVerticalProps {
  index: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  readingsBlocked?: boolean;
  resource: string;
  operatorCabinet?: boolean;
  houseReadings?: boolean;
  isDisabled?: boolean | undefined;
  textInput?: MutableRefObject<Input | null>;
  isCurrent?: boolean;
  lineIndex?: number;
}

const SuffixLine = styled.span`
  // position: absolute;
`;
const StyledInput = styled(Input)`
  color: var(--main-70);
  border: 0;
  border-left-width: 3px;
  padding: 0;
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  min-width: 72px;

  .ant-input .ant-input-disabled {
    color: var(--main-70) !important;
  }
`;

const ReadingsBlock: React.FC<DeviceRatesVerticalProps> = ({
  index,
  onChange,
  value,
  readingsBlocked = false,
  resource,
  houseReadings = false,
  isDisabled,
  isCurrent,
  lineIndex,
}) => {
  const onFocusHandler = (e: any) => {
    if (Number(e.target.value) === 0) {
      onChange && onChange(e);
    }
  };

  const { onKeyDown } = useSwitchOnInputs();

  return (
    <ReadingLineStyled
      houseReadings={houseReadings}
      isDisabled={isDisabled}
      data-reading-input={
        typeof isCurrent === 'boolean'
          ? isCurrent
            ? 'current'
            : 'previous'
          : 'none'
      }
      onKeyDown={(e) =>
        typeof lineIndex === 'number' && onKeyDown(e, lineIndex)
      }
    >
      <StyledInput
        prefix={
          <TarifLabel houseReadings={houseReadings}>Т{index + 1} </TarifLabel>
        }
        suffix={
          resource === 'Electricity' ? (
            <SuffixLine>кВтч</SuffixLine>
          ) : (
            <SuffixLine>м³</SuffixLine>
          )
        }
        disabled={readingsBlocked || isDisabled}
        type="number"
        value={value}
        onFocus={onFocusHandler}
        onChange={onChange}
        required
        tabIndex={index + 1}
        step="0.01"
      />
    </ReadingLineStyled>
  );
};

export default ReadingsBlock;
