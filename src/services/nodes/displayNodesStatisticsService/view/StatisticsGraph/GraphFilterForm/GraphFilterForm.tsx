import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import { Form, Radio, Tooltip } from 'antd';
import {
  ArchiveReadingsFilter,
  FormikDateRange,
} from 'services/nodes/displayNodesStatisticsService/displayNodesStatisticsService.types';
import { FormItem } from 'ui-kit/FormItem';
import {
  ClosedFilterWrapper,
  ErrorsWrapper,
  FormBody,
  FormFooter,
  GraphFilter,
  OpenedFilter,
  RangeWrapper,
  ButtonSC,
} from './GraphFilterForm.styled';
import { SelectSC } from '01/shared/ui/Fields';
import { RadioOptions, RangeOptions } from './GraphFilterForm.constants';
import { DatePicker } from 'ui-kit/DatePicker';
import * as yup from 'yup';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { Button } from 'ui-kit/Button';
import { ReportType } from '../StatisticsGraph.types';
import { IconTT } from '01/tt-components';

export const GraphFilterForm: React.FC<GraphFilterFormProps> = ({
  setGraphParam,
  currentGraphParam,
  paramsList,
  setArchiveFilter,
  currentFilter,
}) => {
  const [isActive, setIsActive] = useState(false);
  const openModal = () => setIsActive(true);
  const closeModal = () => setIsActive(false);

  const handleSubmit = useCallback(
    (filter: ArchiveReadingsFilter) => {
      setArchiveFilter(filter);
      closeModal();
    },
    [setArchiveFilter],
  );

  const { setFieldValue, values, submitForm, errors } = useFormik<
    FormikDateRange & { ReportType: ReportType }
  >({
    initialValues: {
      ReportType: currentFilter.ReportType,
      From: moment(currentFilter.From),
      To: moment(currentFilter.To),
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      From: yup.date().nullable().required('Введите начальную дату'),
      To: yup.date().nullable().required('Введите конечную дату'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      if (values.From && values.To) {
        const From = values.From.format('YYYY-MM-DD HH:mm:ss');
        const To = values.To.endOf('day').format('YYYY-MM-DD HH:mm:ss');
        handleSubmit({ ...values, From, To });
      }
    },
  });

  const options = paramsList.map((param) => ({
    label: param,
    value: param,
  }));

  useEffect(() => {
    const isCurrentFieldExist = paramsList.find(
      (field) => field === currentGraphParam,
    );
    if (isCurrentFieldExist) {
      return;
    }

    const volumeConsumptionField = paramsList.find(
      (field) => field === 'Расход по объему, м³',
    );

    if (volumeConsumptionField) {
      setGraphParam(volumeConsumptionField);
    } else if (paramsList[0]) {
      setGraphParam(paramsList[0]);
    }
  }, [setGraphParam, paramsList, currentGraphParam]);

  return (
    <GraphFilter>
      {!isActive ? (
        <ClosedFilterWrapper>
          <Tooltip title="Настройка параметров">
            <ButtonSC
              onClick={() => openModal()}
              icon={<IconTT icon="searchFilter" />}
              style={{ marginRight: 16 }}
            />
          </Tooltip>
          <SelectSC
            placeholder="Autocomplete"
            value={currentGraphParam}
            showArrow={true}
            options={options}
            disabled={options.length === 0}
            onChange={(selectedValue) => setGraphParam(selectedValue as string)}
          />
        </ClosedFilterWrapper>
      ) : (
        <OpenedFilter>
          <Form>
            <FormBody>
              <Tooltip title="Настройка параметров">
                <ButtonSC
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
                    value={[values.From, values.To]}
                    onChange={(rangeValue) => {
                      setFieldValue('From', rangeValue?.[0] || null);
                      setFieldValue('To', rangeValue?.[1] || null);
                    }}
                    onFocus={() => {
                      setFieldValue('From', null);
                      setFieldValue('To', null);
                    }}
                    ranges={{
                      [RangeOptions.LastDay]: [
                        moment().startOf('day'),
                        moment().endOf('day'),
                      ],
                      [RangeOptions.LastWeek]: [
                        moment().subtract(1, 'week').set({
                          hour: 0,
                          minute: 0,
                          second: 0,
                          millisecond: 0,
                        }),
                        moment().startOf('day'),
                      ],
                      [RangeOptions.ThisMonth]: [
                        moment().startOf('month'),
                        moment().startOf('day'),
                      ],
                      [RangeOptions.LastMonth]: [
                        moment().startOf('month').subtract(1, 'months'),
                        moment().subtract(1, 'months').endOf('month'),
                      ],
                    }}
                  />
                </RangeWrapper>
                <ErrorsWrapper>
                  <ErrorMessage>{errors.From}</ErrorMessage>
                  <ErrorMessage>{errors.To}</ErrorMessage>
                </ErrorsWrapper>
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
              <Button
                type="ghost"
                style={{ marginRight: 16 }}
                onClick={() => closeModal()}
              >
                Отмена
              </Button>
              <Button onClick={submitForm}>Применить настройки</Button>
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
