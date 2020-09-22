import React, {
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import './modal.scss';
import {
  Radio, ConfigProvider, DatePicker, Tabs, Select,
} from 'antd';
import 'antd/dist/antd.css';
import { convertDateOnly } from '01/_api/utils/convertDate';
import moment from 'moment';
import $ from 'jquery';
import _ from 'lodash';
import ruRu from 'antd/es/locale/ru_RU';
import axios from 'axios';
import { Icon } from '../../../../_components/Icon';
import { DeviceContext } from '../../DeviceProfile';
import { Label } from '../../../../tt-components/Label';
import { Button } from '../../../../tt-components/Button';
import { ButtonDefault } from '../../../../tt-components/ButtonDefault';

const Translate = {
  Heat: 'Отопление',
  ColdWaterSupply: 'Холодная вода',
  HotWaterSupply: 'Горячая вода',
};

const hideMe = () => {
  $('#delete-device').css('display', 'none');
};

export const ReportContext = React.createContext();

export const DeleteDevice = () => {
  const { device, calcModel } = useContext(DeviceContext);
  const { id, model, serialNumber } = { ...device };

  useEffect(() => {

  }, []);

  const someFunc = () => {

  };

  const someCalculator = {
    deviceId: id,
    documentsIds: [],
    closingDateTime: '2020-09-22T12:40:51.373Z',
  };

  const Tenplate = {
    "deviceId": 1553348,
    "documentsIds":[],
    "closingDateTime":"2020-09-20T12:40:51.373Z"
  }


  const setCalculator = () => {
    console.log(someCalculator);
    async function getCalculatorResources(id = '') {
      try {
        const res = await axios.post('MeteringDevices/close', someCalculator);
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }

    getCalculatorResources()
      .then((resonse) => {
        alert('Вычислитель успешно снят с учета !');
      })
      .catch((response) => {
        alert(
          'Что-то пошло не так: попробуйте еще раз',
        );
      });
  };

  return (
    <ReportContext.Provider
      value={{}}
    >
      <div className="overlay" id="delete-device">
        <div className="modal-odpu">
          <Icon
            className="modal__close"
            icon="close"
            color="#272F5A"
            onClick={hideMe}
          />
          <div className="modal__top">
            <h3 className="modal__title">
              {`Вы действительно хотите снять ${model || calcModel} (${serialNumber}) с учета?`}
            </h3>
            <p>После этого прибор перейдет в архив и показания по нему перестанут учитываться</p>

          </div>
          <div style={{ padding: '24px' }}>
            <Label color="rgba">Дата снятия прибора с учета</Label>
            <ConfigProvider locale={ruRu}>
              <DatePicker required />
            </ConfigProvider>
          </div>

          <div className="modal__bottom">

            <button
              className="modal__button modal__button_cancel"
              onClick={hideMe}
            >
              Отмена
            </button>

            <ButtonDefault color="red" onClick={setCalculator}>Снять прибор с учета</ButtonDefault>

          </div>
        </div>
      </div>
    </ReportContext.Provider>
  );
};

export default DeleteDevice;

// const selectOptions = [
//   'Узел 1: ВКТ-7 (1234567890), ПРЭМ (1234567890), ПРЭМ (9876543210)',
//   'Узел 2: ВКТ-7 (9876543210), ПРЭМ (23549579374023), ПРЭМ(29387592701)',
// ];
