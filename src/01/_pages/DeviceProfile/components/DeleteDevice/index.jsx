import React, {
  useState, useContext,
} from 'react';
import './modal.scss';
import { ConfigProvider, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { convertDateOnly } from '01/_api/utils/convertDate';
import moment from 'moment';
import $ from 'jquery';
import ruRu from 'antd/es/locale/ru_RU';
import axios from 'axios';
import { Icon } from '../../../../_components/Icon';
import { DeviceContext } from '../../DeviceProfile';
import { Label } from '../../../../tt-components/Label';
import { ButtonTT } from '../../../../tt-components/ButtonTT';

const hideMe = () => {
  $('#delete-device').css('display', 'none');
};

export const ReportContext = React.createContext();

export const DeleteDevice = () => {
  const { device, calcModel } = useContext(DeviceContext);
  const { id, model, serialNumber } = device;
  const [selecteddate, setSelecteddate] = useState(convertDateOnly(moment()));

  const Device = {
    deviceId: id,
    documentsIds: [],
    closingDateTime: `${selecteddate}T00:00:00.373Z`,
  };

  const Template = {
    deviceId: 1553348,
    documentsIds: [],
    closingDateTime: '2020-09-20T12:40:51.373Z',
  };

  const deregisterDevice = () => {
    // console.log(Device);
    async function getCalculatorResources(id = '') {
      try {
        const res = await axios.post('MeteringDevices/close', Device);
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
        alert('Что-то пошло не так: попробуйте еще раз');
      });
  };

  function DatePickerHadler(date, dateString) {
    setSelecteddate(dateString);
  }

  return (
    <ReportContext.Provider value={{}}>
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
              {`Вы действительно хотите снять ${model
                || calcModel} (${serialNumber}) с учета?`}
            </h3>
            <p>
              После этого прибор перейдет в архив и показания по нему перестанут
              учитываться
            </p>
          </div>
          <div style={{ padding: '24px' }}>
            <Label color="rgba">Дата снятия прибора с учета</Label>
            <ConfigProvider locale={ruRu}>
              <DatePicker
                required
                onChange={DatePickerHadler}
                defaultValue={moment()}
                format="YYYY-MM-DD"
              />
            </ConfigProvider>
          </div>

          <div className="modal__bottom">
            <ButtonTT onClick={hideMe}>Отмена</ButtonTT>
            <ButtonTT color="red" onClick={deregisterDevice}>
              Снять прибор с учета
            </ButtonTT>
          </div>
        </div>
      </div>
    </ReportContext.Provider>
  );
};

export default DeleteDevice;
