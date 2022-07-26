import styles from './DeviceSearchForm.module.scss';
import './DeviceSearchForm.module.scss';
import React, { Dispatch, useRef } from 'react';
import { setCurrentPage } from '../../../../Redux/reducers/reducerDevicesPage';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Tooltip, Select, Slider } from 'antd';
import { Icon } from '../../../../_components/Icon';
import {
  setSearchTerm,
  setExpirationDate,
  setDevicesFilter,
  DeviceSearchReducerStateType,
  FilterParameterType,
  DeviceSearchActionTypes,
  setDiameterRange,
} from '../../devicesSearchReducer';
import styled from 'styled-components';
import _ from 'lodash';
import { EExpiresCheckingDateAt } from '../../.../../api/types';

const { Option } = Select;

interface DeviceSearchFormPropsInterface {
  searchState: Partial<DeviceSearchReducerStateType>;
  dispatchSearchState: Dispatch<DeviceSearchActionTypes>;
}

const DeviceSearchForm = ({
  searchState,
  dispatchSearchState,
}: DeviceSearchFormPropsInterface) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const onValuesChangeHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    const targetValue = e.target.value;
    dispatchSearchState(setSearchTerm(targetValue));
    dispatch(setCurrentPage(1));
  };

  const handleOnExpirationChange = (value: EExpiresCheckingDateAt) => {
    dispatchSearchState(setExpirationDate(value));
    dispatch(setCurrentPage(1));
  };

  const handleOnSortChange = (value: FilterParameterType) => {
    dispatchSearchState(setDevicesFilter(value));
    dispatch(setCurrentPage(1));
  };

  const handleDiameterChange = (value: [number, number]) => {
    dispatchSearchState(setDiameterRange(value));
    dispatch(setCurrentPage(1));
  };

  const debouncedFilterChange = _.debounce(handleDiameterChange, 250, {
    maxWait: 1000,
  });

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
      onChange={onValuesChangeHandler}
      style={{ marginBottom: 20, marginTop: 10 }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.5fr 8fr 3.5fr',
        }}
      >
        <Form.Item name="advancedButton" style={{ marginRight: 16 }}>
          <Tooltip title="Расширенный поиск">
            <Button icon={<Icon icon="filter" />} disabled />
          </Tooltip>
        </Form.Item>

        <Form.Item
          name="search"
          rules={[
            {
              required: true,
              message: 'Введите серийный номер прибора',
            },
          ]}
          style={{ marginRight: 16 }}
        >
          <Input
            className={styles.input}
            value={searchState.searchTerm}
            placeholder="Введите серийный номер прибора"
            prefix={<Icon icon="search" />}
          />
        </Form.Item>

        <Form.Item name="sortBy">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="sortBy" style={{ minWidth: 120, marginRight: 8 }}>
              Сортировать по:
            </label>
            <Select id="sortBy" onSelect={handleOnSortChange}>
              <Option value="descendingFutureCheckingDate">
                Дате поверки (уб.)
              </Option>
              <Option value="ascendingFutureCheckingDate">
                Дате поверки (возр.)
              </Option>
              <Option value="descendingStreet">Улице (уб.)</Option>
              <Option value="ascendingStreet">Улице (возр.)</Option>
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
              onSelect={handleOnExpirationChange}
            >
              <Option value={0}>Ближайший месяц</Option>
              <Option value={1}>В следующие два месяца</Option>
              <Option value={2}>Истекла</Option>
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
              onChange={debouncedFilterChange}
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
  //.ant-tooltip-arrow {
  //  display: none;
  //}
  //.ant-tooltip-inner {
  //  position: relative;
  //  top: -11px;
  //  color: black;
  //  background-color: transparent;
  //  box-shadow: none;
  //  padding: 0;
  //}
`;

export default DeviceSearchForm;
