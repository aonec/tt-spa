import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { getFilledArray } from 'utils/getFilledArray';
import { RequestStatusShared } from './hooks/useReadingValues';

interface Props {
  values?: (string | null)[];
  noReading?: boolean;
  rateNum: number | null;
  suffix?: string | null;
  editable?: boolean;
  onChange?(value: string, index: number): void;
  onBlur?(): void;
  onEnter?(values: (number | null)[]): void;
  status?: RequestStatusShared;
  consumption?: boolean;
  style?: React.CSSProperties;
  clearValue?: boolean;
  removed?: boolean;
}

export const RenderReadingFields: React.FC<Props> = (props) => {
  const {
    values,
    editable,
    onChange,
    suffix: globalSuffix,
    onBlur,
    status,
    consumption,
    style,
    removed,
    onEnter,
    rateNum,
  } = props;

  const wrapRef = useRef<any>();

  const preparedValuesArray = useMemo(
    () =>
      getFilledArray(
        rateNum || 0,
        (index) => (values && values[index]) || null,
      ),
    [values, rateNum],
  );

  const [valuesArray, setValuesArray] = useState(
    getFilledArray(rateNum || 0, (index) => (values && values[index]) || null),
  );

  useEffect(() => setValuesArray(preparedValuesArray), [preparedValuesArray]);

  const onChangeHandeler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault();

    setValuesArray((prev) =>
      prev.map((elem, i) => (i === index ? e.target.value : elem)),
    );

    onChange && onChange(e.target.value, index + 1);
  };

  const onBlurHandler = onBlur;

  const onKeyHandler = (e: any) => {
    if (e.key === 'Enter') {
      const clearValues = valuesArray.map((value) =>
        value === null ? null : Number(value),
      );
      onEnter && onEnter(clearValues);
      e.target.blur();
    }
  };

  const renderField = (
    value: string | null,
    index: number,
    isOnlyOne?: boolean,
  ) => {
    if (!editable) {
      return (
        <ValueLine isReading={!consumption}>
          {value !== null ? `${value} ${globalSuffix}` : ''}
        </ValueLine>
      );
    }

    const prefix = `T${index + 1}`;

    return (
      <EditableFieldWrap
        ref={wrapRef}
        onKeyDown={onKeyHandler}
        isOnlyOne={isOnlyOne || values?.length === 1}
        status={status!}
      >
        <EditableField
          type="number"
          disabled={!editable}
          className={`history-reading-field`}
          value={String(value)}
          suffix={globalSuffix}
          prefix={<Prefix>{prefix}</Prefix>}
          onChange={(e) => onChangeHandeler(e, index)}
        />
      </EditableFieldWrap>
    );
  };

  if (!editable)
    return (
      <FieldsWrap style={style} removed={removed}>
        {valuesArray.map((elem, index) => renderField(elem, index, false))}
      </FieldsWrap>
    );

  return (
    <FieldsWrap onBlur={onBlurHandler} style={style}>
      {valuesArray.map((elem, index) => renderField(elem, index, false))}
    </FieldsWrap>
  );
};

const Prefix = styled.span`
  color: lightgray;
  margin-right: 5px;
`;

const FieldsWrap = styled.div`
  margin-right: 20px;
  counter-reset: section;

  ${({ removed }: { removed?: boolean }) => (removed ? 'color: red;' : '')}
`;

const ValueLine = styled.div`
  display: flex;
  align-items: center;
  height: 30px;

  ${(props: { isReading?: boolean }) =>
    props.isReading
      ? `
    &:before {
      counter-increment: section;
      content: 'T' counter(section) ' ';
      color: lightgray;
      margin-right: 10px;
    }
  padding-left: 12px;
    `
      : ''}
`;

const EditableField = styled(Input)`
  color: black;
  background: white !important;
  border-color: rgba(0, 0, 0, 0);
`;

interface EditableFieldWrapProps {
  status: RequestStatusShared;
  isOnlyOne: boolean;
}

const statusColors = {
  pending: '#ffd476',
  done: '#0ddf53',
  failed: '#FF0021',
};

const getColorByStatus = (status: RequestStatusShared) =>
  (status && statusColors[status]) || `#eeeeee`;

const EditableFieldWrap = styled.div`
  --border-color: ${({ status }: EditableFieldWrapProps) =>
    getColorByStatus(status)};
  border: 1px solid var(--border-color);
  border-radius: 0;
  border-bottom-color: white;
  width: 145px;
  padding: -5px;

  .ant-input,
  .ant-input-affix-wrapper,
  .ant-input-affix-wrapper:hover,
  .ant-input-affix-wrapper-focused {
    border: 0;
    box-shadow: 0;
  }

  ${(props: EditableFieldWrapProps) =>
    props.isOnlyOne
      ? `
      border-radius: 8px;
      .ant-input-affix-wrapper {
      border-radius: 8px;
    }`
      : `
    .ant-input-affix-wrapper {
      border-radius: 0px;
    }
    
    &:first-child {
      border-radius: 8px 8px 0 0;
      
      .ant-input-affix-wrapper {
          border-radius: 8px 8px 0 0;
        }
    }
    
    &:last-child {
        border-radius: 0 0 8px 8px;
        .ant-input-affix-wrapper {
            border-radius: 0 0 8px 8px;
        }
    }
  `}

  &:last-child {
    border-bottom-color: var(--border-color);
  }
`;
