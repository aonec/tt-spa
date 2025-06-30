import React, { ChangeEvent, FC, useCallback, useMemo } from 'react';
import { Props } from './NewTemperatureRowForm.types';
import {
  NewLineCiolumnWrapper,
  NewLineWrapper,
  PlusIconSC,
} from '../TemperatureGraph.styled';
import { Input } from 'ui-kit/Input';
import { useFormik } from 'formik';
import { TemperatureNormativeRowUpdate } from 'api/types';
import { Button } from 'ui-kit/Button';
import { TrashFill } from 'react-bootstrap-icons';
import { validationSchema } from './NewTemperatureRowForm.constants';
import {
  ButtonsWrapper,
  ErrorMessage,
  FieldWrapper,
} from './NewTemperatureRowForm.styled';

export const NewTemperatureRowForm: FC<Props> = ({
  temp,
  onCancel,
  handleCreateRow,
}) => {
  const {
    values: createNewRowValues,
    handleChange,
    handleSubmit,
    errors,
  } = useFormik<Partial<TemperatureNormativeRowUpdate>>({
    initialValues: {
      outdoorTemperature: undefined,
      dayFeedFlowTemperature: undefined,
      nightFeedFlowTemperature: undefined,
      dayFeedBackFlowTemperature: undefined,
      nightFeedBackFlowTemperature: undefined,
      heatFeedFlowTemperature: undefined,
    },
    onSubmit: (values) => {
      handleCreateRow(values as TemperatureNormativeRowUpdate);
    },
    validationSchema,
  });

  const handleNewRowChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleChange(e);
    },
    [handleChange],
  );

  const isExistValue = useMemo(
    () => Object.values(createNewRowValues).find((value) => Boolean(value)),
    [createNewRowValues],
  );

  const checkError = useCallback(
    (name: keyof typeof createNewRowValues) => {
      const value = createNewRowValues[name];

      if (value === undefined) return;

      return errors[name];
    },
    [createNewRowValues, errors],
  );

  return (
    <NewLineWrapper temp={temp}>
      <FieldWrapper>
        <Input
          placeholder="Т наружного воздуха"
          small
          value={createNewRowValues.outdoorTemperature}
          name="outdoorTemperature"
          type="number"
          onChange={handleNewRowChange}
        />
        <ErrorMessage>{checkError('outdoorTemperature')}</ErrorMessage>
      </FieldWrapper>
      <NewLineCiolumnWrapper>
        <FieldWrapper>
          <Input
            placeholder="День"
            small
            type="number"
            value={createNewRowValues.dayFeedFlowTemperature}
            name="dayFeedFlowTemperature"
            onChange={handleNewRowChange}
          />
          <ErrorMessage>{checkError('dayFeedFlowTemperature')}</ErrorMessage>
        </FieldWrapper>
        <FieldWrapper>
          <Input
            placeholder="Ночь"
            small
            type="number"
            value={createNewRowValues.nightFeedFlowTemperature}
            name="nightFeedFlowTemperature"
            onChange={handleNewRowChange}
          />
          <ErrorMessage>{checkError('nightFeedFlowTemperature')}</ErrorMessage>
        </FieldWrapper>
      </NewLineCiolumnWrapper>
      <FieldWrapper>
        <Input
          placeholder="Т подающая"
          small
          type="number"
          value={createNewRowValues.heatFeedFlowTemperature}
          name="heatFeedFlowTemperature"
          onChange={handleNewRowChange}
        />
        <ErrorMessage>{checkError('heatFeedFlowTemperature')}</ErrorMessage>
      </FieldWrapper>
      <NewLineCiolumnWrapper>
        <FieldWrapper>
          <Input
            placeholder="День"
            small
            type="number"
            value={createNewRowValues.dayFeedBackFlowTemperature}
            name="dayFeedBackFlowTemperature"
            onChange={handleNewRowChange}
          />
          <ErrorMessage>
            {checkError('dayFeedBackFlowTemperature')}
          </ErrorMessage>
        </FieldWrapper>
        <FieldWrapper>
          <Input
            placeholder="Ночь"
            small
            type="number"
            value={createNewRowValues.nightFeedBackFlowTemperature}
            name="nightFeedBackFlowTemperature"
            onChange={handleNewRowChange}
          />
          <ErrorMessage>
            {checkError('nightFeedBackFlowTemperature')}
          </ErrorMessage>
        </FieldWrapper>
      </NewLineCiolumnWrapper>
      <ButtonsWrapper>
        {isExistValue && (
          <Button
            icon={<PlusIconSC />}
            size="s"
            onClick={() => handleSubmit()}
          />
        )}
        <Button
          type="danger"
          onClick={onCancel}
          icon={<TrashFill />}
          size="s"
        />
      </ButtonsWrapper>
    </NewLineWrapper>
  );
};
