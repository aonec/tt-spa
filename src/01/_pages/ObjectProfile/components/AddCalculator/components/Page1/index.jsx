import React, { useContext } from "react";
import { ConfigProvider, DatePicker, Space } from "antd";
import ruRu from "antd/es/locale/ru_RU";
import moment from "moment";
import { AddDeviceContext } from "../../index";
import { Label, InputTT } from "01/tt-components";

export const Page1 = () => {
  console.log("Page1");

  const {
    serialNumberRandom,
    deviceAddressRandom,
    onInputChange,
    lastCommercialAccountingDate,
    datetoISOString,
    lastCheckingDate,
    futureCheckingDate,
    futureCommercialAccountingDate,
    addPeriod,
  } = useContext(AddDeviceContext);

  const items = [
    {
      id: 1,
      model: "ТЭМ-106",
    },
    {
      id: 2,
      model: "ТЭМ-104",
    },
    {
      id: 3,
      model: "ВКТ-7",
    },
    {
      id: 4,
      model: "ТВ-7",
    },
    {
      id: 5,
      model: "ВИСТ",
    },
  ];

  const handler = (date) => {
    console.log("handler", date.toISOString());
  };

  const buttonHandler = () => {
    console.log(
      "futureCommercialAccountingDate",
      futureCommercialAccountingDate
    );
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="tt-labelandinput">
        <Label color="grey" htmlFor="#resource" className="tt-label">
          Серийный номер
        </Label>
        <InputTT
          id="serialNumber"
          // className="tt-input"
          type="number"
          required
          defaultValue={serialNumberRandom}
          onChange={(event) => onInputChange(event)}
        />
      </div>

      <div className="tt-labelandinput">
        <Label color="grey" htmlFor="#type" className="tt-label">
          Тип вычислителя
        </Label>
        <select
          id="infoId"
          className="tt-select"
          onChange={(event) => onInputChange(event)}
        >
          <option className="tt-option" id="1">
            ТЭМ-106
          </option>
          <option className="tt-option" id="2">
            ТЭМ-104
          </option>
          <option className="tt-option" id="3">
            ВКТ-7
          </option>
          <option className="tt-option" id="4">
            ТВ-7
          </option>
          <option className="tt-option" id="5">
            ВИСТ
          </option>
        </select>
      </div>

      <div className="tt-labelandinput">
        <Label color="grey" htmlFor="#resource" className="tt-label">
          Дата ввода в эксплуатацию
        </Label>
        <ConfigProvider locale={ruRu}>
          <DatePicker
            defaultValue={moment()}
            onChange={(date, dateString) => {
              datetoISOString(date, dateString, lastCommercialAccountingDate);
            }}
          />
        </ConfigProvider>
      </div>

      <div className="tt-labelandinput">
        <Label color="grey" htmlFor="#resource" className="tt-label">
          Дата Поверки
        </Label>
        <ConfigProvider locale={ruRu}>
          <DatePicker
            defaultValue={moment()}
            onChange={(date, dateString) => {
              datetoISOString(date, dateString, lastCheckingDate);
            }}
          />
        </ConfigProvider>
      </div>

      <div className="tt-labelandinput">
        <Label color="grey" htmlFor="#resource" className="tt-label">
          Дата Следующей поверки
        </Label>
        <ConfigProvider locale={ruRu}>
          <DatePicker
            defaultValue={moment()}
            onChange={(date, dateString) => {
              datetoISOString(date, dateString, futureCheckingDate);
            }}
          />
        </ConfigProvider>
      </div>

      <div className="tt-labelandinput">
        <Label color="grey" htmlFor="#resource" className="tt-label">
          Срок эксплуатации по нормативу
        </Label>
        {/* futureCommercialAccountingDate */}
        <select
          id="resource"
          className="tt-select"
          onChange={(event) => {
            addPeriod(event.target.value, futureCommercialAccountingDate);
          }}
          // onChange={buttonHandler}
        >
          <option className="tt-option">4 года</option>
          <option className="tt-option">6 лет</option>
        </select>
      </div>
    </div>
  );
};
export default Page1;
