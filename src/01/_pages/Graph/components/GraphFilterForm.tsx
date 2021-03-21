import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useRef,
    useState,
} from 'react'
import moment, { Moment } from 'moment'
import {
    FormItem,
    DatePicker,
    Form,
    Radio,
    SubmitButton,
    Select,
} from 'formik-antd'
import { Formik, FormikHelpers } from 'formik'
import { QueryInterface } from '../../../_api/node_readings_page'
import { Button, Tooltip } from 'antd'
import { GraphParamsType } from '../Graph'
import IconTT from '../../../tt-components/IconTT'
import styled from 'styled-components'
import {paramsTranslation} from '../utils'
import ButtonTT from '../../../tt-components/ButtonTT'
import { ReportType } from './GraphView'
import useOutsideClick from '../../../hooks/useOutsideClick'

const GraphFilterForm: React.FC<GraphFilterFormProps> = ({
                                                             setGraphParam,
                                                             setSearchQuery,
                                                             paramsList,
                                                         }) => {
    const [isActive, setIsActive] = useState(false)

    const formRef = useRef<any>()

    const setShown = useCallback(() => {
        setIsActive(false)
    }, [isActive])

    useOutsideClick(formRef, () => {
        if (isActive) {
            setShown()
        }
    })

    const onSelectHandler = (value: GraphParamsType) => {
        setGraphParam(value)
    }

    const handleSubmit = (
      values: FormValuesInterface,
      actions: FormikHelpers<FormValuesInterface>
    ) => {
        setSearchQuery((prevQuery) => {
            return {
                ...prevQuery,
                from: values.dateRange[0].set({
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0,
                }),
                to: values.dateRange[1].set({
                    hour: 23,
                    minute: 0,
                    second: 0,
                    millisecond: 0,
                }),
                reportType: values.reportType,
            }
        })
        actions.setSubmitting(false)
        setIsActive((state) => !state)
    }

    const options = paramsList.map((param) => ({
        label: paramsTranslation[param],
        value: param,
    }))

    return (
      <GraphFilter ref={formRef}>
          <Formik
            initialValues={{
                dateRange: [
                    moment().subtract(6, 'day').set({
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
                reportType: 'daily',
                autocomplete: paramsList[0],
            }}
            onSubmit={handleSubmit}
          >
              {!isActive ? (
                <div
                  style={{
                      display: 'flex',
                      marginBottom: 10,
                      paddingLeft: 8,
                      paddingTop: 16,
                  }}
                >
                    <Tooltip title="Настройка параметров">
                        <div style={{ marginRight: 16 }}>
                            <Button
                              onClick={() =>
                                setIsActive((state) => !state)
                              }
                              icon={<IconTT icon="searchFilter" />}
                            />
                        </div>
                    </Tooltip>
                    <Select
                      style={{ width: '100%' }}
                      name="autocomplete"
                      placeholder="Autocomplete"
                      showArrow={true}
                      options={options}
                      onSelect={onSelectHandler}
                    />
                </div>
              ) : (
                <OpenedFilter>
                    <Form>
                        <FormBody>
                            <Tooltip title="Настройка параметров">
                                <Button
                                  onClick={() =>
                                    setIsActive((state) => !state)
                                  }
                                  style={{ marginBottom: 8 }}
                                  icon={<IconTT icon="searchFilter" />}
                                />
                            </Tooltip>
                            <FormItem
                              name="dateRange"
                              label="Произвольный период"
                            >
                                <RangeWrapper id="div">
                                    <DatePicker.RangePicker
                                      getPopupContainer={() =>
                                        document.getElementById('div')!
                                      }
                                      name="dateRange"
                                      format="DD MMMM YYYY"
                                      style={{ marginRight: 16 }}
                                      ranges={{
                                          'Последние сутки': [
                                              moment(),
                                              moment().set({
                                                  hour: 23,
                                                  minute: 0,
                                                  second: 0,
                                                  millisecond: 0,
                                              }),
                                          ],
                                          'Последние 7 дней': [
                                              moment()
                                                .subtract(1, 'week')
                                                .set({
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
                                          'С начала месяца': [
                                              moment().startOf('month'),
                                              moment().set({
                                                  hour: 23,
                                                  minute: 0,
                                                  second: 0,
                                                  millisecond: 0,
                                              }),
                                          ],
                                          'За прошлый месяц': [
                                              moment()
                                                .startOf('month')
                                                .subtract(1, 'months'),
                                              moment()
                                                .subtract(1, 'months')
                                                .endOf('month'),
                                          ],
                                      }}
                                    />
                                </RangeWrapper>
                            </FormItem>

                            <FormItem name="reportType" label="Тип отчета">
                                <div>
                                    <Radio.Group
                                      name="reportType"
                                      options={[
                                          {
                                              label: 'Часовой',
                                              value: 'hourly',
                                          },
                                          {
                                              label: 'Суточный',
                                              value: 'daily',
                                          },
                                      ]}
                                    />
                                </div>
                            </FormItem>
                        </FormBody>
                        <FormFooter>
                            <ButtonTT
                              color="white"
                              small
                              onClick={() =>
                                setIsActive((state) => !state)
                              }
                              style={{ marginRight: 16 }}
                            >
                                Отмена
                            </ButtonTT>
                            <StyledSubmit disabled={false}>
                                Применить настройки
                            </StyledSubmit>
                        </FormFooter>
                    </Form>
                </OpenedFilter>
              )}
          </Formik>
      </GraphFilter>
    )
}

interface GraphFilterFormProps {
    setGraphParam: Dispatch<SetStateAction<GraphParamsType>>
    setSearchQuery: Dispatch<SetStateAction<QueryInterface>>
    paramsList: GraphParamsType[]
}

interface FormValuesInterface {
    dateRange: Moment[]
    reportType: ReportType
}

const GraphFilter = styled.div`
    margin-top: 8px;
    margin-bottom: 16px;
    max-width: 600px;

    form {
        .ant-picker-input {
            width: 100%;
            input {
                font-size: 14px;
                line-height: 16px;
            }
        }
        .ant-picker {
            padding: 8px 8px 8px 16px;
            border-radius: 4px;
            width: 100%;
        }
    }
`

const OpenedFilter = styled.div`
    background: #fff;
    position: absolute;
    z-index: 1000;
    width: 100%;
    box-shadow: var(--shadow);
`

const FormBody = styled.div`
    padding: 16px 8px;
`

const FormFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 16px 8px;
    background-color: var(--bg);
`

const StyledSubmit = styled(SubmitButton)`
    background: #189ee9;
    transition: background-color 150ms linear 0s, transform 150ms linear 0s,
        border-color 150ms linear 0s;
    border-radius: 4px;

    &:before {
        display: none;
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 0;
        position: absolute;
        border-right: 1px solid rgba(39, 47, 90, 0.8);
        border-bottom: 1px solid rgba(39, 47, 90, 0.8);
        border-radius: inherit;
        background-color: transparent;
    }

    &:hover:not(:disabled) {
        transform: translate(-4px, -4px);

        &:before {
            display: block;
            transform: translate(4px, 4px);
        }
    }
`

const RangeWrapper = styled.div`
    .ant-picker-ranges .ant-picker-preset > .ant-tag-blue {
        color: #1890ff;
        background: transparent;
        border-color: transparent;
        cursor: pointer;
    }

    .ant-picker-ranges .ant-picker-preset > .ant-tag-blue {
        &:hover {
            background: rgba(24, 158, 233, 0.1);
            border-color: #189ee9;
        }

        cursor: pointer;
    }

    div:nth-child(2) {
        position: static !important;
    }

    .ant-picker-dropdown {
        position: static !important;
    }
`

export default GraphFilterForm
