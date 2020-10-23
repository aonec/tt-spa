import React from 'react';

import { NavLink } from 'react-router-dom';
import styles from '../TabsDevices.module.scss';
import { Icon } from '../../../../tt-components/Icon';

const DeviceBlock = (props) => {
  const { device: calculator } = props;
  const housingStockNumber = calculator.address.housingStockNumber;
  return (
    <div className={styles.device}>
      <div>
        <div className={styles.device__main_wrapper}>
          <NavLink
            className={`${styles.device__main} ${styles.device__title}`}
            to={`/calculators/${calculator.id}`}
          >
            <Icon className={styles.icon} icon="device" fill="var(--main-100)" />
            {calculator.model}
            <span className={styles.deviceId}>
              {` (${calculator.serialNumber})`}
            </span>
          </NavLink>
        </div>
        <div className={styles.subDevices}>
          {calculator.hubs && calculator.hubs.length
            ? calculator.hubs.map((odpu) => (
              <div className={styles.device__sub}>
                <NavLink
                  className={styles.device__title}
                  to={`/housingMeteringDevices/${odpu.id}`}
                >
                  <Icon className={styles.icon} icon="water" fill="var(--hot-water)" />
                  {odpu.model}
                  <span className={styles.deviceId}>
                    {` (${odpu.serialNumber})`}
                  </span>
                </NavLink>
              </div>
            ))
            : 'Подприборов нет'}

        </div>
      </div>
    </div>
  );
};

export default DeviceBlock;
