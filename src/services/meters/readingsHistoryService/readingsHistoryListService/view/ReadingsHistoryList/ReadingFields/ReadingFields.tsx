import React, { useRef, useEffect, useState, useMemo } from 'react';
import { getFilledArray } from 'utils/getFilledArray';
import {
  EditableField,
  EditableFieldWrap,
  FieldsWrap,
  Prefix,
  Suffix,
  ValueLine,
} from './ReadingFields.styled';
import { ReadingFieldsProps } from './ReadingFields.types';

export const RenderReadingFields: React.FC<ReadingFieldsProps> = (props) => {
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

  const onChangeHandler = (
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
        <Prefix>{prefix}</Prefix>
        <EditableField
          type="number"
          disabled={!editable}
          className={`history-reading-field`}
          value={value ? String(value) : undefined}
          onChange={(e) => {
            onChangeHandler(e, index);
          }}
        />
        <Suffix>{globalSuffix}</Suffix>
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
