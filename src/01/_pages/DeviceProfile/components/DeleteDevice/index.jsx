import React, { useState, useContext } from 'react';
import './modal.scss';
import { ConfigProvider, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { convertDateOnly } from '01/_api/utils/convertDate';
import { deregisterDevice } from '01/_api/device_page';
import moment from 'moment';
import $ from 'jquery';
import ruRu from 'antd/es/locale/ru_RU';
import styled, { css } from 'styled-components';
import { Icon } from '../../../../_components/Icon';
import { DeviceContext } from '../../DeviceProfile';
import { Label, Title, Text } from '../../../../tt-components';
import { ButtonTT } from '../../../../tt-components/ButtonTT';
import '01/tt-components/antd.scss';

const hideMe = () => {
  $('#modal-deregister-device').css('display', 'none');
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

  // const Template = {
  //   deviceId: 1553348,
  //   documentsIds: [],
  //   closingDateTime: '2020-09-20T12:40:51.373Z',
  // };

  const DatePickerHadler = (date, dateString) => {
    setSelecteddate(dateString);
  };

  const Template = styled.h2``;

  const Modal = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    z-index: 2;
  `;

  const ModalWrap = styled.div`
    margin: 100px auto;
    background: #ffffff;
    width: 800px;
    min-height: 384px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  `;

  const ModalTop = styled.div`
    padding: 16px 32px;
  `;

  const ModalBottom = styled.div`
    padding: 16px 32px;
    background: #f3f5f6;
    display: flex;
    justify-content: flex-end;
  `;

  const ModalMain = styled.div`
    padding: 24px;
  `;

  return (
    <ReportContext.Provider value={{}}>
      <Modal id="modal-deregister-device">
        <ModalWrap>
          <Icon
            className="modal__close"
            icon="close"
            color="#272F5A"
            onClick={hideMe}
          />
          <ModalTop>
            <Title size="middle" color="black">
              {`Вы действительно хотите снять ${model
                || calcModel} (${serialNumber}) с учета?`}
            </Title>
            <Text>
              После этого прибор перейдет в архив и показания по нему перестанут
              учитываться
            </Text>
          </ModalTop>

          <ModalMain>
            <Label color="rgba">Дата снятия прибора с учета</Label>
            <ConfigProvider locale={ruRu}>
              <DatePicker
                required
                onChange={DatePickerHadler}
                defaultValue={moment()}
                format="YYYY-MM-DD"
              />
            </ConfigProvider>
          </ModalMain>

          <ModalBottom className="modal__bottom">
            <ButtonTT onClick={hideMe}>Отмена</ButtonTT>
            <ButtonTT
              color="red"
              onClick={() => {
                deregisterDevice(Device);
              }}
              style={{ marginLeft: '24px' }}
            >
              Снять прибор с учета
            </ButtonTT>
          </ModalBottom>
        </ModalWrap>
      </Modal>
    </ReportContext.Provider>
  );
};

export default DeleteDevice;
