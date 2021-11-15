import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Input } from 'antd';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { RequestStatusShared } from '../hooks/useReadingValues';

interface Props {
  values: (string | null)[];
  suffix?: string | null;
  editable?: boolean;
  onChange?(value: string, index: number): void;
  onBlur?(): void;
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
  } = props;

  const wrapRef = useRef<any>();

  const onChangeHandeler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();

    onChange && onChange(e.target.value, index);
  };

  const onBlurHandler = onBlur;

  const onKeyHandler = (e: any) => {
    e.key === 'Enter' && e.target.blur();
  };

  const renderField = (
    value: string | null,
    index: number,
    isOnlyOne?: boolean
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
        isOnlyOne={isOnlyOne || values.length === 1}
        status={status!}
      >
        <EditableField
          type="number"
          disabled={!editable}
          className={`history-reading-field`}
          value={String(value)}
          suffix={globalSuffix}
          prefix={<Prefix>{prefix}</Prefix>}
          onChange={(e) => onChangeHandeler(e, index + 1)}
        />
      </EditableFieldWrap>
    );
  };

  if (!editable)
    return (
      <FieldsWrap style={style} removed={removed}>
        {values.map((elem, index) => renderField(elem, index, false))}
      </FieldsWrap>
    );

  return (
    <FieldsWrap onBlur={onBlurHandler} style={style}>
      {values.length === 3 ? (
        <>
          <div>
            {[values[0], values[1]].map((elem, index) =>
              renderField(elem, index, false)
            )}
          </div>
          <Space h={6} />
          <div>{renderField(values[2], 2, true)}</div>
        </>
      ) : (
        values.map((elem, index) => renderField(elem, index, false))
      )}
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

const ValueLine = styled(Flex)`
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
