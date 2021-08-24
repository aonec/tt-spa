import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Input } from 'antd';
import { IndividualDeviceReadingsCreateRequest } from 'myApi';
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
}

export const RenderReadingFields: React.FC<Props> = (props) => {
  const {
    values,
    editable,
    onChange,
    suffix: globalSuffix,
    onBlur,
    status,
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
    elem: string | null,
    index: number,
    isOnlyOne?: boolean
  ) => {
    const value = Number(elem?.split(' ')[0] || 0);
    const suffix = globalSuffix || elem?.split(' ')[1];

    if (!editable)
      return <ValueLine>{value ? `${value} ${suffix}` : ''}</ValueLine>;

    const prefix = `T${index + 1}`;

    return (
      <EditableFieldWrap
        ref={wrapRef}
        onKeyDown={onKeyHandler}
        isOnlyOne={isOnlyOne || values.length === 1}
        status={status!}
        onBlur={onBlurHandler}
      >
        <EditableField
          onWheel={(e) => e.preventDefault()}
          type="number"
          disabled={!editable}
          className={`history-reading-field`}
          value={value}
          suffix={suffix}
          prefix={<Prefix>{prefix}</Prefix>}
          onChange={(e) => onChangeHandeler(e, index + 1)}
        />
      </EditableFieldWrap>
    );
  };

  if (!editable)
    return (
      <FieldsWrap>
        {values.map((elem, index) => renderField(elem, index, false))}
      </FieldsWrap>
    );

  return (
    <FieldsWrap>
      {values.length === 3 ? (
        <>
          <div>
            {[values[0], values[1]].map((elem, index) =>
              renderField(elem, index, false)
            )}
          </div>
          <Space style={{ height: 6 }} />
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
`;

const ValueLine = styled(Flex)`
  height: 30px;
`;

const EditableField = styled(Input)`
  background: white !important;
  border-color: rgba(0, 0, 0, 0);
`;

interface EditableFieldWrapProps {
  status: RequestStatusShared;
  isOnlyOne: boolean;
}

const EditableFieldWrap = styled.div`
  --border-color: ${({ status }: EditableFieldWrapProps) =>
    status === 'pending' ? '#ffd476' : `#eeeeee`};
  border: 1px solid var(--border-color);
  border-radius: 0;
  border-bottom-color: white;
  width: 145px;
  padding: -5px;

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
