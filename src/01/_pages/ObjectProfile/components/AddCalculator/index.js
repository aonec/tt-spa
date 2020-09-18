import React, { useEffect, useState, useRef } from 'react';
import './modal.scss';
import $ from 'jquery';
import axios from 'axios';
import { Icon } from '../../../../_components/Icon';
import TabsComponent from './components/Tabs';
import { button } from "../../../../r_comp";
import moment from "moment";

export const AddDeviceContext = React.createContext();

export const ModalCalculator = () => {

    const items = [
      {
        "id": 1,
        "model": "ТЭМ-106"
      },
      {
        "id": 2,
        "model": "ТЭМ-104"
      },
      {
        "id": 3,
        "model": "ВКТ-7"
      },
      {
        "id": 4,
        "model": "ТВ-7"
      },
      {
        "id": 5,
        "model": "ВИСТ"
      }
    ]

    const [tab, setTab] = useState(1);
    const [ok, setOk] = useState('Далее');

    const serialNumberRandom = randomInteger(1, 999999999);
    const deviceAddressRandom = randomInteger(1, 255);
    const serialNumber = useRef(serialNumberRandom)
    const checkingDate = useRef(convertDateOnly(moment()));
    const futureCheckingDate = useRef(convertDateOnly(moment()));
    const futureCommercialAccountingDate = useRef(convertDateOnly(moment()));

    const onInputChange = (event) => {
      console.log("onInputChange", event);
      console.log("event.target", event.target)
      var id = $(event.target).attr("id");
      switch (id) {
        case 'serialNumber':
          serialNumber.current = event.target.value;
          break;
        default:
          alert("Нет таких значений");
      }

      console.log(serialNumber.current)

    }

    function callback(key){
      console.log('Был = ', tab);
      setTab(key);
      if (key == 3) {
        setOk('Выгрузить');
      } else {
        setOk('Далее');
      }
    }

    const nextOrDone = () => {

      console.log("tab = ", tab)
      if (tab == 3) {
        alert("Cейчас будем отправлять данные!")
        setCalculator();
      } else {
        $('.ant-tabs-tab-active').next().click();
      }
    };

    const postODPU = () => {
      console.log('postODPU');
    };

    function randomInteger(min, max){
      let rand = min + Math.random() * (max - min);
      return Math.round(rand);
    }

  function convertDateOnly(date) {
    const dateOnly = 'YYYY-MM-DD';
    const newDate = moment(date).format(dateOnly);
    return (
      `${newDate}T14:36:28.797Z`
    )

  }

    const someCalculator = {
      "serialNumber": `${serialNumberRandom}`,
      "checkingDate": "2020-09-17T14:36:28.797Z",
      "futureCheckingDate": "2020-09-17T14:36:28.797Z",
      "lastCommercialAccountingDate": "2020-09-17T14:36:28.797Z",
      "connection": {
        "ipV4": "192.168.1.1",
        "deviceAddress": deviceAddressRandom,
        "port": 3312
      },
      "futureCommercialAccountingDate": "2020-09-17T14:36:28.797Z",
      "housingStockId": 584,
      "infoId": 2
    }

    const setCalculator = () => {
      console.log(someCalculator)

      async function getCalculatorResources(id = ''){
        try {
          const res = await axios.post(`Calculators`, someCalculator);
          console.log(res)
          return res;
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      }

      getCalculatorResources().then((resonse) => {
        alert("Вычислитель успешно создан !")
      }).catch((response) => {
        alert("Что-то пошло не так: попробуйте исправить CЕРИЙНЫЙ НОМЕР И АДРЕС УСТРОЙСТВА")
      })


    }


    const hideMe = () => {
      $('.overlay-addcalculator').css('display', 'none');
    };



    const buttonHandler = () => {
      console.log("checkingDate", convertDateOnly(checkingDate.current))
      console.log(moment().format())
    }
    console.log("ModalODPU'");
    return (
      <AddDeviceContext.Provider
        value={{ tab, setTab, callback, deviceAddressRandom, serialNumberRandom, onInputChange }}
      >
        <div className="overlay-addcalculator">

          <div className="modal-odpu-add">
            <button onClick={buttonHandler}>button</button>
            <Icon
              className="modal__close"
              icon="close"
              color="#272F5A"
              onClick={hideMe}
            />
            <h2 className="title-32">Добавление нового вычислителя</h2>

              <TabsComponent/>

              <div className="modal__bottom">
                <button
                  className="modal__button modal__button_cancel"
                  onClick={hideMe}
                >
                  Отмена
                </button>
                <button
                  className="modal__button modal__button_ok"
                  onClick={nextOrDone}
                >
                  {ok}
                </button>
              </div>

          </div>
        </div>
      </AddDeviceContext.Provider>
    );
  }
;
export default ModalCalculator;
