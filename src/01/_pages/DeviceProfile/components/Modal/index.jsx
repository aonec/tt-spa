import React, { useState, useContext, useRef } from "react";
import "./modal.scss";
import { Radio, ConfigProvider, DatePicker } from "antd";
import "antd/dist/antd.css";
import ruRu from "antd/es/locale/ru_RU";
import { convertDateOnly } from "01/_api/utils/convertDate";
import moment from "moment";
import $ from "jquery";
import { DeviceContext } from "../../DeviceProfile";
import { Icon } from "../../../../_components/Icon";

export const Popup = () => {
  const { device, building } = useContext(DeviceContext);
  const { id, resource, model } = { ...device };
  const { number, street } = { ...building };

  const periodList = [
    { label: "Месячный", value: "month" },
    { label: "Суточный", value: "day" },
    { label: "Годовой", value: "year" },
  ];

  const detailList = [
    { label: "Суточный", value: "daily" },
    { label: "Часовой", value: "hourly" },
  ];

  const period = useRef("month");
  const detail = useRef("daily");

  const [begin, setBegin] = useState(moment().subtract(1, "month"));
  const [end, setEnd] = useState(moment());

  const datePickerHandler = (event) => {
    setBegin(event[0] || begin);
    setEnd(event[1] || end);
  };
  const onPeriodChange = (e) => {
    const res = e.target.value;
    period.current = res;
    setBegin(moment().subtract(1, res));
    setEnd(moment());
  };

  const onDetailChange = (e) => {
    const result = e.target.value;
    detail.current = result;
  };

  const { RangePicker } = DatePicker;
  const downloadReport = () => {
    const link = `http://84.201.132.164:8080/api/reports/xlsx?deviceId=${id}&ereporttype=${
      detail.current
    }&resourcetype=coldwatersupply&entrynumber=2&from=${convertDateOnly(
      begin
    )}T00:00:00Z&to=${convertDateOnly(end)}T00:00:00Z`;
    // const template = 'http://84.201.132.164:8080/api/reports/xlsx?deviceId=1510&ereporttype=daily&resourcetype=heat&entrynumber=1&from=2020-08-15T00:00:00Z&to=2020-08-25T00:00:00Z'
    window.location.assign(link);
  };
  const hideMe = () => {
    const el = document.querySelector(".overlay");
    el.style.display = "none";
  };

  return (
    <div className="overlay">
      <div className="temp">
        <Icon
          className="modal__close"
          icon="close"
          color="#272F5A"
          onClick={hideMe}
        />
        <div className="modal__top">
          <h3 className="modal__title">
            Выгрузить отчет о общедомовом потреблении
          </h3>
          <div>
            <label className="modal__label" htmlFor="#input">
              Название отчета
            </label>
            <input
              className="modal__input"
              id="input"
              value={`${model}_${street}_${number}.exls`}
            />
          </div>
          <div className="period_and_type ">
            <div className="period">
              <label className="modal__label" htmlFor="#period">
                Период выгрузки
              </label>
              <ConfigProvider locale={ruRu}>
                <RangePicker
                  allowClear={false}
                  size="48px"
                  value={[begin, end]}
                  placeholder={["Дата Начала", "Дата окончания"]}
                  onChange={(event) => {
                    datePickerHandler(event);
                  }}
                />
              </ConfigProvider>
            </div>
            <div className="type">
              <label className="modal__label" htmlFor="#type">
                Тип архива
              </label>

              <Radio.Group
                defaultValue="month"
                size="large"
                onChange={(event) => onPeriodChange(event)}
              >
                <Radio.Button value="month" checked>
                  Месячный
                </Radio.Button>
                <Radio.Button value="day">Суточный</Radio.Button>
                <Radio.Button value="year">Годовой</Radio.Button>
              </Radio.Group>
              <label className="modal__label" htmlFor="#type">
                Детализация
              </label>

              <Radio.Group
                defaultValue="daily"
                size="large"
                onChange={(event) => onDetailChange(event)}
              >
                <Radio.Button value="daily">Суточный</Radio.Button>
                <Radio.Button value="hourly">Часовой</Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>

        <div className="modal__bottom">
          <button
            className="modal__button modal__button_cancel"
            onClick={hideMe}
          >
            Отмена
          </button>
          <button
            className="modal__button modal__button_ok"
            onClick={downloadReport}
          >
            Выгрузить
          </button>
        </div>
      </div>
    </div>
  );
};
export default Popup;
