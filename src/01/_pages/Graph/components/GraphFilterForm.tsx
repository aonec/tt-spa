import React, {Dispatch, SetStateAction, useState} from 'react';
import moment from "moment";
import {FormikDebug, AutoComplete, DatePicker, Form, Radio, SubmitButton, Select} from "formik-antd";
import {Formik} from "formik";
import {RequestNodeReadingsFunctionInterface} from "../../../_api/node_readings_page";
import {AutoComplete as $AutoComplete, Button, Tooltip} from "antd";
import {GraphParamsType} from "../Graph";
import IconTT from "../../../tt-components/IconTT";

interface GraphFilterFormProps {
  setGraphParam: Dispatch<SetStateAction<GraphParamsType>>
  setSearchQuery: Dispatch<SetStateAction<RequestNodeReadingsFunctionInterface>>
  paramsList: GraphParamsType[]
  // setSearchQuery:
}

const {Option} = Select;

const GraphFilterForm: React.FC<GraphFilterFormProps> = ({setGraphParam, setSearchQuery, paramsList}) => {

  const [showFilter, setShowFilter] = useState(false);

  const onSelectHandler = (value: GraphParamsType) => {
    setGraphParam(value);
  }

  const handleSubmit = (values, actions) => {
    debugger;
    setSearchQuery((prevQuery) => {
      debugger;
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
  
  const translateParam = (param: GraphParamsType) => {
    switch (param) {
      case "InputVolume":
        return "Входящий объем"
      case "Energy":
        return "Энергия"
      case "DeltaVolume":
        return "Расход по объему"
    }
  }

  const options = paramsList.map((param) => ({label: translateParam(param), value: param}));

  return (
    <div>
      <Tooltip title="Настройка параметров">
          <Button onClick={() => setShowFilter(state => !state)} style={{display: 'flex', justifyContent: 'center'}} shape="round" icon={<IconTT icon="searchFilter"/>} />
      </Tooltip>
      <Formik
        initialValues={{
          // dateRange: formInitialDates(),
          dateRange: [
            moment().subtract(1, 'week').set({hour:23,minute:0,second:0,millisecond:0}),
            moment().set({hour:0,minute:0,second:0,millisecond:0})
          ],
          reportType: "daily",
          autocomplete: paramsList[0]
        }}
        onSubmit={handleSubmit}
      >

        <Form>
          <div hidden={!showFilter}>
          <DatePicker.RangePicker
            name="dateRange"
            style={{marginRight: 16}}

          />
          <Radio.Group
            name="reportType"
            options={[
              {label: "Часовой", value: "hourly"},
              {label: "Суточный", value: "daily"},
            ]}
          />
          <SubmitButton disabled={false}>Отправить</SubmitButton>
          </div>

          <Select
            style={{ width: 200 }}
            name="autocomplete"
            placeholder="Autocomplete"
            showArrow={true}
            options={options}
            onSelect={onSelectHandler}
          />
            {/*<Option value="123">1</Option>*/}
            {/*<Option value="456">2</Option>*/}
            {/*<Option value="789">3</Option>*/}
          {/*</Select>*/}
          {/*<FormikDebug style={{ maxWidth: 400 }} />*/}
        </Form>
      </Formik>
    </div>
  );
};

export default GraphFilterForm;
