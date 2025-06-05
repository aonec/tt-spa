import React, { FC, useCallback, useMemo } from 'react';
import { ConfigProvider } from 'antd';
import _ from 'lodash';
import dayjs from 'api/dayjs';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { DeviceAddressSearchFieldsNameLookup } from '../DevicesProfile.constants';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { RangePicker } from 'ui-kit/RangePicker';
import {
  EResourceType,
  EExpiresDateAt,
  EHouseCategory,
  ENodeRegistrationType,
} from 'api/types';
import { AutoComplete } from 'ui-kit/AutoComplete';
import {
  ESelectedDateType,
  ExpiresCheckingPeriodSegmented,
  ExtendedSearchFormProps,
  RangeValue,
} from './ExtendedSearchForm.types';
import { Segmented } from 'ui-kit/Segmented';
import {
  CheckboxSC,
  SegmentedContainer,
  StyledContainerThreeItems,
  StyledContainerTwoItems,
  StyledFormThreeRows,
  StyledSlider,
} from './ExtendedSearchForm.styled';
import { DeviceConnectionType } from './ExtendedSearchForm.constants';

const { Option } = Select;

export const ExtendedSearchForm: FC<ExtendedSearchFormProps> = ({
  values,
  setFieldValue,
  diametersConfig,
  handleFetchModels,
  calculatorsModels,
  dateType,
  setDateType,
}) => {
  const { marks, maxValue, minValue, diameters } = diametersConfig;

  const dateFormat = 'DD.MM.YYYY';

  const rangeValues: [number, number] = useMemo(() => {
    const first = _.first(values['DevicesFilter.PipeDiameters']);

    const last = _.last(values['DevicesFilter.PipeDiameters']);

    return [first || minValue, last || maxValue];
  }, [values, maxValue, minValue]);

  const handleChangeRange = useCallback(
    (value: number[]) => {
      const firstIndex = diameters.findIndex((elem) => elem === value[0]);
      const secondIndex = diameters.findIndex((elem) => elem === value[1]) + 1;
      setFieldValue(
        "['DevicesFilter.PipeDiameters']",
        diameters.slice(firstIndex, secondIndex),
      );
    },
    [diameters, setFieldValue],
  );

  return (
    <StyledFormThreeRows>
      <AddressSearchContainer
        isCityPreselected={false}
        onChange={(key, value) =>
          setFieldValue(DeviceAddressSearchFieldsNameLookup[key], value)
        }
        fields={[
          SearchFieldType.City,
          SearchFieldType.Street,
          SearchFieldType.House,
          SearchFieldType.Corpus,
        ]}
        showLabels
        initialValues={{
          city: values['Address.City'],
          street: values['Address.Street'],
          house: values['Address.HousingStockNumber'],
          corpus: values['Address.Corpus'],
        }}
        customTemplate={[
          { fieldType: SearchFieldType.City, templateValue: '333px' },
          { fieldType: SearchFieldType.Street, templateValue: '333px' },
          { fieldType: SearchFieldType.House, templateValue: '1fr' },
          { fieldType: SearchFieldType.Corpus, templateValue: '1fr' },
        ]}
      />
      <StyledContainerThreeItems>
        <FormItem label="Тип ресурса">
          <Select
            small
            id="Resource"
            value={values.Resource}
            placeholder="Все ресурсы"
            onChange={(value) => setFieldValue('Resource', value)}
          >
            <Option value="">Все ресурсы</Option>
            <Option value={EResourceType.Heat}>Тепло</Option>
            <Option value={EResourceType.HotWaterSupply}>Горячая вода</Option>
            <Option value={EResourceType.ColdWaterSupply}>Холодная вода</Option>
            <Option value={EResourceType.Electricity}>Электричество</Option>
          </Select>
        </FormItem>

        <FormItem label="Статус Узла">
          <Select
            small
            id="NodeStatus"
            placeholder="Любой статус"
            value={values.CommercialStatus}
            onChange={(value) => setFieldValue('CommercialStatus', value)}
          >
            <Option value="">Любой статус</Option>
            <Option value="NotRegistered">Не на коммерческом учете</Option>
            {values.RegistrationType !== ENodeRegistrationType.Technical && (
              <Option value="Registered">Сдан на коммерческий учет</Option>
            )}
            <Option value="OnReview">На утверждении</Option>
            <Option value="Prepared">Подговлен к сдаче</Option>
          </Select>
        </FormItem>

        <CheckboxSC
          checked={values.HasInvalidConfiguration}
          onChange={(event) =>
            setFieldValue('HasInvalidConfiguration', event.target.checked)
          }
        >
          Узлы с ошибкой в конфигурации
        </CheckboxSC>
      </StyledContainerThreeItems>
      <StyledContainerThreeItems>
        <FormItem label="Диаметр трубы, мм">
          <StyledSlider
            tooltip={{
              getPopupContainer: (triggerNode: HTMLElement) =>
                triggerNode.parentNode as HTMLElement,
            }}
            defaultValue={[0, 255]}
            marks={marks}
            min={minValue}
            max={maxValue}
            range
            step={null}
            value={rangeValues}
            onChange={handleChangeRange}
          />
        </FormItem>

        <FormItem label="Марка прибора">
          <AutoComplete
            small
            value={values['DevicesFilter.Model']}
            placeholder="Начните вводить марку прибора"
            onChange={(value) => {
              setFieldValue("['DevicesFilter.Model']", value);
              handleFetchModels(value as string);
            }}
            options={calculatorsModels.map((elem) => ({ value: elem })) || []}
          />
        </FormItem>

        <FormItem label="Период действия акта допуска">
          <ConfigProvider>
            <RangePicker
              small
              value={[
                values['CommercialDateRange.From']
                  ? dayjs(values['CommercialDateRange.From'], dateFormat)
                  : null,
                values['CommercialDateRange.To']
                  ? dayjs(values['CommercialDateRange.To'], dateFormat)
                  : null,
              ]}
              onChange={(value: RangeValue): void => {
                setFieldValue(
                  "['CommercialDateRange.From']",
                  (value?.length && value[0]?.format(dateFormat)) || '',
                );
                setFieldValue(
                  "['CommercialDateRange.To']",
                  (value?.length && value[1]?.format(dateFormat)) || '',
                );
              }}
              size="middle"
              format={dateFormat}
            />
          </ConfigProvider>
        </FormItem>
      </StyledContainerThreeItems>

      <StyledContainerTwoItems>
        <FormItem label="Дата">
          <Select
            small
            placeholder="Выберите из списка"
            value={dateType}
            onChange={(value) => {
              setDateType(value as ESelectedDateType);
            }}
          >
            <Option value={ESelectedDateType.NonSelected}>Не выбрано</Option>
            <Option value={ESelectedDateType.ExpiresCheckingDateAt}>
              Окончание поверки
            </Option>
            <Option value={ESelectedDateType.ExpiresAdmissionActDateAt}>
              Окончание акта-допуска
            </Option>
          </Select>
        </FormItem>

        <SegmentedContainer>
          <Segmented<ExpiresCheckingPeriodSegmented>
            bold
            active={
              values['DevicesFilter.ExpiresCheckingDateAt'] ||
              values.ExpiresAdmissionActDateAt ||
              ''
            }
            items={[
              {
                title: 'Любая',
                name: '',
              },
              {
                title: 'В этом месяце',
                name: EExpiresDateAt.CurrentMonth,
              },
              {
                title: 'В ближайшие 2 месяца',
                name: EExpiresDateAt.NextTwoMonth,
              },
              {
                title: 'В прошлом месяце',
                name: EExpiresDateAt.Past,
              },
            ]}
            onChange={(segmentValue) => {
              if (dateType === ESelectedDateType.ExpiresCheckingDateAt) {
                setFieldValue('ExpiresAdmissionActDateAt', '');
                setFieldValue(
                  "['DevicesFilter.ExpiresCheckingDateAt']",
                  segmentValue,
                );
                return;
              }
              if (dateType === ESelectedDateType.ExpiresAdmissionActDateAt) {
                setFieldValue("['DevicesFilter.ExpiresCheckingDateAt']", '');
                setFieldValue('ExpiresAdmissionActDateAt', segmentValue);
                return;
              }
            }}
          />
        </SegmentedContainer>
      </StyledContainerTwoItems>

      <StyledContainerThreeItems>
        <FormItem label="Соединение">
          <Select
            small
            placeholder="Выберите из списка"
            value={values.connectionType}
            onChange={(value) => setFieldValue('connectionType', value)}
          >
            <Option value={DeviceConnectionType.All}>Все</Option>
            <Option value={DeviceConnectionType.Connected}>
              Прибор опрашивается
            </Option>
            <Option value={DeviceConnectionType.NotConnected}>
              Прибор не опрашивается
            </Option>
          </Select>
        </FormItem>

        <FormItem label="Коммерческий учет показателей прибора">
          <Select
            small
            placeholder="Выберите из списка"
            value={values.RegistrationType}
            onChange={(value) => {
              setFieldValue('RegistrationType', value);
              setFieldValue('CommercialStatus', '');
            }}
          >
            <Option value="">Все</Option>
            <Option value={ENodeRegistrationType.Commercial}>
              Прибор на коммерческом учете
            </Option>
            <Option value={ENodeRegistrationType.Technical}>
              Прибор не на коммерческом учете
            </Option>
          </Select>
        </FormItem>

        <FormItem label="Тип здания">
          <Select
            small
            placeholder="Выберите из списка"
            value={values['Address.HouseCategory'] || ''}
            onChange={(value) =>
              setFieldValue("['Address.HouseCategory']", value)
            }
          >
            <Option value="">Все</Option>
            <Option value={EHouseCategory.Living}>Жилое</Option>
            <Option value={EHouseCategory.NonResidential}>Не жилое</Option>
          </Select>
        </FormItem>
      </StyledContainerThreeItems>
    </StyledFormThreeRows>
  );
};
