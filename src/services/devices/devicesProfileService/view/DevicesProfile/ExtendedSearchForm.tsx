import React, { FC } from 'react';
import { ConfigProvider, Input, Select } from 'antd';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types';
import styles from '../SearchDevices/DeviceSearchForm.module.scss';
import {
  StyledForm,
  StyledRangePicker,
  StyledContainerThreeItems,
  StyledContainerFourItems,
  StyledSlider,
  LabelCS
} from './DevicesProfile.styled';
import _ from 'lodash';
import type { Moment } from 'moment';
import moment from 'moment';
import { FormItem } from 'services/tasks/tasksProfileService/view/SearchTasks/SearchTasks.styled';

const { Option } = Select;

export const ExtendedSearchForm: FC<{
  values: CalculatorsListRequestPayload;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}> = ({ values, setFieldValue }) => {
  const marks = {
    0: '0',
    255: '255',
  };
  type RangeValue = [Moment | null, Moment | null] | null;

  const dateFormat = 'YYYY-MM-DD';

  return (
    <StyledForm id="searchForm" initialValues={{ remember: true }}>
      <StyledContainerFourItems>
        <FormItem>
          <LabelCS>Город: </LabelCS>
          <Input
            onChange={(value) =>
              setFieldValue("['Filter.Address.City']", value.target.value)
            }
            className={styles.input}
            value={values['Filter.Address.City']}
            placeholder="Город"
          />
        </FormItem>

        <FormItem>
          <LabelCS>Улица: </LabelCS>
          <Input
            onChange={(value) =>
              setFieldValue("['Filter.Address.Street']", value.target.value)
            }
            className={styles.input}
            value={values['Filter.Address.Street']}
            placeholder="Улица"
          />
        </FormItem>

        <FormItem>
        <LabelCS>Дом: </LabelCS>
          <Input
            onChange={(value) =>
              setFieldValue(
                "['Filter.Address.HousingStockNumber']",
                value.target.value
              )
            }
            className={styles.input}
            value={values['Filter.Address.HousingStockNumber']}
            placeholder="Дом"
          />
        </FormItem>

        <FormItem>
        <LabelCS>Корпус: </LabelCS>
          <Input
            onChange={(value) =>
              setFieldValue("['Filter.Address.Corpus']", value.target.value)
            }
            className={styles.input}
            value={values['Filter.Address.Corpus']}
            placeholder="Корпус"
          />
        </FormItem>
      </StyledContainerFourItems>
      <StyledContainerThreeItems>
        <FormItem>
        <LabelCS>Тип ресурса: </LabelCS>
          <Select
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
          </Select>
        </FormItem>

        <FormItem>
        <LabelCS>Статус Узла: </LabelCS>
          <Select
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
        <FormItem>
        <LabelCS>Истекает дата поверки: </LabelCS>
          <Select
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
          </Select>
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
            max={255}
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
          <Select
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
    </StyledForm>
  );
};
