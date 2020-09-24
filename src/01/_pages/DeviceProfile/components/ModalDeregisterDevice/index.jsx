import React, { useState, useContext } from "react";
import { ConfigProvider, DatePicker } from "antd";
import "antd/dist/antd.css";
import { convertDateOnly } from "01/_api/utils/convertDate";
import { deregisterDevice } from "01/_api/device_page";
import moment from "moment";
import $ from "jquery";
import ruRu from "antd/es/locale/ru_RU";
import {
  Modal,
  ModalWrap,
  ModalTop,
  ModalMain,
  ModalBottom,
  ModalClose,
} from "01/tt-components/Modal";

import { DeviceContext } from "../../DeviceProfile";
import { Label, Title, Text, Icon } from "../../../../tt-components";
import { ButtonTT } from "../../../../tt-components/ButtonTT";
import "01/tt-components/antd.scss";

const hideMe = () => {
  $("#modal-deregister-device").css("display", "none");
};

export const ReportContext = React.createContext();

export const ModalDeregisterDevice = () => {
  const { device, calcModel } = useContext(DeviceContext);
  const { id, model, serialNumber } = device;
  const [selecteddate, setSelecteddate] = useState(convertDateOnly(moment()));

  // const Device = {
  //   deviceId: id,
  //   documentsIds: [],
  //   closingDateTime: `${selecteddate}T00:00:00.373Z`,
  // };
  
  const onSubmit = () => {
    const Device = {
      deviceId: id,
      documentsIds: [],
      closingDateTime: `${selecteddate}T00:00:00.373Z`,
    };

    deregisterDevice(Device)
  }
  // const DEFAULT_DEVICE = {
  //   deviceId: 1553348,
  //   documentsIds: [],
  //   closingDateTime: '2020-09-20T00:00:00.373Z',
  // };

  const datePickerHandler = (date, dateString) => {
    setSelecteddate(dateString);
    console.log(date.toISOString())
  };

  return (
    <ReportContext.Provider value={{}}>
      <Modal id="modal-deregister-device" ref={(value)=>{this.modalref = value}}>
        <ModalWrap>
          {/* <ModalClose onClick={hideMe} /> */}
          <ModalClose someprop={this.modalref} />
          <ModalTop>
            <Title size="middle" color="black">
              {`Вы действительно хотите снять ${model ||
                calcModel} (${serialNumber}) с учета?`}
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
                onChange={datePickerHandler}
                defaultValue={moment()}
                format="YYYY-MM-DD"
              />
            </ConfigProvider>
          </ModalMain>

          <ModalBottom>
            <ButtonTT onClick={hideMe}>Отмена</ButtonTT>
            <ButtonTT
              color="red"
              onClick={onSubmit}
              style={{ marginLeft: "24px" }}
            >
              Снять прибор с учета
            </ButtonTT>
          </ModalBottom>
        </ModalWrap>
      </Modal>
    </ReportContext.Provider>
  );
};

export default ModalDeregisterDevice;
