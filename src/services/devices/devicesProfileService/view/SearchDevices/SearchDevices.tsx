import React, { FC, useEffect } from 'react';
import styles from './DeviceSearchForm.module.scss';
import { Wrapper } from './SearchDevices.styled';
import { SearchDevicesProps } from './SearchDevices.types';
import { Form, Input, Select, Slider } from 'antd';
import styled from 'styled-components';
import { Icon } from '01/components';
import { useFormik } from 'formik';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculators/types';
import _ from 'lodash';
import { displayDevicesService } from 'services/devices/displayDevicesService';
import { useEvent } from 'effector-react';

const { Option } = Select;

export const SearchDevices: FC<SearchDevicesProps> = ({
  children,
  isExtendedSearchOpen,
  fetchcalc,
  searchStateChanged
}) => {

  const marks = {
    0: '0',
    255: '255',
  };
  const {
    handleSubmit: submitForm,
    setFieldValue,
    values,
  } = useFormik<CalculatorsListRequestPayload>({
    initialValues: {
      'Filter.DiameterRange.From': undefined,
      'Filter.DiameterRange.To': undefined,
      'Filter.ExpiresCheckingDateAt': undefined,
      'Filter.Resource': undefined,
      'Filter.Model': undefined,
      'Filter.CommercialDateRange.From': "",
      'Filter.CommercialDateRange.To': "",
      'Filter.Address.City': "",
      'Filter.Address.Street': "",
      'Filter.Address.HousingStockNumber': "",
      'Filter.Address.Corpus': "",
      'Filter.Address.HouseCategory': undefined,
      'Filter.HousingStockId': undefined,
      'Filter.NodeStatus': undefined,
      Question: "",
      OrderRule: undefined,
      IsConnected: undefined,
      CountTasks: undefined,
      IsClosed: undefined,
      FileName: undefined,
      PageNumber: undefined,
      PageSize: undefined,
      OrderBy: undefined,
    },
    onSubmit: (values) => {
      void fetchcalc(values)
      searchStateChanged(values)
    },

  });

  useEffect(() => {
   fetchcalc(values);
   searchStateChanged(values)
  }, []);

  const debouncedFilterChange = _.debounce(() => submitForm(), 1000);
  return (
    <Wrapper>
      {!isExtendedSearchOpen ? (
        <Form
          id="searchForm"
          name="normal_login"
          className="form"
          initialValues={{ remember: true }}
          onChange={submitForm}
          style={{ marginBottom: 20, marginTop: 10 }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isExtendedSearchOpen
                ? '1fr'
                : '0.1fr 8fr 3.5fr',
            }}
          >
            <Form.Item name="advancedButton">
              {children}
            </Form.Item>
            <Form.Item
              name="search"
              rules={[
                {
                  required: true,
                  message: 'Введите серийный номер прибор',
                },
              ]}
              style={{ marginRight: 8 }}
            >
              <Input
                onChange={(value) =>
                  setFieldValue('Question', value.target.value)
                }
                className={styles.input}
                value={values.Question}
                placeholder="Введите серийный номер прибора"
                prefix={<Icon icon="search" />}
              />
            </Form.Item>

            <Form.Item name="OrderBy">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label
                  htmlFor="sortBy"
                  style={{ minWidth: 120, marginRight: 8 }}
                >
                  Сортировать по:
                </label>
                <Select
                  id="sortBy"
                  onChange={(value) => setFieldValue('OrderBy', value)}
                  onSelect={() => submitForm()}
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
                  onSelect={() => submitForm()}
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
                    setFieldValue("['Filter.DiameterRange.To']", value[1]);
                    debouncedFilterChange();
                  }}
                />
              </div>
            </Form.Item>
          </div>
        </Form>
      ) :
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isExtendedSearchOpen
            ? '1fr'
            : '0.5fr 8fr 3.5fr',
        }}
      >
        <Form.Item name="advancedButton" style={{ marginRight: 8 }}>
              {children}
            </Form.Item>
        </div>}
    </Wrapper>
  );
};
const StyledSlider = styled(Slider)`
  &.ant-slider.ant-slider-with-marks {
    margin-bottom: 12px !important;
  }
`;
