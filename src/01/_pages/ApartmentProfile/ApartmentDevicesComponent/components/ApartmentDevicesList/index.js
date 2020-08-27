import React, { useContext } from "react";
import { ApartmentDeviceItem } from "../ApartmentDeviceItem";
import { ApartmentDevicesContext } from "../../ApartmentDevices";

export function ApartmentDevicesList(props) {
  const ApartmentDevicesList = useContext(ApartmentDevicesContext);
  console.log(ApartmentDevicesList);

  const list = ApartmentDevicesList.map((value) => (
    <ul>
      <li>
        <strong>Тип: </strong>
        <span>{value.resource}</span>
      </li>
      <li>
        <strong>Модель: </strong>
        <span>{value.model}</span>
      </li>
      <li>
        <strong>Серийный номер: </strong>
        <span>{value.serialNumber}</span>
      </li>
      <li>
        <strong>Следующая поверка: </strong>
        <span>{value.futureCheckingDate}</span>
      </li>
      <li>
        <strong>Последние показания счетчика: </strong>
        <span>{value.previousReadings || "не данных"}</span>
      </li>
      <li>
        <strong>Место установки: </strong>
        <span>{value.mountPlace || "возможно, туалет"}</span>
      </li>
      <li>
        <strong>Статус: </strong>
        <span>{value.closingDate || "Активен"}</span>
      </li>
      <li>
        <strong>дата прошлой поверки: </strong>
        <span>Пока нет в базе</span>
      </li>
    </ul>
  ));

  const DevicesList = ApartmentDevicesList.map((value, index) => {
    console.log("index", index);
    return <ApartmentDeviceItem index={index} />;
  });
  
  return (
    <>
      {DevicesList}
      {/*{list}*/}
    </>
  );
}