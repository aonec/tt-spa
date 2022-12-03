import React, { FC, useMemo } from 'react';
import styles from './DeviceSearchForm.module.scss';
import { Form, Select } from 'antd';
import _ from 'lodash';
import {
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
import { InputSC, SelectSC } from '01/shared/ui/Fields';
import { FormItem } from 'services/tasks/tasksProfileService/view/SearchTasks/SearchTasks.styled';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { SearchDevicesFormikFieldsLookup } from './SearchDevices.constants';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { fromEnter } from '01/shared/ui/DatePickerNative';

const { Option } = Select;

export const SearchDevices: FC<SearchDevicesProps> = ({
  children,
  isExtendedSearchOpen,
  submitForm,
  setFieldValue,
  values,
  diametersConfig,
  devicesSearchType,
  serialNumber,
  setSerialNumber,
}) => {
  const { marks, maxValue, minValue } = diametersConfig;

  const debouncedFilterChange = _.debounce(() => submitForm(), 1000);

  const searchComponent = useMemo(() => {
    if (devicesSearchType === DevicesSearchType.Address) {
      return (
        <div>
          <AddressSearchContainer
            fields={[
              SearchFieldType.City,
              SearchFieldType.Street,
              SearchFieldType.House,
              SearchFieldType.Corpus,
            ]}
            initialValues={{
              city: values['Filter.Address.City'],
              street: values['Filter.Address.Street'],
              house: values['Filter.Address.HousingStockNumber'],
              corpus: values['Filter.Address.Corpus'],
            }}
            onChange={(key, value) =>
              setFieldValue(
                `['Filter.Address.${SearchDevicesFormikFieldsLookup[key]}']`,
                value
              )
            }
            handleSubmit={() => submitForm()}
          />
        </div>
      );
    }
    return (
      <FormItem>
        <InputSC
          onChange={(value) => {
            setSerialNumber(value.target.value);
          }}
          className={styles.input}
          value={serialNumber}
          placeholder="Введите серийный номер прибора"
          prefix={<Icon icon="search" />}
          onKeyDown={fromEnter(submitForm)}
        />
      </FormItem>
    );
  }, [
    setFieldValue,
    values,
    devicesSearchType,
    submitForm,
    serialNumber,
    setSerialNumber,
  ]);

  return (
    <Wrapper>
      {!isExtendedSearchOpen ? (
        <StyledForm>
          <StyledGrid isExtendedSearchOpen={isExtendedSearchOpen}>
            {children}
            {searchComponent}
            <FormItem>
              <FlexCenterRow>
                <StyledLabelSimple htmlFor="sortBy">
                  Сортировать по:
                </StyledLabelSimple>
                <SelectSC
                  style={{ width: '65%' }}
                  value={values?.OrderBy}
                  placeholder="Дате проверки"
                  onChange={(value) => setFieldValue('OrderBy', value)}
                  onSelect={() => submitForm()}
                >
                  <Option value="Descending">Улице (уб.)</Option>
                  <Option value="Ascending">Улице (возр.)</Option>
                </SelectSC>
              </FlexCenterRow>
            </FormItem>
          </StyledGrid>

          <Grid>
            <FormItem>
              <StyledExpirationDate>
                <StyledLabelSimple htmlFor="expirationDate">
                  Истекает дата поверки:{' '}
                </StyledLabelSimple>
                <SelectSC
                  style={{ width: '65%' }}
                  value={values['Filter.ExpiresCheckingDateAt']}
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
            </FormItem>

            <FormItem>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <StyledLabel>Диаметр прибора, мм </StyledLabel>

                <SCSlider
                  getTooltipPopupContainer={(triggerNode) =>
                    triggerNode.parentNode as HTMLElement
                  }
                  defaultValue={[0, 255]}
                  max={maxValue}
                  min={minValue}
                  step={null}
                  range
                  value={[
                    values['Filter.DiameterRange.From']
                      ? values['Filter.DiameterRange.From']
                      : 0,
                    values['Filter.DiameterRange.To']
                      ? values['Filter.DiameterRange.To']
                      : 255,
                  ]}
                  marks={marks}
                  onChange={(value: [number, number]) => {
                    setFieldValue("['Filter.DiameterRange.From']", value[0]);
                    setFieldValue("['Filter.DiameterRange.To']", value[1]);
                    debouncedFilterChange();
                  }}
                />
              </div>
            </FormItem>
          </Grid>
        </StyledForm>
      ) : (
        <FormItem>{children}</FormItem>
      )}
    </Wrapper>
  );
};
