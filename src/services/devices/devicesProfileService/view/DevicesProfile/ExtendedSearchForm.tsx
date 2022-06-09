import React, { FC } from 'react';
import styled from 'styled-components';
import { Form, Input, Select, Slider } from 'antd';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculators/types';
import { Icon } from '01/components';
import styles from '../SearchDevices/DeviceSearchForm.module.scss';
import _ from 'lodash';
const { Option } = Select;

export const ExtendedSearchForm: FC<{
  values: CalculatorsListRequestPayload;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}> = ({ values, setFieldValue }) => {
  const marks = {
    0: '0',
    255: '255',
  };

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
          gridTemplateColumns: ' 8fr 3.5fr',
        }}
      >
        <Form.Item
          name="search"
          rules={[
            {
              required: true,
              message: 'Введите серийный номер прибор',
            },
          ]}
          style={{ marginRight: 16 }}
        >
          <Input
            onChange={(value) => setFieldValue('Question', value.target.value)}
            className={styles.input}
            value={values.Question}
            placeholder="Введите серийный номер прибора"
            prefix={<Icon icon="search" />}
          />
        </Form.Item>

        <Form.Item name="OrderBy">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="sortBy" style={{ minWidth: 120, marginRight: 8 }}>
              Сортировать по:
            </label>
            <Select
              id="sortBy"
              onChange={(value) => setFieldValue('OrderBy', value)}
            >
              <Option value="Descending">Улице (уб.)</Option>
              <Option value="Ascending">Улице (возр.)</Option>
            </Select>
          </div>
        </Form.Item>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          padding: 8,
          alignItems: 'center',
        }}
      >
        <Form.Item
          name="lastCheckingDate"
          style={{ width: '100%', marginRight: 25 }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label
              htmlFor="expirationDate"
              style={{ minWidth: 152, marginRight: 8 }}
            >
              Истекает дата поверки:{' '}
            </label>
            <Select
              id="expirationDate"
              style={{ width: '65%', marginRight: 16 }}
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

        <Form.Item name="deviceDiameter">
          <div style={{ display: 'flex', alignItems: 'center' }}>
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
              style={{ width: '70%' }}
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
      </div>
    </Form>
  );
};

const StyledSlider = styled(Slider)`
  &.ant-slider.ant-slider-with-marks {
    margin-bottom: 12px !important;
  }
`;
