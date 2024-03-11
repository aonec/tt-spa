import React, { FC } from 'react';
import { Props } from './NewTemperatureRowForm.types';
import {
  NewLineCiolumnWrapper,
  NewLineWrapper,
} from '../TemperatureGraph.styled';
import { Input } from 'ui-kit/Input';
import { useFormik } from 'formik';
import { TemperatureNormativeRowUpdate } from 'api/types';
import { Button } from 'ui-kit/Button';
import { TrashFill } from 'react-bootstrap-icons';

export const NewTemperatureRowForm: FC<Props> = ({ temp }) => {
  const { values: createNewRowValues, handleChange: handleNewRowChange } =
    useFormik<Partial<TemperatureNormativeRowUpdate>>({
      initialValues: {},
      onSubmit: () => {},
    });

  function setIsNewLine(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }

  return (
    <NewLineWrapper temp={temp}>
      <Input
        placeholder="Т наружного воздуха"
        small
        value={createNewRowValues.outdoorTemperature}
        name="outdoorTemperature"
        onChange={handleNewRowChange}
      />
      <NewLineCiolumnWrapper>
        <Input
          placeholder="День"
          small
          value={createNewRowValues.dayFeedFlowTemperature}
          name="dayFeedFlowTemperature"
          onChange={handleNewRowChange}
        />
        <Input
          placeholder="Ночь"
          small
          value={createNewRowValues.nightFeedFlowTemperature}
          name="nightFeedFlowTemperature"
          onChange={handleNewRowChange}
        />
      </NewLineCiolumnWrapper>
      <Input
        placeholder="Т подающая"
        small
        value={createNewRowValues.heatFeedFlowTemperature}
        name="heatFeedFlowTemperature"
        onChange={handleNewRowChange}
      />
      <NewLineCiolumnWrapper>
        <Input
          placeholder="День"
          small
          value={createNewRowValues.dayFeedBackFlowTemperature}
          name="dayFeedBackFlowTemperature"
          onChange={handleNewRowChange}
        />
        <Input
          placeholder="Ночь"
          small
          value={createNewRowValues.nightFeedBackFlowTemperature}
          name="nightFeedBackFlowTemperature"
          onChange={handleNewRowChange}
        />
      </NewLineCiolumnWrapper>
      <Button
        type="danger"
        onClick={() => setIsNewLine(false)}
        icon={<TrashFill />}
        size="small"
      />
    </NewLineWrapper>
  );
};
