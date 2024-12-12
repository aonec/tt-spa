import React, { FC, useCallback, useMemo } from 'react';
import styles from './DeviceSearchForm.module.scss';
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
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { SearchDevicesFormikFieldsLookup } from './SearchDevices.constants';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { fromEnter } from 'ui-kit/shared/DatePickerNative';
import { FormItem } from 'ui-kit/FormItem';
import { SearchIcon } from 'ui-kit/icons';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { ClearIconSC } from 'ui-kit/ExtendedSearch/ExtendedSearch.styled';
import { Button } from 'ui-kit/Button';
import _ from 'lodash';

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
  handleClear,
  isSearchError,
}) => {
  const { marks, maxValue, minValue, diameters } = diametersConfig;

  const throttledSubmit = useMemo(
    () => _.debounce(submitForm, 1000),
    [submitForm],
  );

  const handleChangeRange = useCallback(
    (value: number[]) => {
      const firstIndex = diameters.findIndex((elem) => elem === value[0]);
      const secondIndex = diameters.findIndex((elem) => elem === value[1]) + 1;

      setFieldValue(
        "['DevicesFilter.PipeDiameters']",
        diameters.slice(firstIndex, secondIndex),
      );

      throttledSubmit();
    },
    [setFieldValue, diameters, throttledSubmit],
  );

  const rangeValues: [number, number] = useMemo(() => {
    const first = _.first(values['DevicesFilter.PipeDiameters']);
    const last = _.last(values['DevicesFilter.PipeDiameters']);

    return [first || minValue, last || maxValue];
  }, [values, minValue, maxValue]);

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
            isError={isSearchError}
            initialValues={{
              city: values['Address.City'],
              street: values['Address.Street'],
              house: values['Address.HousingStockNumber'],
              corpus: values['Address.Corpus'],
            }}
            onChange={(key, value) =>
              setFieldValue(
                `['Address.${SearchDevicesFormikFieldsLookup[key]}']`,
                value,
              )
            }
            handleSubmit={() => submitForm()}
          />
        </div>
      );
    }
    return (
      <FormItem>
        <Input
          small
          onChange={(value) => {
            setSerialNumber(value.target.value);
          }}
          className={styles.input}
          value={serialNumber}
          placeholder="Введите серийный номер прибора"
          prefix={<SearchIcon />}
          onKeyDown={fromEnter(() => submitForm())}
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
    isSearchError,
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
                <Select
                  small
                  style={{ width: '65%' }}
                  value={values?.OrderBy}
                  placeholder="Дате проверки"
                  onChange={(value) => setFieldValue('OrderBy', value)}
                  onSelect={() => submitForm()}
                >
                  <Option value="Descending">Улице (уб.)</Option>
                  <Option value="Ascending">Улице (возр.)</Option>
                </Select>
              </FlexCenterRow>
            </FormItem>
            <Button
              type="ghost"
              onClick={handleClear}
              size="small"
              icon={<ClearIconSC />}
            >
              Сбросить
            </Button>
          </StyledGrid>

          <Grid>
            <FormItem>
              <StyledExpirationDate>
                <StyledLabelSimple htmlFor="expirationDate">
                  Истекает дата поверки:
                </StyledLabelSimple>
                <Select
                  small
                  placeholder="Выберите"
                  style={{ width: '65%' }}
                  value={values['DevicesFilter.ExpiresCheckingDateAt']}
                  onChange={(value) =>
                    setFieldValue(
                      "['DevicesFilter.ExpiresCheckingDateAt']",
                      value,
                    )
                  }
                  onSelect={() => submitForm()}
                >
                  <Option value="CurrentMonth">В этом месяце</Option>
                  <Option value="NextTwoMonth">В следующие два месяца</Option>
                  <Option value="Past">Истекла</Option>
                </Select>
              </StyledExpirationDate>
            </FormItem>

            <FormItem>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <StyledLabel>Диаметр трубы, мм </StyledLabel>

                <SCSlider
                  tooltip={{
                    getPopupContainer: (triggerNode) =>
                      triggerNode.parentNode as HTMLElement,
                  }}
                  defaultValue={[0, 255]}
                  max={maxValue}
                  min={minValue}
                  step={null}
                  range
                  value={rangeValues}
                  marks={marks}
                  onChange={handleChangeRange}
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
