import { Collapse, DatePicker, Divider, Input, Select } from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
import React from 'react';
import moment from 'moment';
import { ElectricPhasesProps } from './Phases.types';
import {
  CollapseSC,
  FormItem,
  GovernmentCheckingContainer,
  InputSC,
  PlombsContainer,
  StyledContainerFourItemsEqual,
  StyledContainerThreeItemUnequal,
  StyledContinerMainRows,
  StyledSectionHeader,
} from './Phases.styled';

const { Panel } = Collapse;
const { Option } = Select;

export const ElectricityPhases: React.FC<ElectricPhasesProps> = ({
  phasesStatus,
  amountOfPhases,
  setFieldValue,
  values,
}) => {
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
        {i === 1 ? `${i} год` : i < 5 ? `${i} года` : `${i} лет`}
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
                // value={`${phase}.`}
                placeholder="Выберите модель"
                style={{ width: '100%' }}
                onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(`${phase}.`, e.target.value);
                }}
              />
            </FormItem>
            <FormItem>
              <label>Серийной номер: </label>
              <Input
                // value={`${phase}.`}
                placeholder="Выберите номер"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(`${phase}.`, e.target.value);
                }}
              />
            </FormItem>
            <FormItem>
              <label>Год выпуска: </label>
              <DatePicker
              style={{height: '32px'}}
                picker="year"
                suffixIcon={<CheckOutlined />}
                placeholder="Выберите год"
                onChange={(value): void => {
                  setFieldValue(`${phase}.`, moment(value).format('YYYY'));
                }}
              />
            </FormItem>
          </StyledContainerThreeItemUnequal>
          <StyledContainerThreeItemUnequal>
            <FormItem>
              <label>Номинал: </label>
              <InputSC
                // value={`${phase}.`}
                style={{ width: '100%' }}
                placeholder="Номинал"
                status={
                  Boolean(values?.match(/^\d+(\/\d+)$/)?.length) //specify values.
                    ? true
                    : false
                }
                onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(`${phase}.`, e.target.value);
                }}
              />
            </FormItem>
            <FormItem>
              <label>Коэффициент: </label>
              <Input
                // value={`${phase}.`}
                placeholder="Коэффициент"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(`${phase}.`, e.target.value);
                }}
              />
            </FormItem>
          </StyledContainerThreeItemUnequal>
          <StyledContainerThreeItemUnequal>
            <FormItem>
              <label>Дата установки прибора: </label>
              <DatePicker
              style={{height: '32px'}}
                format={'DD.MM.YYYY'}
                onChange={(value): void => {
                  setFieldValue(
                    `${phase}.`,
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
              style={{height: '32px'}}
                picker="year"
                placeholder="Год посл. поверки "
                onChange={(value): void => {
                  setFieldValue(`${phase}.`, moment(value).format('YYYY'));
                }}
              />
            </FormItem>
            <FormItem>
              <label>Год след. поверки: </label>
              <DatePicker
              style={{height: '32px'}}
                picker="year"
                placeholder="Год след. поверки "
                onChange={(value): void => {
                  setFieldValue(`${phase}.`, moment(value).format('YYYY'));
                }}
              />
            </FormItem>
            <FormItem>
              <label>Квартал: </label>
              <Select
              style={{height: '32px'}}
                placeholder="Квартал"
                // value={`${phase}.`}
                onChange={(value: string): void => {
                  setFieldValue(`${phase}.`, moment(value).format('YYYY'));
                }}
              >
                {Blocks}
              </Select>
            </FormItem>
            <FormItem>
              <label>Интервал: </label>
              <Select
              style={{height: '32px'}}
                placeholder="Интервал"
                // value={`${phase}.`}
                onChange={(value: string): void => {
                  setFieldValue(`${phase}.`, moment(value).format('YYYY'));
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
              // value={`${phase}.`}
              placeholder="Выберите номер"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue(`${phase}.`, e.target.value);
              }}
            />
          </FormItem>
          <FormItem>
            <label>Дата установки пломбы: </label>
            <DatePicker
              style={{height: '32px'}}
              format={'DD.MM.YYYY'}
              onChange={(value): void => {
                setFieldValue(`${phase}.`, moment(value).format('MM-DD-YYYY'));
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
    <>
    <Divider />
    <CollapseSC
      // defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <DownOutlined rotate={isActive ? 180 : 0} />
      )}
      accordion
    >
      <Panel header="Фаза А" key="1" extra={genExtra(phasesStatus.first)}>
        {Form('a')}
      </Panel>
      {amountOfPhases !== 1 && (
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
    </>
  );
};

// usage

// let status = {
//     first: true,
//     second: false,
//     third: true,
//   };

{
  /* <ElectricityPhases
        setFieldValue={setFeildValues}
        values={{...}}
        phasesStatus={status}
        amountOfPhases={ 3 | 1}
    /> */
}
