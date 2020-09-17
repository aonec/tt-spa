import React, { useEffect, useState } from 'react';
import './modal.scss';
import $ from 'jquery';
import { Icon } from '../../../../_components/Icon';
import TabsComponent from './components/Tabs';
import axios from 'axios';

export const AddDeviceContext = React.createContext();

export const ModalCalculator = () => {
  const [tab, setTab] = useState(1);
  const [ok, setOk] = useState('Далее');

  function callback(key){
    console.log('Был = ', tab);
    setTimeout(setTab(key));
    console.log('Стал = ', key);
  }

  const nextOrDone = () => {
    console.log('nextOrDone');
    console.log('сейчас номер вкладки = ', tab);
    console.log($('.ant-tabs-tab-active'));

    $('.ant-tabs-tab-active').next().click();

    console.log('tab', tab);
  };
  const postODPU = () => {
    console.log('postODPU');
  };

  const someCalculator = {
    serialNumber: '9876543210',
    checkingDate: '2020-09-17T14:36:28.797Z',
    futureCheckingDate: '2020-09-17T14:36:28.797Z',
    lastCommercialAccountingDate: '2020-09-17T14:36:28.797Z',
    documentsIds: [
      0,
    ],
    connection: {
      ipV4: '192.168.1.1',
      deviceAddress: 0,
      port: 3312,
    },
    futureCommercialAccountingDate: '2020-09-17T14:36:28.797Z',
    housingStockId: 584,
    infoId: 0,
  };

  // Получить  Вычислителя
  // async function getCalculator(id = ''){
  //   try {
  //     //  1141
  //     // const res = await axios.get(`Calculators/${id}`);
  //
  //     // const res = await axios.get('Calculators/1141');
  //     const res = await axios.post("Calculators", someCalculator);
  //     console.log(res);
  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //     throw { typeODPU: 'getCalculatorResources', message: 'Произошла ошибка при загрузке ресурсов вычислителя' };
  //   }
  // }

  async function setCalculator(id = ''){

    axios.post('https://transparent-staging.herokuapp.com/api/Calculators', {
      serialNumber: '9876543210',
      checkingDate: '2020-09-17T14:36:28.797Z',
      futureCheckingDate: '2020-09-17T14:36:28.797Z',
      lastCommercialAccountingDate: '2020-09-17T14:36:28.797Z',
      documentsIds: [
        0,
      ],
      connection: {
        'ipV4': '192.168.1.1',
        deviceAddress: 0,
        port: 3312,
      },
      futureCommercialAccountingDate: '2020-09-17T14:36:28.797Z',
      housingStockId: 584,
      infoId: 0,
    })
      .then(function (response){
        console.log(response);
      })
      .catch(function (error){
        console.log(error);
      });

    // axios.post('https://transparent-staging.herokuapp.com/api/Calculators', someCalculator).then((response) => {
    //   console.log(response);
    // }).catch((response) => {
    //   console.log(response);
    // });
  }

  const hideMe = () => {
    $('.overlay').css('display', 'none');
  };
  const test = 'test';
  console.log("ModalODPU'");
  return (
    <AddDeviceContext.Provider
      value={{ tab, setTab, callback }}
    >
      <div className="overlay-addcalculator">
        <div className="modal-odpu-add">
          <Icon
            className="modal__close"
            icon="close"
            color="#272F5A"
            onClick={hideMe}
          />
          <h2 className="title-32">Добавление нового вычислителя</h2>
          {/*<form>*/}
          <TabsComponent/>

          <div className="modal__bottom">
            <button
              className="modal__button modal__button_ok"
              onClick={setCalculator}
              // type="submit"
            >
              Выгрузить
            </button>

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
          {/*</form>*/}

        </div>
      </div>
    </AddDeviceContext.Provider>
  );
};
export default ModalCalculator;
