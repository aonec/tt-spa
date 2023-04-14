import React, { FC, useCallback, useMemo } from 'react';
import styles from './DeviceSearchForm.module.scss';
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
  ResetButton,
} from './SearchDevices.styled';
import { SearchDevicesProps } from './SearchDevices.types';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { SearchDevicesFormikFieldsLookup } from './SearchDevices.constants';
import { DevicesSearchType } from 'services/housingMeteringDevices/devicesPageService/devicesPageService.types';
import { fromEnter } from 'ui-kit/shared_components/DatePickerNative';
import { FormItem } from 'ui-kit/FormItem';
import { ClearIconSC } from '01/shared/ui/ExtendedSearch/components';
import { SearchIcon } from 'ui-kit/icons';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';

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
}) => {
  const { marks, maxValue, minValue, diameters } = diametersConfig;

  const handleChangeRange = useCallback(
    (value: [number, number]) => {
      const firstIndex = diameters.findIndex((elem) => elem === value[0]);
      const secondIndex = diameters.findIndex((elem) => elem === value[1]) + 1;

      setFieldValue(
        "['Filter.PipeDiameters']",
        diameters.slice(firstIndex, secondIndex),
      );

      setTimeout(() => submitForm(), 1000);
    },
    [setFieldValue, diameters, submitForm],
  );

  const rangeValues: [number, number] = useMemo(() => {
    const first = _.first(values['Filter.PipeDiameters']);
    const last = _.last(values['Filter.PipeDiameters']);

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
            initialValues={{
              city: values['Filter.Address.City'],
              street: values['Filter.Address.Street'],
              house: values['Filter.Address.HousingStockNumber'],
              corpus: values['Filter.Address.Corpus'],
            }}
            onChange={(key, value) =>
              setFieldValue(
                `['Filter.Address.${SearchDevicesFormikFieldsLookup[key]}']`,
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
            <ResetButton
              type="ghost"
              onClick={handleClear}
              size="small"
              icon={<ClearIconSC />}
            >
              Сбросить
            </ResetButton>
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
                  value={values['Filter.ExpiresCheckingDateAt']}
                  onChange={(value) =>
                    setFieldValue("['Filter.ExpiresCheckingDateAt']", value)
                  }
                  onSelect={() => submitForm()}
                >
                  <Option value="NextMonth">В ближайший месяц</Option>
                  <Option value="NextTwoMonth">В следующие два месяца</Option>
                  <Option value="Past">Истекла</Option>
                </Select>
              </StyledExpirationDate>
            </FormItem>

            <FormItem>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <StyledLabel>Диаметр трубы, мм </StyledLabel>

                <SCSlider
                  getTooltipPopupContainer={(triggerNode) =>
                    triggerNode.parentNode as HTMLElement
                  }
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
