import React from 'react';

import { NavLink } from 'react-router-dom';
import styles from '../TabsDevices.module.scss';
import { Icon } from '../../../../tt-components/Icon';
import DeviceIcons from "../../../../_components/DeviceIcons";
import transformDate from "../../../../utils/transformDate";
import {NotConnectedIcon} from "../../../../components/NotConnectedIcon/NotConnectedIcon";

const DeviceBlock = (props) => {
  const { device: calculator} = props;
  let lastCheckingDate = transformDate(calculator.lastCheckingDate);
  let futureCheckingDate = transformDate(calculator.futureCheckingDate);
  let lastCommercialAccountingDate = transformDate(calculator.lastCommercialAccountingDate);

  const subdevices = calculator.hubs && calculator.hubs.length
      ? calculator.hubs.map((odpu) => {

        const { icon, color } = DeviceIcons[odpu.resource];

        return (
            <div className={styles.device__wrapper}>

              <div>
                <NavLink
                    className={styles.device__title + ' ' + styles.subdevice__title}
                    to={`/housingMeteringDevices/${odpu.id}`}
                >
                  <Icon className={styles.icon} icon={icon} fill={color} />
                  {`${odpu.model} `}
                  <span className={styles.deviceId}>
                            {` (${odpu.serialNumber})`}
                          </span>
                </NavLink>
              </div>

              <div className={styles.justify_center} style={{color: '272F5A', opacity: 0.8}}>
                {transformDate(odpu.lastCheckingDate)} — {transformDate(odpu.futureCheckingDate)}
              </div>

              <div className={styles.justify_center} style={{color: '272F5A', opacity: 0.6}}>
                {transformDate(odpu.lastCommercialAccountingDate)}
              </div>

              <div className={styles.justify_center}>
                {odpu.diameter ? odpu.diameter + ' мм' : ''}
              </div>

              {/*<div className={styles.justify_center}>*/}
              {/*  1*/}
              {/*</div>*/}

            </div>
        )
      })
      : 'Подключенных приборов нет';

  // const housingStockNumber = calculator.address.housingStockNumber;
  return (
      <div className={styles.device}>
        <div>
          <div className={styles.device__wrapper}>

            <div style={{display: 'flex', alignItems: 'center'}}>
              <NavLink
                  className={`${styles.device__main} ${styles.device__title}`}
                  to={`/calculators/${calculator.id}`}
              >
                <Icon className={styles.icon} icon="device" fill="var(--main-100)" />
                {calculator.model}
                <span className={styles.deviceId}>
              {`(${calculator.serialNumber})`}
                </span>
              </NavLink>
                <div hidden={calculator.connection?.isConnected ?? true}><NotConnectedIcon /></div>

            </div>

            <div className={styles.justify_center} style={{color: '272F5A', opacity: 0.8}}>
              {lastCheckingDate} — {futureCheckingDate}
            </div>

            <div className={styles.justify_center} style={{color: '272F5A', opacity: 0.6}}>
              {lastCommercialAccountingDate}
            </div>

          </div>
          <div className={styles.subDevices}>
            {subdevices}

          </div>
        </div>
      </div>
  );
};

export default DeviceBlock;
