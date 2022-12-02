import React, { FC, useMemo } from 'react';
import { ConfigProvider, Select } from 'antd';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import {
  StyledRangePicker,
  StyledContainerThreeItems,
  StyledSlider,
  LabelCS,
  StyledFormThreeRows,
} from './DevicesProfile.styled';
import _ from 'lodash';
import type { Moment } from 'moment';
import moment from 'moment';
import {
  FormItem,
  SelectSC,
} from 'services/tasks/tasksProfileService/view/SearchTasks/SearchTasks.styled';
import { AddressSearchContainer } from 'services/addressSearchService';
import { SearchFieldType } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';
import { DeviceAddressSearchFieldsNameLookup } from './DevicesProfile.constants';
import { DiamtersConfig } from 'services/currentUserService/currentUserService.types';

const { Option } = Select;

export const ExtendedSearchForm: FC<{
  values: CalculatorsListRequestPayload;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  diametersConfig: DiamtersConfig;
}> = ({ values, setFieldValue, diametersConfig }) => {
  const { marks, maxValue, minValue } = diametersConfig;

  type RangeValue = [Moment | null, Moment | null] | null;

  const dateFormat = 'YYYY-MM-DD';

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
        <FormItem>
          <LabelCS>Тип ресурса: </LabelCS>
          <SelectSC
            id="Resource"
            value={values['Filter.Resource']}
            placeholder="Все ресурсы"
            onChange={(value) => setFieldValue("['Filter.Resource']", value)}
          >
            <Option value="">Все ресурсы</Option>
            <Option value="Heat">Тепло</Option>
            <Option value="HotWaterSupply">Горячая вода</Option>
            <Option value="ColdWaterSupply">Холодная вода</Option>
            <Option value="Electricity">Электричество</Option>
          </SelectSC>
        </FormItem>

        <FormItem>
          <LabelCS>Статус Узла: </LabelCS>
          <SelectSC
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
          </SelectSC>
        </FormItem>
        <FormItem>
          <LabelCS>Истекает дата поверки: </LabelCS>
          <SelectSC
            id="expirationDate"
            placeholder="Все"
            value={values['Filter.ExpiresCheckingDateAt']}
            onChange={(value) =>
              setFieldValue("['Filter.ExpiresCheckingDateAt']", value)
            }
          >
            <Option value="">Все</Option>
            <Option value="NextMonth">Ближайший месяц</Option>
            <Option value="NextTwoMonth">В следующие два месяца</Option>
            <Option value="Past">Истекла</Option>
          </SelectSC>
        </FormItem>
      </StyledContainerThreeItems>
      <StyledContainerThreeItems>
        <FormItem>
          <LabelCS>Диаметр прибора, мм: </LabelCS>
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
            value={[
              values['Filter.DiameterRange.From']
                ? values['Filter.DiameterRange.From']
                : 0,
              values['Filter.DiameterRange.To']
                ? values['Filter.DiameterRange.To']
                : 255,
            ]}
            onChange={(value: [number, number]) => {
              setFieldValue("['Filter.DiameterRange.From']", value[0]);
              setFieldValue("['Filter.DiameterRange.To']", value[1]);
            }}
          />
        </FormItem>
        <FormItem>
          <LabelCS>Период действия акта допуска: </LabelCS>
          <ConfigProvider>
            <StyledRangePicker
              value={[
                values['Filter.CommercialDateRange.From']
                  ? moment(
                      values['Filter.CommercialDateRange.From'],
                      dateFormat
                    )
                  : null,
                values['Filter.CommercialDateRange.To']
                  ? moment(values['Filter.CommercialDateRange.To'], dateFormat)
                  : null,
              ]}
              onChange={(value: RangeValue): void => {
                setFieldValue(
                  "['Filter.CommercialDateRange.From']",
                  value?.length && value[0]?.format('YYYY-MM-DD')
                );
                setFieldValue(
                  "['Filter.CommercialDateRange.To']",
                  value?.length && value[1]?.format('YYYY-MM-DD')
                );
              }}
              size="middle"
              format={dateFormat}
            />
          </ConfigProvider>
        </FormItem>
        <FormItem>
          <LabelCS>Сортировать по: </LabelCS>
          <SelectSC
            id="sortBy"
            placeholder="Улица"
            value={values.OrderBy}
            onChange={(value) => setFieldValue('OrderBy', value)}
          >
            <Option value="Descending">Улице (уб.)</Option>
            <Option value="Ascending">Улице (возр.)</Option>
          </SelectSC>
        </FormItem>
      </StyledContainerThreeItems>
    </StyledFormThreeRows>
  );
};
