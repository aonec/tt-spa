import React, {Dispatch, SetStateAction, useState} from 'react';
import moment from "moment";
import {FormItem, FormikDebug, AutoComplete, DatePicker, Form, Radio, SubmitButton, Select} from "formik-antd";
import {Formik} from "formik";
import {RequestNodeReadingsFunctionInterface} from "../../../_api/node_readings_page";
import {AutoComplete as $AutoComplete, Button, Tooltip} from "antd";
import {GraphParamsType} from "../Graph";
import IconTT from "../../../tt-components/IconTT";
import styled from "styled-components";
import {translateParam} from "../utils";
import ButtonTT from "../../../tt-components/ButtonTT";

interface GraphFilterFormProps {
    setGraphParam: Dispatch<SetStateAction<GraphParamsType>>
    setSearchQuery: Dispatch<SetStateAction<RequestNodeReadingsFunctionInterface>>
    paramsList: GraphParamsType[]
}

moment.locale('ru');


const GraphFilterForm: React.FC<GraphFilterFormProps> = (
    {setGraphParam, setSearchQuery, paramsList}
) => {

    const [isActive, setIsActive] = useState(true);

    const onSelectHandler = (value: GraphParamsType) => {
        setGraphParam(value);
    }



    const handleSubmit = (values, actions) => {
        setSearchQuery((prevQuery) => {
                return ({
                    ...prevQuery,
                    from: values.dateRange[0].set({hour: 0, minute: 0, second: 0, millisecond: 0}).add(moment().utcOffset(), 'minute').toISOString(),
                    to: values.dateRange[1].set({hour:23,minute:0,second:0,millisecond:0}).add(moment().utcOffset(), 'minute').toISOString(),
                    reportType: values.reportType
                })
            }
        )
        actions.setSubmitting(false);
    }

    const options = paramsList.map((param) => ({label: translateParam(param), value: param}));

    return (
        <GraphFilter>
            <Formik
                initialValues={{
                    dateRange: [
                        moment().subtract(1, 'week').set({hour:0,minute:0,second:0,millisecond:0}),
                        moment().set({hour:23,minute:0,second:0,millisecond:0}),
                    ],
                    reportType: "daily",
                    autocomplete: paramsList[0]
                }}
                onSubmit={handleSubmit}
            >

                {isActive
                    ?
                    <div style={{display: 'flex', marginBottom: 10, paddingLeft: 8, paddingTop: 16}}>
                        <Tooltip title="Настройка параметров">
                            <div style={{marginRight: 16}}>
                                <Button onClick={() => setIsActive(state => !state)}
                                        icon={<IconTT icon="searchFilter"/>} />
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
                    : <OpenedFilter>
                        <Form>
                            <FormBody>
                            <Tooltip title="Настройка параметров">
                                <Button onClick={() => setIsActive(state => !state)}
                                        style={{marginBottom: 8}}
                                        icon={<IconTT icon="searchFilter"/>} />
                            </Tooltip>
                            <FormItem name="dateRange" label="Произвольный период" >
                                <div>
                                    <DatePicker.RangePicker
                                        name="dateRange"
                                        format='DD MMMM YYYY'
                                        style={{marginRight: 16}}
                                    />
                                </div>
                            </FormItem>
                            <FormItem name="reportType" label="Тип отчета" >
                                <div>
                                    <Radio.Group
                                        name="reportType"
                                        options={[
                                            {label: "Часовой", value: "hourly"},
                                            {label: "Суточный", value: "daily"},
                                        ]}
                                    />
                                </div>
                            </FormItem>
                            </FormBody>
                            <FormFooter>
                                <ButtonTT color="white" small onClick={() => setIsActive(state => !state)} style={{marginRight: 16}}>Отмена</ButtonTT>
                             <StyledSubmit disabled={false}>Применить настройки</StyledSubmit>
                            </FormFooter>
                        </Form>
                    </OpenedFilter>
                }
            </Formik>
        </GraphFilter>
    );
};

const GraphFilter = styled.div`
  margin-top: 8px;
  max-width: 600px;
          //padding: 0 16px 8px;

  //padding: 16px;
  
  form {
    .ant-picker-input {
      width: 100%;
        input {
          font-size: 14px;
          line-height: 16px;
        }
    }
    .ant-picker {
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
  //padding: 16px 8px;

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
  transition: background-color 150ms linear 0s, transform 150ms linear 0s, border-color 150ms linear 0s;
  border-radius: 4px;
  
 &:before {
    display: none;
    content: "";
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


export default GraphFilterForm;
