import { Flex } from '01/shared/ui/Layout/Flex';
import { Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface RenderReadingField {
  values: (string | null)[];
  suffix?: string | null;
  editable?: boolean;
  onChange?(value: number, index: number): void;
}

export const RenderReadingFields: React.FC<RenderReadingField> = (props) => {
  const { values, editable, onChange, suffix: globalSuffix } = props;

  const renderField = (elem: string | null, index: number) => {
    const value = Number(elem?.split(' ')[0] || 0);
    const suffix = globalSuffix || elem?.split(' ')[1];

    if (!editable)
      return <ValueLine>{value ? `${value} ${suffix}` : ''}</ValueLine>;

    const prefix = `T${index + 1}`;
    return (
      <EditableField
        className={`history-reading-field-`}
        disabled={!editable}
        value={value}
        suffix={suffix}
        prefix={<Prefix>{prefix}</Prefix>}
      />
    );
  }; 

  return <FieldsWrap>{values.map(renderField)}</FieldsWrap>;
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
  border-radius: 10px;
  background: white !important;
`;

const EditableFieldWrap = styled.div`
  width: 145px;
  border-radius: 10px;
  border: 1px solid #eeeeee;
`;
