import React, { FC, useEffect } from 'react';
import styles from './DeviceSearchForm.module.scss';
import { Form, Select } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import {
  CustomGrid,
  FlexCenterRow,
  StyledForm,
  StyledGrid,
  StyledLabel,
  StyledLabelSimple,
  SCSlider,
  Wrapper,
  Grid,
  StyledExpirationDate,
} from './SearchDevices.styled';
import { SearchDevicesProps } from './SearchDevices.types';
import { Icon } from '01/components';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import { InputSC, SelectSC } from '01/shared/ui/Fields';

const { Option } = Select;

export const SearchDevices: FC<SearchDevicesProps> = ({
  children,
  isExtendedSearchOpen,
  fetchcalc,
  searchStateChanged,
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
      'Filter.CommercialDateRange.From': undefined,
      'Filter.CommercialDateRange.To': undefined,
      'Filter.Address.City': undefined,
      'Filter.Address.Street': undefined,
      'Filter.Address.HousingStockNumber': undefined,
      'Filter.Address.Corpus': undefined,
      'Filter.Address.HouseCategory': undefined,
      'Filter.HousingStockId': undefined,
      'Filter.NodeStatus': undefined,
      Question: undefined,
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
      void fetchcalc(values);
      searchStateChanged(values);
    },
  });

  useEffect(() => {
    fetchcalc(values);
    searchStateChanged(values);
  }, []);

  const debouncedFilterChange = _.debounce(() => submitForm(), 1000);

  return (
    <Wrapper>
      {!isExtendedSearchOpen ? (
        <StyledForm
          id="searchForm"
          initialValues={{ remember: true }}
          onChange={submitForm}
        >
          <StyledGrid isExtendedSearchOpen={isExtendedSearchOpen}>
            <div>{children}</div>
            <Form.Item
              name="search"
              rules={[
                {
                  required: true,
                  message: 'Введите серийный номер приборa',
                },
              ]}
            >
              <InputSC
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
              <FlexCenterRow>
                <StyledLabelSimple htmlFor="sortBy">
                  Сортировать по:
                </StyledLabelSimple>
                <SelectSC
                  style={{ width: '65%' }}
                  id="sortBy"
                  placeholder="Дате проверки"
                  onChange={(value) => setFieldValue('OrderBy', value)}
                  onSelect={() => submitForm()}
                >
                  <Option value="Descending">Улице (уб.)</Option>
                  <Option value="Ascending">Улице (возр.)</Option>
                </SelectSC>
              </FlexCenterRow>
            </Form.Item>
          </StyledGrid>

          <Grid>
            <Form.Item name="lastCheckingDate">
              <StyledExpirationDate>
                <StyledLabelSimple htmlFor="expirationDate">
                  Истекает дата поверки:{' '}
                </StyledLabelSimple>
                <SelectSC
                  id="expirationDate"
                  style={{ width: '65%' }}
                  onChange={(value) =>
                    setFieldValue("['Filter.ExpiresCheckingDateAt']", value)
                  }
                  onSelect={() => submitForm()}
                >
                  <Option value="NextMonth">Ближайший месяц</Option>
                  <Option value="NextTwoMonth">В следующие два месяца</Option>
                  <Option value="Past">Истекла</Option>
                </SelectSC>
              </StyledExpirationDate>
            </Form.Item>

            <Form.Item name="deviceDiameter">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <StyledLabel>Диаметр прибора, мм </StyledLabel>

                <SCSlider
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
          </Grid>
        </StyledForm>
      ) : (
        <CustomGrid>
          <Form.Item name="advancedButton">{children}</Form.Item>
        </CustomGrid>
      )}
    </Wrapper>
  );
};
