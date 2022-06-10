import React, { FC } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { ConfigProvider, Form, Input, Select, Slider } from 'antd';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculators/types';
import type { RangePickerProps } from 'antd/es/date-picker';
import styles from '../SearchDevices/DeviceSearchForm.module.scss';
import { DatePicker } from 'antd';
import _ from 'lodash';
import type { Moment } from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

export const ExtendedSearchForm: FC<{
  values: CalculatorsListRequestPayload;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}> = ({ values, setFieldValue }) => {
  const marks = {
    0: '0',
    255: '255',
  };
  type RangeValue = [Moment | null, Moment | null] | null;

  const dateFormat = 'YYYY-MM-DD';
  return (
    <Form
      id="searchForm"
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      style={{ marginBottom: 20, marginTop: 10 }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '4fr 4fr 2fr 2fr',
        }}
      >
        <Form.Item name="city" style={{ marginRight: 16 }}>
          <label htmlFor="City" style={{ minWidth: 152, marginRight: 8 }}>
            Город :{' '}
          </label>
          <Input
            onChange={(value) =>
              setFieldValue("['Filter.Address.City']", value.target.value)
            }
            className={styles.input}
            value={values['Filter.Address.City']}
            placeholder="Город"
          />
        </Form.Item>

        <Form.Item name="street" style={{ marginRight: 16 }}>
          <label htmlFor="Street" style={{ minWidth: 152, marginRight: 8 }}>
            Улица :{' '}
          </label>
          <Input
            onChange={(value) =>
              setFieldValue("['Filter.Address.Street']", value.target.value)
            }
            className={styles.input}
            value={values['Filter.Address.Street']}
            placeholder="Улица"
          />
        </Form.Item>

        <Form.Item name="house" style={{ marginRight: 16 }}>
          <label htmlFor="House" style={{ minWidth: 152, marginRight: 8 }}>
            Дом :{' '}
          </label>
          <Input
            onChange={(value) =>
              setFieldValue(
                "['Filter.Address.HousingStockNumber']",
                value.target.value
              )
            }
            className={styles.input}
            value={values['Filter.Address.HousingStockNumber']}
            placeholder="Дом"
          />
        </Form.Item>

        <Form.Item name="corpus" style={{ marginRight: 16 }}>
          <label htmlFor="Corpus" style={{ minWidth: 152, marginRight: 8 }}>
            Корпус :{' '}
          </label>
          <Input
            onChange={(value) =>
              setFieldValue("['Filter.Address.Corpus']", value.target.value)
            }
            className={styles.input}
            value={values['Filter.Address.Corpus']}
            placeholder="Дом"
          />
        </Form.Item>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '4fr 4fr 4fr',
        }}
      >
        <Form.Item name="Resource" style={{ width: '100%', marginRight: 5 }}>
          <div>
            <label htmlFor="Resource" style={{ minWidth: 152, marginRight: 1 }}>
              Тип ресурса:{' '}
            </label>
            <Select
              id="Resource"
              style={{ width: '97%', marginRight: 2 }}
              placeholder="Все ресурсы"
              onChange={(value) => setFieldValue("['Filter.Resource']", value)}
            >
              <Option value="Heat">Тепло</Option>
              <Option value="HotWaterSupply">Горячая вода</Option>
              <Option value="ColdWaterSupply">Холодная</Option>
              <Option value="Electricity">Електричество</Option>
            </Select>
          </div>
        </Form.Item>

        <Form.Item name="NodeStatus" style={{ width: '100%', marginRight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label
              htmlFor="nodeStatus"
              style={{ minWidth: 152, marginRight: 1 }}
            >
              Статус Узла :{' '}
            </label>
            <Select
              id="NodeStatus"
              style={{ width: '97%', marginRight: 14 }}
              placeholder="Любой статус"
              value={values['Filter.NodeStatus']}
              onChange={(value) =>
                setFieldValue("['Filter.NodeStatus']", value)
              }
            >
              <Option value="NotRegistered">Не на коммерческом учере</Option>
              <Option value="Registered">Сдан на коммерческий учет</Option>
              <Option value="OnReview">На утверждении</Option>
              <Option value="Prepared">Подговлен к сдаче</Option>
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          name="lastCheckingDate"
          style={{ width: '100%', marginRight: 5 }}
        >
          <div>
            <label
              htmlFor="expirationDate"
              style={{ minWidth: 152, marginRight: 1 }}
            >
              Истекает дата поверки:{' '}
            </label>
            <Select
              id="expirationDate"
              style={{ width: '97%', marginRight: 2 }}
              placeholder="Все"
              onChange={(value) =>
                setFieldValue("['Filter.ExpiresCheckingDateAt']", value)
              }
            >
              <Option value="NextMonth">Ближайший месяц</Option>
              <Option value="NextTwoMonth">В следующие два месяца</Option>
              <Option value="Past">Истекла</Option>
            </Select>
          </div>
        </Form.Item>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '4fr 4fr 4fr',
        }}
      >
        <Form.Item name="deviceDiameter">
          <div>
            <label
              style={{
                width: '30%',
                minWidth: 150,
                display: 'block',
                textAlign: 'center',
                marginRight: 8,
              }}
            >
              Диаметр прибора, мм{' '}
            </label>

            <StyledSlider
              style={{ width: '90%' }}
              getTooltipPopupContainer={(triggerNode) =>
                triggerNode.parentNode as HTMLElement
              }
              defaultValue={[0, 255]}
              max={255}
              range
              marks={marks}
              onChange={(value: [number, number]) => {
                setFieldValue("['Filter.DiameterRange.From']", value[0]);
              }}
            />
          </div>
        </Form.Item>
        <Form.Item name="OrderBy">
          <div style={{ marginRight: 16 }}>
            <label htmlFor="sortBy" style={{ minWidth: 120, marginRight: 1 }}>
              Сортировать по:
            </label>
            <Select
              id="sortBy"
              placeholder='Улиц'
              onChange={(value) => setFieldValue('OrderBy', value)}
            >
              <Option value="Descending">Улице (уб.)</Option>
              <Option value="Ascending">Улице (возр.)</Option>
            </Select>
          </div>
        </Form.Item>
        <Form.Item>
          <label
            htmlFor="RangePicker"
            style={{ minWidth: 152, marginRight: 1 }}
          >
            Период действия акта допуска :{' '}
          </label>
          <ConfigProvider>
            <RangePicker
              onChange={(value: RangeValue): void => {
                setFieldValue(
                  "['Filter.CommercialDateRange.From']",
                  value?.length && value[0]?.format('DD-MM-YYYY')
                );
                setFieldValue(
                  "['Filter.CommercialDateRange.To']",
                  value?.length && value[1]?.format('DD-MM-YYYY')
                );
              }}
              size={'small'}
              format={dateFormat}
              style={{ height: '30px', width: '100%' }}
            />
          </ConfigProvider>
        </Form.Item>
      </div>
    </Form>
  );
};

const StyledSlider = styled(Slider)`
  &.ant-slider.ant-slider-with-marks {
    margin-bottom: 12px !important;
  }
`;
