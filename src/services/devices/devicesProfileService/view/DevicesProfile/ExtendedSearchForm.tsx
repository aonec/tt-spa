import React, { FC, useCallback, useMemo } from 'react';
import { ConfigProvider } from 'antd';
import {
  StyledContainerThreeItems,
  StyledSlider,
  StyledFormThreeRows,
} from './DevicesProfile.styled';
import type { Moment } from 'moment';
import _ from 'lodash';
import moment from 'moment';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { DeviceAddressSearchFieldsNameLookup } from './DevicesProfile.constants';
import { DiamtersConfig } from 'services/currentUserService/currentUserService.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { RangePicker } from 'ui-kit/RangePicker';
import { NodesListRequestPayload } from 'services/devices/displayDevicesService/displayDevicesService.types';
import { ResourceSelect } from 'ui-kit/shared/ResourceSelect';

const { Option } = Select;

export const ExtendedSearchForm: FC<{
  values: NodesListRequestPayload;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  diametersConfig: DiamtersConfig;
}> = ({ values, setFieldValue, diametersConfig }) => {
  const { marks, maxValue, minValue, diameters } = diametersConfig;

  type RangeValue = [Moment | null, Moment | null] | null;

  const dateFormat = 'YYYY-MM-DD';

  const rangeValues: [number, number] = useMemo(() => {
    const first = _.first(values['DevicesFilter.PipeDiameters']);

    const last = _.last(values['DevicesFilter.PipeDiameters']);

    return [first || minValue, last || maxValue];
  }, [values, maxValue, minValue]);

  const handleChangeRange = useCallback(
    (value: [number, number]) => {
      const firstIndex = diameters.findIndex((elem) => elem === value[0]);
      const secondIndex = diameters.findIndex((elem) => elem === value[1]) + 1;

      setFieldValue(
        "['DevicesFilter.PipeDiameters']",
        diameters.slice(firstIndex, secondIndex),
      );
    },
    [setFieldValue, diameters],
  );

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
          city: values['Address.City'],
          street: values['Address.Street'],
          house: values['Address.HousingStockNumber'],
          corpus: values['Address.Corpus'],
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
          <ResourceSelect
            small
            resource={values.Resource || null}
            onChange={(value) => setFieldValue('Resource', value)}
          />
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
            <Option value="Registered">Сдан на коммерческий учет</Option>
            <Option value="OnReview">На утверждении</Option>
            <Option value="Prepared">Подговлен к сдаче</Option>
          </Select>
        </FormItem>
        <FormItem label="Истекает дата поверки">
          <Select
            small
            id="expirationDate"
            placeholder="Все"
            value={values['DevicesFilter.ExpiresCheckingDateAt']}
            onChange={(value) =>
              setFieldValue("['DevicesFilter.ExpiresCheckingDateAt']", value)
            }
          >
            <Option value="">Все</Option>
            <Option value="NextMonth">В ближайший месяц</Option>
            <Option value="NextTwoMonth">В следующие два месяца</Option>
            <Option value="Past">Истекла</Option>
          </Select>
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
                values['CommercialDateRange.From']
                  ? moment(values['CommercialDateRange.From'], dateFormat)
                  : null,
                values['CommercialDateRange.To']
                  ? moment(values['CommercialDateRange.To'], dateFormat)
                  : null,
              ]}
              onChange={(value: RangeValue): void => {
                setFieldValue(
                  "['CommercialDateRange.From']",
                  value?.length && value[0]?.format('YYYY-MM-DD'),
                );
                setFieldValue(
                  "['CommercialDateRange.To']",
                  value?.length && value[1]?.format('YYYY-MM-DD'),
                );
              }}
              size="middle"
              format={dateFormat}
            />
          </ConfigProvider>
        </FormItem>
        <FormItem label="Сортировать по">
          <Select
            small
            id="sortBy"
            placeholder="Улица"
            value={values.OrderBy}
            onChange={(value) => setFieldValue('OrderBy', value)}
          >
            <Option value="Descending">Улице (уб.)</Option>
            <Option value="Ascending">Улице (возр.)</Option>
          </Select>
        </FormItem>
      </StyledContainerThreeItems>
    </StyledFormThreeRows>
  );
};
