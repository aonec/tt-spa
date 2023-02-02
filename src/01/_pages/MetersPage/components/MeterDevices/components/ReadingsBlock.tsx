import React, { MutableRefObject, useEffect } from 'react';

import { Input, Tooltip } from 'antd';
import styled from 'styled-components';
import { useSwitchOnInputs } from '01/hooks/useSwitchInputsOnEnter';
import { EIndividualDeviceReadingsSource } from 'myApi';
import {
  getSourceIcon,
  getSourceName,
} from '01/features/readings/displayReadingHistory/components/SourceIcon';
import { Flex } from '01/shared/ui/Layout/Flex';
import { RequestStatusShared } from '01/features/readings/displayReadingHistory/hooks/useReadingValues';

const ReadingLineStyled = styled.div`
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

interface DeviceRatesVerticalProps {
  index: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number;
  readingsBlocked?: boolean;
  resource: string;
  operatorCabinet?: boolean;
  houseReadings?: boolean;
  isDisabled?: boolean | undefined;
  textInput?: MutableRefObject<Input | null>;
  isCurrent?: boolean;
  lineIndex?: number;
  source?: EIndividualDeviceReadingsSource;
  user?: any;
  closed?: boolean;
  status?: RequestStatusShared;
}

const InputSC = styled(Input)`
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

  .ant-input {
    transform: translateX(-5px);
    padding-left: 7px !important;
    border-radius: 5px;
    background-color: ${({ status }: { status?: RequestStatusShared }) => {
      if (!status) return 'none';

      const color = getColorByRequestStatus(status);

      return color ? `${color}40` : 'none';
    }};
  }
`;

export function getColorByRequestStatus(status: RequestStatusShared) {
  return status
    ? status === 'pending'
      ? '#ffd476'
      : status === 'done'
      ? '#0ddf53'
      : status === 'failed'
      ? '#FF0021'
      : `#eeeeee`
    : null;
}

const ReadingsBlock: React.FC<DeviceRatesVerticalProps> = ({
  index,
  onChange,
  value,
  readingsBlocked = false,
  isDisabled,
  isCurrent,
  lineIndex,
  source,
  user,
  closed,
  status,
}) => {
  const onFocusHandler = (e: any) => {
    e.target.select();

    if (Number(e.target.value) === 0) {
      onChange && onChange(e);
    }
  };

  const { onKeyDown, onKeyDownPrevious } = useSwitchOnInputs();

  const sourceIcon = source ? (
    <Flex style={{ marginLeft: 7, marginRight: 2 }}>
      {getSourceIcon(source)}
    </Flex>
  ) : null;

  const dataString = closed
    ? ''
    : typeof isCurrent === 'boolean'
    ? isCurrent
      ? 'current'
      : 'previous'
    : 'none';

  useEffect(() => {
    if (lineIndex === 0 && isCurrent) {
      const inputList: NodeListOf<HTMLInputElement> = document.querySelectorAll(
        `[data-reading-input="current"]`,
      );

      const node = inputList[lineIndex];

      if (!node) return;

      const neededInputNode: any = node?.getElementsByClassName('ant-input')[0];

      neededInputNode?.focus();
    }
  }, []);

  return (
    <ReadingLineStyled
      onKeyDown={
        isCurrent
          ? (e) => typeof lineIndex === 'number' && onKeyDown(e, lineIndex)
          : onKeyDownPrevious
      }
      {...(!closed && dataString ? { 'data-reading-input': dataString } : {})}
    >
      <InputSC
        status={status}
        suffix={
          <div style={{ marginLeft: -5 }}>
            {sourceIcon && (
              <Tooltip title={source ? getSourceName(source, user?.name) : ''}>
                {sourceIcon}
              </Tooltip>
            )}
          </div>
        }
        placeholder={`Т${index + 1}`}
        disabled={readingsBlocked || isDisabled || closed}
        type="number"
        value={value}
        onFocus={onFocusHandler}
        onChange={onChange}
        tabIndex={index + 1}
        step="0.01"
      />
    </ReadingLineStyled>
  );
};

export default ReadingsBlock;
