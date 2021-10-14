import { NumberRange } from '01/shared/ui/Fields/NumberRange';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Grid } from '01/shared/ui/Layout/Grid';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Checkbox } from 'antd';
import { useForm } from 'effector-forms/dist';
import React from 'react';
import { ChevronUp, X } from 'react-bootstrap-icons';
import styled from 'styled-components';
import {
  closeExpandedSearch,
  subscribersConsumptionFilterForm,
} from '../../models';
import { StyledDatePicker, StyledRangePicker } from '01/shared/ui/Fields';
import { ButtonTT } from '01/tt-components';
import moment from 'moment';

export const ExpandedSearch = () => {
  const { fields, reset } = useForm(subscribersConsumptionFilterForm);

  return (
    <Wrap>
      <div style={{ padding: 10 }}>
        <Flex>
          <SquareButton onClick={() => closeExpandedSearch()}>
            <ChevronUp style={{ color: 'white' }} />
          </SquareButton>
          <Space />
          <CancelButton onClick={() => void reset()}>
            <X style={{ fontSize: 18 }} />
            <Space w={5} />
            <div>Очистить</div>
          </CancelButton>
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
              onChange={(e) =>
                fields.electricityOpen.onChange(e.target.checked)
              }
            >
              Электричество
            </Checkbox>
            <NumberRange
              disabled={!fields.electricityOpen.value}
              value={fields.electricity.value}
              onChange={fields.electricity.onChange}
            />
          </Grid>
          <Space h={25} />
        </div>
        <Grid temp="0.7fr 0.47fr" gap="15px">
          <SearchPointTitle>Период проверки ИПУ</SearchPointTitle>
          <SearchPointTitle>
            Месяц последней передачи показаний
          </SearchPointTitle>
          <StyledRangePicker
            allowClear
            value={
              fields.individualDeviceCheckPeriod.value.from &&
              fields.individualDeviceCheckPeriod.value.to
                ? [
                    moment(
                      fields.individualDeviceCheckPeriod.value.from || undefined
                    ),
                    moment(
                      fields.individualDeviceCheckPeriod.value.to || undefined
                    ),
                  ]
                : undefined
            }
            format="DD.MM.YYYY"
            onChange={(value) => {
              fields.individualDeviceCheckPeriod.onChange(
                value
                  ? {
                      from: value[0]?.toISOString() || null,
                      to: value[1]?.toISOString() || null,
                    }
                  : { from: null, to: null }
              );
            }}
          />
          <StyledDatePicker
            allowClear
            onChange={(value) => {
              fields.lastReadingMonth.onChange(
                value ? value.month() + 1 : null
              );
            }}
            value={
              fields.lastReadingMonth.value
                ? moment(fields.lastReadingMonth.value, 'M')
                : undefined
            }
            picker="month"
            format="MMMM"
            disabledDate={(date) => date.year() !== moment().year()}
          />
        </Grid>
        <Space h={25} />
        <Checkbox
          checked={fields.excludeApartments.value}
          onChange={(e) => fields.excludeApartments.onChange(e.target.checked)}
        >
          Исключить квартиры, где проверка проводилась менее 3 месяцев назад
        </Checkbox>
      </div>
      <Footer>
        <ButtonTT color="white">Отмена</ButtonTT>
        <Space />
        <ButtonTT color="blue">Применить фильтры</ButtonTT>
      </Footer>
    </Wrap>
  );
};

const CancelButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  height: 32px;
  border: 1px solid var(--frame);
  border-radius: 4px;
  font-weight: 500;
`;

const Footer = styled.div`
  padding: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #f3f5f6;
`;

const SearchPointTitle = styled.div`
  color: #272f5a90;
  font-size: 14px;
  font-weight: 500;
`;

const Wrap = styled.div`
  transform: translate(-10px, -10px);
  box-shadow: 0 4px 7px #02004b1f;
  border-radius: 8px;
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
