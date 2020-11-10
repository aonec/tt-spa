import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { ButtonTT } from '../../../../../tt-components';
import ModalCalculatorReportForm from './ModalCalculatorReportForm';
import axios from '../../../../../axios';
import { setDevices } from "../../../../../Redux/reducers/reducerDevicesPage";

const ModalCalculatorReport = () => {
  // const { deviceId } = useParams();

  // const deviceId = 1487756;

  const [device, setDevice] = useState({});


  const template = {
    "connection": {
      "isConnected": true,
        "ipV4": "192.168.100.6",
        "port": 4001,
        "deviceAddress": 1
    },
    "address": {
      "id": 226,
        "city": "Нижнекамск",
        "street": "Шинников",
        "housingStockNumber": "5",
        "corpus": null
    },
    "hubs": [
      {
        "hub": {
          "entryNumber": 1,
          "hubNumber": null,
          "pipeNumber": 0,
          "magistral": "FeedFlow"
        },
        "diameter": "80",
        "resource": "Heat",
        "housingMeteringDeviceType": "FlowMeter",
        "id": 1546256,
        "transactionType": null,
        "model": "РС (90-А)",
        "serialNumber": "057904",
        "managementFirm": {
          "id": 4,
          "name": "ООО УК\"ПЖКХ-17\"",
          "phoneNumber": null,
          "information": null,
          "timeZoneOffset": "03:00:00"
        },
        "lastCommercialAccountingDate": "2018-10-22T03:00:00",
        "futureCommercialAccountingDate": "2019-08-05T03:00:00",
        "lastCheckingDate": "2015-08-05T03:00:00",
        "futureCheckingDate": "2019-08-05T03:00:00",
        "closingDate": null
      },
      {
        "hub": {
          "entryNumber": 1,
          "hubNumber": null,
          "pipeNumber": 0,
          "magistral": "FeedFlow"
        },
        "diameter": null,
        "resource": "Heat",
        "housingMeteringDeviceType": "TemperatureSensor",
        "id": 1546257,
        "transactionType": null,
        "model": "КТСБ",
        "serialNumber": "148042",
        "managementFirm": {
          "id": 4,
          "name": "ООО УК\"ПЖКХ-17\"",
          "phoneNumber": null,
          "information": null,
          "timeZoneOffset": "03:00:00"
        },
        "lastCommercialAccountingDate": "2018-10-22T03:00:00",
        "futureCommercialAccountingDate": "2019-08-05T03:00:00",
        "lastCheckingDate": "2018-05-24T03:00:00",
        "futureCheckingDate": "2022-05-24T03:00:00",
        "closingDate": null
      },
      {
        "hub": {
          "entryNumber": 1,
          "hubNumber": null,
          "pipeNumber": 1,
          "magistral": "FeedBackFlow"
        },
        "diameter": "80",
        "resource": "Heat",
        "housingMeteringDeviceType": "FlowMeter",
        "id": 1546258,
        "transactionType": null,
        "model": "РС (90-А)",
        "serialNumber": "057898",
        "managementFirm": {
          "id": 4,
          "name": "ООО УК\"ПЖКХ-17\"",
          "phoneNumber": null,
          "information": null,
          "timeZoneOffset": "03:00:00"
        },
        "lastCommercialAccountingDate": "2018-10-22T03:00:00",
        "futureCommercialAccountingDate": "2019-08-05T03:00:00",
        "lastCheckingDate": "2015-08-05T03:00:00",
        "futureCheckingDate": "2019-08-05T03:00:00",
        "closingDate": null
      },
      {
        "hub": {
          "entryNumber": 2,
          "hubNumber": null,
          "pipeNumber": 3,
          "magistral": "FeedFlow"
        },
        "diameter": "80",
        "resource": "HotWaterSupply",
        "housingMeteringDeviceType": "FlowMeter",
        "id": 1546259,
        "transactionType": null,
        "model": "РС (90-А)",
        "serialNumber": "067618",
        "managementFirm": {
          "id": 4,
          "name": "ООО УК\"ПЖКХ-17\"",
          "phoneNumber": null,
          "information": null,
          "timeZoneOffset": "03:00:00"
        },
        "lastCommercialAccountingDate": "2019-03-07T03:00:00",
        "futureCommercialAccountingDate": "2019-08-17T03:00:00",
        "lastCheckingDate": "2020-07-22T03:00:00",
        "futureCheckingDate": "2024-07-22T03:00:00",
        "closingDate": null
      },
      {
        "hub": {
          "entryNumber": 2,
          "hubNumber": null,
          "pipeNumber": 3,
          "magistral": "FeedFlow"
        },
        "diameter": null,
        "resource": "HotWaterSupply",
        "housingMeteringDeviceType": "TemperatureSensor",
        "id": 1546260,
        "transactionType": null,
        "model": "КТСБ",
        "serialNumber": "1414158",
        "managementFirm": {
          "id": 4,
          "name": "ООО УК\"ПЖКХ-17\"",
          "phoneNumber": null,
          "information": null,
          "timeZoneOffset": "03:00:00"
        },
        "lastCommercialAccountingDate": "2019-03-07T03:00:00",
        "futureCommercialAccountingDate": "2019-08-17T03:00:00",
        "lastCheckingDate": "2018-06-27T03:00:00",
        "futureCheckingDate": "2022-06-27T03:00:00",
        "closingDate": null
      },
      {
        "hub": {
          "entryNumber": 2,
          "hubNumber": null,
          "pipeNumber": 4,
          "magistral": "FeedBackFlow"
        },
        "diameter": "50",
        "resource": "HotWaterSupply",
        "housingMeteringDeviceType": "FlowMeter",
        "id": 1546261,
        "transactionType": null,
        "model": "РС (72-А)",
        "serialNumber": "075426",
        "managementFirm": {
          "id": 4,
          "name": "ООО УК\"ПЖКХ-17\"",
          "phoneNumber": null,
          "information": null,
          "timeZoneOffset": "03:00:00"
        },
        "lastCommercialAccountingDate": "2019-03-07T03:00:00",
        "futureCommercialAccountingDate": "2019-08-17T03:00:00",
        "lastCheckingDate": "2020-06-10T03:00:00",
        "futureCheckingDate": "2024-06-10T03:00:00",
        "closingDate": null
      },
      {
        "hub": {
          "entryNumber": 2,
          "hubNumber": null,
          "pipeNumber": 5,
          "magistral": "FeedFlow"
        },
        "diameter": "32",
        "resource": "ColdWaterSupply",
        "housingMeteringDeviceType": "FlowMeter",
        "id": 1546262,
        "transactionType": null,
        "model": "ПРЭМ",
        "serialNumber": "220620",
        "managementFirm": {
          "id": 4,
          "name": "ООО УК\"ПЖКХ-17\"",
          "phoneNumber": null,
          "information": null,
          "timeZoneOffset": "03:00:00"
        },
        "lastCommercialAccountingDate": "2018-10-31T03:00:00",
        "futureCommercialAccountingDate": "2019-07-21T03:00:00",
        "lastCheckingDate": "2015-07-21T03:00:00",
        "futureCheckingDate": "2019-07-21T03:00:00",
        "closingDate": null
      }
    ],
      "id": 1542041,
      "transactionType": null,
      "model": "ТВ-7",
      "serialNumber": "12002314",
      "lastCommercialAccountingDate": "2018-10-22T03:00:00",
      "futureCommercialAccountingDate": "2019-08-05T03:00:00",
      "lastCheckingDate": "2016-10-11T03:00:00",
      "futureCheckingDate": "2020-10-11T03:00:00",
      "closingDate": null
  }

  async function getCalculator(id = '') {
    try {
      const res = await axios.get(`MeteringDevices/${id}`);
      // setDevice(res);
      setDevices(template);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса Вычислителя',
      };
    }
  }

  useEffect(() => {
    // getCalculator(deviceId);
    setDevice(template);
  }, []);

  useEffect(() => {
    // getCalculator(deviceId);
    console.log("device = ", device)
  }, [device]);

  const handleCancel = () => {

  };

  return (
    <Modal
      visible
      onCancel={handleCancel}
      footer={null}
      width="800px"
    >
      <ModalCalculatorReportForm device={device} />
      <ButtonTT
        type="submit"
        color="blue"
        form="formikForm"
      >
        Выгрузить
      </ButtonTT>
      <ButtonTT
        style={{ marginLeft: '16px' }}
        color="white"
        onClick={handleCancel}
      >
        Отмена
      </ButtonTT>
    </Modal>
  );


};
export default ModalCalculatorReport;
