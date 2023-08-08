import React, { FC, useCallback, useMemo } from 'react';
import { ConfigProvider } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { DeviceAddressSearchFieldsNameLookup } from '../DevicesProfile.constants';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { RangePicker } from 'ui-kit/RangePicker';
import { EResourceType, EExpiresCheckingDateAt } from 'api/types';
import { AutoComplete } from 'ui-kit/AutoComplete';
import {
  ExpiresCheckingPeriodSegmented,
  ExtendedSearchFormProps,
  RangeValue,
} from './ExtendedSearchForm.types';
import { Segmented } from 'ui-kit/Segmented';
import {
  SegmentedContainer,
  StyledContainerThreeItems,
  StyledContainerTwoItems,
  StyledFormThreeRows,
  StyledSlider,
} from './ExtendedSearchForm.styled';
import { EIsDeviceConnectedType } from './ExtendedSearchForm.constants';

const { Option } = Select;

export const ExtendedSearchForm: FC<ExtendedSearchFormProps> = ({
  values,
  setFieldValue,
  diametersConfig,
  handleFetchModels,
  housingMeteringDevicesModels,
}) => {
  const { marks, maxValue, minValue, diameters } = diametersConfig;

  const dateFormat = 'YYYY-MM-DD';

  const rangeValues: [number, number] = useMemo(() => {
    const first = _.first(values['Filter.PipeDiameters']);

    const last = _.last(values['Filter.PipeDiameters']);

    return [first || minValue, last || maxValue];
  }, [values, maxValue, minValue]);

  const handleChangeRange = useCallback(
    (value: [number, number]) => {
      const firstIndex = diameters.findIndex((elem) => elem === value[0]);
      const secondIndex = diameters.findIndex((elem) => elem === value[1]) + 1;
      setFieldValue(
        "['Filter.PipeDiameters']",
        diameters.slice(firstIndex, secondIndex),
      );
    },
    [diameters, setFieldValue],
  );

  console.log(values.IsConnected);

  return (
    <StyledFormThreeRows>
      <AddressSearchContainer
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
          city: values['Filter.Address.City'],
          street: values['Filter.Address.Street'],
          house: values['Filter.Address.HousingStockNumber'],
          corpus: values['Filter.Address.Corpus'],
        }}
        customTemplate={[
          { fieldType: SearchFieldType.City, templateValue: '300px' },
          { fieldType: SearchFieldType.Street, templateValue: '300px' },
          { fieldType: SearchFieldType.House, templateValue: '1fr' },
          { fieldType: SearchFieldType.Corpus, templateValue: '1fr' },
        ]}
      />
      <StyledContainerThreeItems>
        <FormItem label="Тип ресурса">
          <Select
            small
            id="Resource"
            value={values['Filter.Resource']}
            placeholder="Все ресурсы"
            onChange={(value) => setFieldValue("['Filter.Resource']", value)}
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
            value={values['Filter.NodeStatus']}
            onChange={(value) => setFieldValue("['Filter.NodeStatus']", value)}
          >
            <Option value="">Любой статус</Option>
            <Option value="NotRegistered">Не на коммерческом учете</Option>
            <Option value="Registered">Сдан на коммерческий учет</Option>
            <Option value="OnReview">На утверждении</Option>
            <Option value="Prepared">Подговлен к сдаче</Option>
          </Select>
        </FormItem>

        <FormItem label="Марка прибора">
          <AutoComplete
            small
            value={values['Filter.Model']}
            placeholder="Начните вводить марку прибора"
            onChange={(value) => {
              setFieldValue('model', value);
              handleFetchModels(value);
            }}
            options={
              housingMeteringDevicesModels.map((elem) => ({ value: elem })) ||
              []
            }
          />
        </FormItem>
      </StyledContainerThreeItems>
      <StyledContainerThreeItems>
        <FormItem label="Диаметр трубы, мм">
          <StyledSlider
            getTooltipPopupContainer={(triggerNode) =>
              triggerNode.parentNode as HTMLElement
            }
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
        <FormItem label="Период действия акта допуска">
          <ConfigProvider>
            <RangePicker
              small
              value={[
                values['Filter.CommercialDateRange.From']
                  ? moment(
                      values['Filter.CommercialDateRange.From'],
                      dateFormat,
                    )
                  : null,
                values['Filter.CommercialDateRange.To']
                  ? moment(values['Filter.CommercialDateRange.To'], dateFormat)
                  : null,
              ]}
              onChange={(value: RangeValue): void => {
                setFieldValue(
                  "['Filter.CommercialDateRange.From']",
                  value?.length && value[0]?.format('YYYY-MM-DD'),
                );
                setFieldValue(
                  "['Filter.CommercialDateRange.To']",
                  value?.length && value[1]?.format('YYYY-MM-DD'),
                );
              }}
              size="middle"
              format={dateFormat}
            />
          </ConfigProvider>
        </FormItem>

        {/* <FormItem label="Истекает дата поверки">
          <Select
            small
            id="expirationDate"
            placeholder="Все"
            value={values['Filter.ExpiresCheckingDateAt']}
            onChange={(value) =>
              setFieldValue("['Filter.ExpiresCheckingDateAt']", value)
            }
          >
            <Option value="">Все</Option>
            <Option value="NextMonth">В ближайший месяц</Option>
            <Option value="NextTwoMonth">В следующие два месяца</Option>
            <Option value="Past">Истекла</Option>
          </Select>
        </FormItem> */}
      </StyledContainerThreeItems>

      <StyledContainerTwoItems>
        <FormItem label="Дата">
          <Select
            small
            placeholder="Выберите из списка"
            value={values['Filter.ExpiresCheckingDateAt']}
            onChange={(value) =>
              setFieldValue("['Filter.ExpiresCheckingDateAt']", value)
            }
          >
            <Option value="">Не выбрано</Option>
            <Option value="NextMonth">Окончание поверки</Option>
            <Option value="NextTwoMonth">Окончание акта-допуска</Option>
          </Select>
        </FormItem>

        <SegmentedContainer>
          <Segmented<ExpiresCheckingPeriodSegmented>
            active={values['Filter.ExpiresCheckingDateAt'] || ''}
            items={[
              {
                title: 'Любая',
                name: '',
              },
              {
                title: 'В ближайший месяц',
                name: EExpiresCheckingDateAt.NextMonth,
              },
              {
                title: 'В ближайшие 2 месяца',
                name: EExpiresCheckingDateAt.NextTwoMonth,
              },
              {
                title: 'В прошлом месяце',
                name: EExpiresCheckingDateAt.Past,
              },
            ]}
            onChange={(segmentValue) => {
              console.log(segmentValue);
              setFieldValue("['Filter.ExpiresCheckingDateAt']", segmentValue);
            }}
          />
        </SegmentedContainer>
      </StyledContainerTwoItems>

      <StyledContainerThreeItems>
        <FormItem label="Соединение">
          <Select
            small
            placeholder="Выберите из списка"
            value={values.IsConnected}
            onChange={(value) => setFieldValue('IsConnected', value)}
          >
            <Option value={EIsDeviceConnectedType.All}>Все</Option>
            <Option value={EIsDeviceConnectedType.Connected}>
              Прибор опрашивается
            </Option>
            <Option value={EIsDeviceConnectedType.NotConnected}>
              Прибор не опрашивается
            </Option>
          </Select>
        </FormItem>

        <FormItem label="Коммерческий учет показателей прибора">
          <Select
            small
            placeholder="Выберите из списка"
            value={values['Filter.ExpiresCheckingDateAt']}
            onChange={(value) =>
              setFieldValue("['Filter.ExpiresCheckingDateAt']", value)
            }
          >
            <Option value="">Все</Option>
            <Option value="NextMonth">В ближайший месяц</Option>
            <Option value="NextTwoMonth">В следующие два месяца</Option>
          </Select>
        </FormItem>

        <FormItem label="Тип здания">
          <Select
            small
            placeholder="Выберите из списка"
            value={values['Filter.ExpiresCheckingDateAt']}
            onChange={(value) =>
              setFieldValue("['Filter.ExpiresCheckingDateAt']", value)
            }
          >
            <Option value="">Все</Option>
            <Option value="NextMonth">В ближайший месяц</Option>
            <Option value="NextTwoMonth">В следующие два месяца</Option>
          </Select>
        </FormItem>
      </StyledContainerThreeItems>
    </StyledFormThreeRows>
  );
};
