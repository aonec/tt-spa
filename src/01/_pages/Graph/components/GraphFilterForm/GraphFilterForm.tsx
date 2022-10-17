import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import { Button, Form, Radio, Tooltip } from 'antd';
import IconTT from '../../../../tt-components/IconTT';
import ButtonTT from '../../../../tt-components/ButtonTT';
import { ArchiveReadingsFilter } from 'services/displayNodesStatisticsService/displayNodesStatisticsService.types';
import { FormItem } from 'ui-kit/FormItem';
import {
  ClosedFilterWrapper,
  FormBody,
  FormFooter,
  GraphFilter,
  OpenedFilter,
  RangeWrapper,
} from './GraphFilterForm.styled';
import { SelectSC } from '01/shared/ui/Fields';
import { RadioOptions, RangeOptions } from './GraphFilterForm.constants';
import { DatePicker } from 'ui-kit/DatePicker';

export const GraphFilterForm: React.FC<GraphFilterFormProps> = ({
  setGraphParam,
  currentGraphParam,
  paramsList,
  setArchiveFilter,
  currentFilter,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = useCallback(
    (filter: ArchiveReadingsFilter) => {
      setArchiveFilter(filter);
      setIsActive((state) => !state);
    },
    [setArchiveFilter, setIsActive]
  );

  const {
    setFieldValue,
    values,
    submitForm,
  } = useFormik<ArchiveReadingsFilter>({
    initialValues: {
      ...currentFilter,
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  const options = paramsList.map((param) => ({
    label: param,
    value: param,
  }));

  console.log(paramsList);
  useEffect(() => {
    if (paramsList[0]) {
      setGraphParam(paramsList[0]);
    }
  }, [setGraphParam, paramsList]);

  return (
    <GraphFilter>
      {!isActive ? (
        <ClosedFilterWrapper>
          <Tooltip title="Настройка параметров">
            <Button
              onClick={() => setIsActive((state) => !state)}
              icon={<IconTT icon="searchFilter" />}
              style={{ marginRight: 16 }}
            />
          </Tooltip>
          <SelectSC
            placeholder="Autocomplete"
            value={currentGraphParam}
            showArrow={true}
            options={options}
            onChange={(selectedValue) => setGraphParam(selectedValue as string)}
          />
        </ClosedFilterWrapper>
      ) : (
        <OpenedFilter>
          <Form>
            <FormBody>
              <Tooltip title="Настройка параметров">
                <Button
                  onClick={() => setIsActive((state) => !state)}
                  style={{ marginBottom: 8 }}
                  icon={<IconTT icon="searchFilter" />}
                />
              </Tooltip>
              <FormItem label="Произвольный период">
                <RangeWrapper id="div">
                  <DatePicker.RangePicker
                    getPopupContainer={() => document.getElementById('div')!}
                    name="dateRange"
                    format="DD MMMM YYYY"
                    style={{ marginRight: 16 }}
                    disabledDate={(date) => {
                      const currentDay = moment().startOf('day');
                      const diff = currentDay.diff(date.startOf('day'));
                      return diff < 0;
                    }}
                    value={[moment(values.From), moment(values.To)]}
                    onChange={(rangeValue) => {
                      if (!rangeValue || !rangeValue?.[0] || !rangeValue?.[1]) {
                        return null;
                      }
                      const From = rangeValue[0].format('YYYY-MM-DD HH:mm:ss');
                      const To = rangeValue[1]
                        .endOf('day')
                        .format('YYYY-MM-DD HH:mm:ss');
                      setFieldValue('From', From);
                      setFieldValue('To', To);
                    }}
                    ranges={{
                      [RangeOptions.LastDay]: [
                        moment(),
                        moment().set({
                          hour: 23,
                          minute: 0,
                          second: 0,
                          millisecond: 0,
                        }),
                      ],
                      [RangeOptions.LastWeek]: [
                        moment().subtract(1, 'week').set({
                          hour: 0,
                          minute: 0,
                          second: 0,
                          millisecond: 0,
                        }),
                        moment().set({
                          hour: 23,
                          minute: 0,
                          second: 0,
                          millisecond: 0,
                        }),
                      ],
                      [RangeOptions.ThisMonth]: [
                        moment().startOf('month'),
                        moment().set({
                          hour: 23,
                          minute: 0,
                          second: 0,
                          millisecond: 0,
                        }),
                      ],
                      [RangeOptions.LastMonth]: [
                        moment().startOf('month').subtract(1, 'months'),
                        moment().subtract(1, 'months').endOf('month'),
                      ],
                    }}
                  />
                </RangeWrapper>
              </FormItem>

              <FormItem label="Тип отчета">
                <div>
                  <Radio.Group
                    value={values.ReportType}
                    onChange={(event) =>
                      setFieldValue('ReportType', event.target.value)
                    }
                    options={RadioOptions}
                  />
                </div>
              </FormItem>
            </FormBody>
            <FormFooter>
              <ButtonTT color="white" small style={{ marginRight: 16 }}>
                Отмена
              </ButtonTT>
              <ButtonTT
                size="big"
                color="blue"
                disabled={false}
                onClick={submitForm}
              >
                Применить настройки
              </ButtonTT>
            </FormFooter>
          </Form>
        </OpenedFilter>
      )}
    </GraphFilter>
  );
};

type GraphFilterFormProps = {
  setGraphParam: (type: string) => void;
  currentGraphParam: string;
  setArchiveFilter: (filter: ArchiveReadingsFilter) => void;
  currentFilter: ArchiveReadingsFilter;
  paramsList: string[];
};
