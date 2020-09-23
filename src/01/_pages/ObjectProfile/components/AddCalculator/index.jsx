import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import "01/tt-components/antd.scss";
import {
  Modal,
  ModalWrap,
  ModalTop,
  ModalMain,
  ModalBottom,
  ModalClose,
} from "01/tt-components/Modal";

import { Label, Title, Text, Icon, ButtonTT } from "../../../../tt-components";
import TabsComponent from "./components/Tabs";

export const AddDeviceContext = React.createContext();

export const ModalCalculator = () => {
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

  const [tab, setTab] = useState(1);
  const [ok, setOk] = useState("Далее");

  const serialNumberRandom = randomInteger(1, 999999999);
  const deviceAddressRandom = randomInteger(1, 255);
  const serialNumber = useRef(`${serialNumberRandom}`);
  const checkingDate = useRef(convertDateOnly(moment()));
  const futureCheckingDate = useRef(convertDateOnly(moment()));
  const futureCommercialAccountingDate = useRef(convertDateOnly(moment()));
  const port = useRef(1234);
  const infoId = useRef(1);
  const ipV4 = useRef("192.168.0.1");

  const { 0: objid } = useParams();

  const onInputChange = (event) => {
    console.log("onInputChange", event);
    console.log("event.target", event.target);

    const selected = $("#infoId")
      .find("option:selected")
      .attr("id");

    const id = $(event.target).attr("id");
    switch (id) {
      case "serialNumber":
        serialNumber.current = event.target.value;
        console.log(serialNumber.current);
        break;
      case "infoId":
        infoId.current = selected;
        console.log(selected);
        console.log(infoId.current);
        break;
      case "port":
        port.current = event.target.value;
        console.log(port.current);
        break;
      case "ipV4":
        ipV4.current = event.target.value;
        console.log(ipV4.current);
        break;

      default:
        alert("Нет таких значений");
    }
  };

  function callback(key) {
    console.log("Был = ", tab);
    setTab(key);
    if (key == 3) {
      setOk("Выгрузить");
    } else {
      setOk("Далее");
    }
  }

  const nextOrDone = () => {
    console.log("tab = ", tab);
    if (tab == 3) {
      alert("Cейчас будем отправлять данные!");
      setCalculator();
    } else {
      $(".ant-tabs-tab-active")
        .next()
        .click();
    }
  };

  const postODPU = () => {
    console.log("postODPU");
  };

  function randomInteger(min, max) {
    const rand = min + Math.random() * (max - min);
    return Math.round(rand);
  }

  function convertDateOnly(date) {
    const dateOnly = "YYYY-MM-DD";
    const newDate = moment(date).format(dateOnly);
    return `${newDate}T14:36:28.797Z`;
  }

  const someCalculator = {
    serialNumber: serialNumber.current,
    checkingDate: "2020-09-17T14:36:28.797Z",
    futureCheckingDate: "2020-09-17T14:36:28.797Z",
    lastCommercialAccountingDate: "2020-09-17T14:36:28.797Z",
    connection: {
      ipV4: ipV4.current,
      deviceAddress: deviceAddressRandom,
      port: parseInt(port.current),
    },
    futureCommercialAccountingDate: "2020-09-17T14:36:28.797Z",
    housingStockId: parseInt(objid),
    infoId: parseInt(infoId.current),
  };

  const setCalculator = () => {
    console.log(someCalculator);

    async function getCalculatorResources(id = "") {
      try {
        const res = await axios.post("Calculators", someCalculator);
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }

    getCalculatorResources()
      .then((resonse) => {
        alert("Вычислитель успешно создан !");
      })
      .catch((response) => {
        alert(
          "Что-то пошло не так: попробуйте исправить CЕРИЙНЫЙ НОМЕР И АДРЕС УСТРОЙСТВА"
        );
      });
  };

  const hideMe = () => {
    $("#add-calculator").css("display", "none");
  };

  const buttonHandler = () => {
    console.log(`${serialNumberRandom}`);
    console.log(serialNumber.current);
    console.log(infoId.current);
    console.log(objid);
  };

  return (
    <AddDeviceContext.Provider
      value={{
        tab,
        setTab,
        callback,
        deviceAddressRandom,
        serialNumberRandom,
        onInputChange,
      }}
    >
      <Modal id="add-calculator">
        <ModalWrap>
          <ModalClose onClick={hideMe} />
          <ModalTop>
            <Title size="middle" color="black">
              Добавление нового вычислителя
            </Title>
          </ModalTop>

          <ModalMain>
            <TabsComponent />
          </ModalMain>

          <ModalBottom>
            <ButtonTT onClick={hideMe}>Отмена</ButtonTT>
            <ButtonTT onClick={nextOrDone}>{ok}</ButtonTT>
          </ModalBottom>
        </ModalWrap>
      </Modal>
    </AddDeviceContext.Provider>
  );
};
export default ModalCalculator;
