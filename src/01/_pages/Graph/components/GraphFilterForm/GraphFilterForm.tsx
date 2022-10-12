import React, { useCallback, useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import { Button, Form, Radio, Tooltip } from 'antd';
import { GraphParamsType } from '../../Graph';
import IconTT from '../../../../tt-components/IconTT';
import { paramsTranslation } from '../../utils';
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
import { RadioOptions } from './GraphFilterForm.constants';
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
    label: paramsTranslation[param],
    value: param,
  }));

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
            onChange={(selectedValue) =>
              setGraphParam(selectedValue as GraphParamsType)
            }
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
                    value={[moment(values.from), moment(values.to)]}
                    onChange={(rangeValue) => {
                      if (!rangeValue || !rangeValue?.[0] || !rangeValue?.[1]) {
                        return null;
                      }
                      const from = rangeValue[0].format('YYYY-MM-DD HH:mm:ss');
                      const to = rangeValue[1].format('YYYY-MM-DD HH:mm:ss');
                      setFieldValue('from', from);
                      setFieldValue('to', to);
                    }}
                  />
                </RangeWrapper>
              </FormItem>

              <FormItem label="Тип отчета">
                <div>
                  <Radio.Group
                    value={values.reportType}
                    onChange={(event) =>
                      setFieldValue('reportType', event.target.value)
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
  setGraphParam: (type: GraphParamsType) => void;
  currentGraphParam: GraphParamsType;
  setArchiveFilter: (filter: ArchiveReadingsFilter) => void;
  currentFilter: ArchiveReadingsFilter;
  paramsList: GraphParamsType[];
};
