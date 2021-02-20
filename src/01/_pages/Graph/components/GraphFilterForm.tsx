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

interface GraphFilterFormProps {
  setGraphParam: Dispatch<SetStateAction<GraphParamsType>>
  setSearchQuery: Dispatch<SetStateAction<RequestNodeReadingsFunctionInterface>>
  paramsList: GraphParamsType[]
}

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
          from: values.dateRange[0].set({hour: 3, minute: 0, second: 0, millisecond: 0}).toISOString(),
          to: values.dateRange[1].add(1, "day").set({hour: 2, minute: 0, second: 0, millisecond: 0}).toISOString(),
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
            moment().subtract(1, 'week').set({hour:23,minute:0,second:0,millisecond:0}),
            moment().set({hour:0,minute:0,second:0,millisecond:0})
          ],
          reportType: "daily",
          autocomplete: paramsList[0]
        }}
        onSubmit={handleSubmit}
      >

        {isActive
          ?
          <div style={{display: 'flex', marginBottom: 10}}>
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
          : <div>
            <Form>
              <Tooltip title="Настройка параметров">
                <Button onClick={() => setIsActive(state => !state)}
                        style={{marginBottom: 8}}
                        icon={<IconTT icon="searchFilter"/>} />
              </Tooltip>
              <FormItem name="dateRange" label="Произвольный период" >
                <div>
                  <DatePicker.RangePicker
                    name="dateRange"
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
              <Button onClick={() => setIsActive(state => !state)} style={{marginRight: 16}}>Отмена</Button>
              <SubmitButton disabled={false}>Применить настройки</SubmitButton>
            </Form>
          </div>
        }
      </Formik>
    </GraphFilter>
  );
};

const GraphFilter = styled.div`
  max-width: 600px;
  margin-top: 8px;
  
  form {
    .ant-picker-input {
      width: 100%;
        input {
          font-size: 14px;
          line-height: 16px;
        }
    }
    .ant-picker {
          padding: 8px 16px;
          width: 100%;
        }
  } 
`


export default GraphFilterForm;
