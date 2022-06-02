import React, { FC } from 'react';
import styles from './DeviceSearchForm.module.scss';
import { Wrapper } from './SearchDevices.styled';
import { SearchDevicesProps } from './SearchDevices.types';
import { Form, Input, Button, Tooltip, Select, Slider } from 'antd';
import styled from 'styled-components';
import { Icon } from '01/components';

const { Option } = Select;
const onValuesChangeHandler = () => console.log('a');
const handleOnSortChange = () => console.log('b');
const handleOnExpirationChange = () => console.log('c');
const debouncedFilterChange = () => console.log('d');
export const SearchDevices: FC<SearchDevicesProps> = ({}) => {
  const searchState = {
    searchTerm: 'a',
  };
  const marks = {
    0: '0',
    255: '255',
  };

  return (
    <Wrapper>
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
              <Button icon={<Icon icon="filter" />} />
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
              value={searchState?.searchTerm || 'a'}
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
    </Wrapper>
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
