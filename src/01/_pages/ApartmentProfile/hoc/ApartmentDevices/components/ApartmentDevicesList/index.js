import React, {useContext} from "react";
import {ApartmentDeviceItem} from "../ApartmentDeviceItem";
import {ApartmentDevicesContext} from '../../ApartmentDevices'

export function ApartmentDevicesList(props) {
  const ApartmentDevicesList = useContext(ApartmentDevicesContext);
  console.log(ApartmentDevicesList);

  const arr = Object.values(ApartmentDevicesList);

  console.log(Object.values(ApartmentDevicesList));
  const list = arr.map((value) => {
    return (
      <ul>
        <li>
          <div><strong>Тип: </strong><span>{value.resource}</span></div>
        </li>
        <li>
          <div><strong>Модель: </strong><span>{value.model}</span></div>
        </li>
        <li>
          <div><strong>Серийный номер: </strong><span>{value.serialNumber}</span></div>
        </li>

        <li>
          <div><strong>Следующая поверка: </strong><span>{value.futureCheckingDate}</span></div>
        </li>

        <li>
          <div><strong>Последние показания счетчика: </strong><span>{value.previousReadings || 'не данных'}</span></div>
        </li>

        <li>
          <div><strong>Место установки: </strong><span>{value.mountPlace || 'возможно, туалет'}</span></div>
        </li>

        <li>
          <div><strong>Статус: </strong><span>{value.closingDate || 'Активен'}</span></div>
        </li>

        <li>
          <div><strong>дата прошлой поверки: </strong><span>Пока нет в базе</span></div>
        </li>


        </ul>
    )
  })
  return (
    <div>
      {list}
      {/*<ApartmentDeviceItem/>*/}
      {/*<ApartmentDeviceItem/>*/}
      {/*<ApartmentDeviceItem/>*/}
    </div>
  )
}