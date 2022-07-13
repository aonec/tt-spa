import { Collapse, DatePicker, Divider, Input, Select } from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import type { Moment } from 'moment';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';

const { Panel } = Collapse;
const { Option } = Select;

interface PhasesTypes {
    [key: string]: boolean
}
export interface ElectricPhasesProps {
  values: any;
  setFieldValue: (key: string, value: string) => void;
  amountOfPhases: 'OnePhase' | 'ThreePhases';
  phasesStatus: PhasesTypes;
  secondPhaseStatus?: boolean;
  thirdPhaseStatus?: boolean;
}

export const ElectricityPhases: React.FC<ElectricPhasesProps> = ({
phasesStatus,
  amountOfPhases,
  setFieldValue,
  values,
}) => {
  const Interval = '1/5';
  console.log(Boolean(Interval?.match(/^\d+(\/\d+)$/)?.length));
  const dateFormat = 'YYYY-MM-DD';

  const children: React.ReactNode[] = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option value={'s'} key={i.toString(36) + i}>
        {i.toString(36) + i}
      </Option>
    );
  }

  const Blocks: React.ReactNode[] = [];
  for (let i = 1; i < 5; i++) {
    Blocks.push(
      <Option value={i} key={i}>
        {i}
      </Option>
    );
  }

  const Intervals: React.ReactNode[] = [];
  for (let i = 1; i < 17; i++) {
    Intervals.push(
      <Option value={i} key={i}>
        {i === 1 ? `${i} год` : i < 5 ? `${i} года`: `${i} лет`}
      </Option>
    );
  }

  const Form = (phase: 'a' | 'b' | 'c') => {
    return (
      <>
        <StyledContinerMainRows>
          <StyledContainerThreeItemUnequal>
            <FormItem>
              <label>Модель прибора: </label>
              <Input
                placeholder="Выберите модель"
                style={{ width: '100%' }}
                onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(`Model.${phase}`, e.target.value);
                }}
              />
            </FormItem>
            <FormItem>
              <label>Серийной номер: </label>
              <Input
                placeholder="Выберите номер"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(`number.${phase}`, e.target.value);
                }}
              />
            </FormItem>
            <FormItem>
              <label>Год выпуска: </label>
              <DatePicker
                picker="year"
                suffixIcon={<CheckOutlined />}
                placeholder="Выберите год"
                onChange={(value): void => {
                  setFieldValue(
                    `yearOfIssue.${phase}`,
                    moment(value).format('YYYY')
                  );
                }}
              />
            </FormItem>
          </StyledContainerThreeItemUnequal>
          <StyledContainerThreeItemUnequal>
            <FormItem>
              <label>Номинал: </label>
              <InputSC
                style={{ width: '100%' }}
                placeholder="Номинал"
                status={
                  Boolean(Interval?.match(/^\d+(\/\d+)$/)?.length)
                    ? true
                    : false
                }
                onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(`Nominal.${phase}`, e.target.value);
                }}
              />
            </FormItem>
            <FormItem>
              <label>Коэффициент: </label>
              <Input
                placeholder="Коэффициент"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(`cofficient.${phase}`, e.target.value);
                }}
              />
            </FormItem>
          </StyledContainerThreeItemUnequal>
          <StyledContainerThreeItemUnequal>
            <FormItem>
              <label>Дата установки прибора: </label>
              <DatePicker
                format={'DD.MM.YYYY'}
                onChange={(value): void => {
                  setFieldValue(
                    `deviceMountingDate${phase}`,
                    moment(value).format('MM-DD-YYYY')
                  );
                }}
              />
            </FormItem>
          </StyledContainerThreeItemUnequal>
        </StyledContinerMainRows>
        <Divider />
        <GovernmentCheckingContainer>
          <StyledSectionHeader>
            Государственная поверка прибора
          </StyledSectionHeader>
          <StyledContainerFourItemsEqual>
            <FormItem>
              <label>Год посл. поверки: </label>
              <DatePicker
                picker="year"
                // suffixIcon={<CheckOutlined />}
                placeholder="Год посл. поверки "
                onChange={(value): void => {
                  setFieldValue(
                    `yearOfIssue.${phase}`,
                    moment(value).format('YYYY')
                  );
                }}
              />
            </FormItem>
            <FormItem>
              <label>Год след. поверки: </label>
              <DatePicker
                picker="year"
                placeholder="Год след. поверки "
                onChange={(value): void => {
                  setFieldValue(
                    `yearOfIssue.${phase}`,
                    moment(value).format('YYYY')
                  );
                }}
              />
            </FormItem>
            <FormItem>
              <label>Квартал: </label>
              <Select
                // suffixIcon={<CheckOutlined />}
                placeholder="Квартал"
                onChange={(value: string): void => {
                  setFieldValue(
                    `yearOfIssue.${phase}`,
                    moment(value).format('YYYY')
                  );
                }}
              >
                {Blocks}
              </Select>
            </FormItem>
            <FormItem>
              <label>Интервал: </label>
              <Select
                // suffixIcon={<CheckOutlined />}
                placeholder="Интервал"
                onChange={(value: string): void => {
                  setFieldValue(
                    `yearOfIssue.${phase}`,
                    moment(value).format('YYYY')
                  );
                }}
              >
                {Intervals}
              </Select>
            </FormItem>
          </StyledContainerFourItemsEqual>
        </GovernmentCheckingContainer>
        <Divider />
        <PlombsContainer>
          <StyledSectionHeader>Пломба</StyledSectionHeader>
          <FormItem>
            <label>Серийной номер: </label>
            <Input
              placeholder="Выберите номер"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue(`number.${phase}`, e.target.value);
              }}
            />
          </FormItem>
          <FormItem>
            <label>Серийной номер: </label>
            <Input
              placeholder="Выберите номер"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue(`number.${phase}`, e.target.value);
              }}
            />
          </FormItem>
        </PlombsContainer>
      </>
    );
  };

  const genExtra = (status: boolean) => (
    <CheckOutlined
      style={{ color: status ? 'green' : 'rgba(0, 0, 0, 0.25)' }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    />
  );

  return (
    <CollapseSC
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <DownOutlined rotate={isActive ? 180 : 0} />
      )}
      accordion
    >
      <Panel header="Фаза А" key="1" extra={genExtra(phasesStatus.first)}>
        {Form('a')}
      </Panel>
      {amountOfPhases !== 'OnePhase' && (
        <>
          <Panel header="Фаза Б" key="2" extra={genExtra(phasesStatus.second)}>
            {Form('b')}
          </Panel>
          <Panel header="Фаза В" key="3" extra={genExtra(phasesStatus.third)}>
            {Form('c')}
          </Panel>
        </>
      )}
    </CollapseSC>
  );
};

export const CollapseSC = styled(Collapse)`
  border: 1px solid #dcdee4;
  border-radius: 4px 4px 0px 0px;
  background-color: #f3f5f6;

  & .ant-collapse-item-active {
    background-color: white;
    border: 0px;
    .ant-collapse-content-active {
      border-top: unset;
    }
  }
  & .ant-collapse-item {
    border-bottom: 1px solid #dcdee4;
  }
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledContainerThreeItemUnequal = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 2fr;
  gap: 16px;
`;

export const StyledContinerMainRows = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 8px;
  max-height: 500px;
`;

export const GovernmentCheckingContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  gap: 8px;
`;

export const PlombsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 8px 3px;

  & h2 {
    grid-column: 1/3;
  }
`;

export const StyledContainerFourItemsEqual = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr;
  gap: 16px;
`;

export const InputSC = styled(Input)`
  border-color: ${({ status }: { status: boolean }) =>
    status ? 'red' : undefined};
`;

export const StyledSectionHeader = styled.h2`
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
`;
