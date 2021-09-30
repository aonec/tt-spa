import { NumberRange } from '01/shared/ui/Fields/NumberRange';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Checkbox } from 'antd';
import { useForm } from 'effector-forms/dist';
import React from 'react';
import { ChevronUp } from 'react-bootstrap-icons';
import styled from 'styled-components';
import {
  closeExpandedSearch,
  subscribersConsumptionFilterForm,
} from '../../models';

export const ExpandedSearch = () => {
  const { fields } = useForm(subscribersConsumptionFilterForm);
  console.log(fields.cold.value);
  return (
    <Wrap>
      <Flex>
        <SquareButton onClick={() => closeExpandedSearch()}>
          <ChevronUp style={{ color: 'white' }} />
        </SquareButton>
      </Flex>
      <Space />
      <div style={{ maxWidth: 550 }}>
        <Grid temp="0.4fr 1fr" gap="15px" style={{ alignItems: 'center' }}>
          <SearchPointTitle>Ресурс</SearchPointTitle>
          <SearchPointTitle>Диапазон значений</SearchPointTitle>

          <Checkbox
            checked={fields.coldOpen.value}
            onChange={(e) => fields.coldOpen.onChange(e.target.checked)}
          >
            ХВС
          </Checkbox>
          <NumberRange
            disabled={!fields.coldOpen.value}
            value={fields.cold.value}
            onChange={fields.cold.onChange}
          />

          <Checkbox
            checked={fields.heatOpen.value}
            onChange={(e) => fields.heatOpen.onChange(e.target.checked)}
          >
            ГВС
          </Checkbox>
          <NumberRange
            disabled={!fields.heatOpen.value}
            value={fields.heat.value}
            onChange={fields.heat.onChange}
          />

          <Checkbox
            checked={fields.electricityOpen.value}
            onChange={(e) => fields.electricityOpen.onChange(e.target.checked)}
          >
            Электричество
          </Checkbox>
          <NumberRange
            disabled={!fields.electricityOpen.value}
            value={fields.electricity.value}
            onChange={fields.electricity.onChange}
          />
        </Grid>
      </div>
    </Wrap>
  );
};

const SearchPointTitle = styled.div`
  color: #272f5a90;
  font-size: 14px;
  font-weight: 500;
`;

const Wrap = styled.div`
  transform: translate(-10px, -10px);
  box-shadow: 0 4px 7px #02004b1f;
  border-radius: 8px;
  padding: 10px;
`;

const SquareButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: #189ee9;
`;
