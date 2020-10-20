import React from 'react';

import { NavLink } from 'react-router-dom';
import styles from '../TabsDevices.module.css';
import { Icon } from '../../../../tt-components/Icon';

const DeviceBlock = (props) => {
    const { device } = props;
    return (
        <div className={styles.device}>
            <div>
                <div className={styles.device__main_wrapper}>
                    <NavLink
                        className={`${styles.device__main} ${styles.device__title}`}
                        to={`/objects/${device.housingStockId}/devices/${device.id}`}
                    >
                        <Icon className={styles.icon} icon="device" fill="var(--main-100)" />
                        {device.model}
                        <span className={styles.deviceId}>
                            {` (${device.serialNumber})`}
                        </span>
                    </NavLink>
                </div>
                <div className={styles.subDevices}>
                    {device.relatedDevices.length
                        ? device.relatedDevices.map((device) => (
                            <div className={styles.device__sub}>
                                <NavLink
                                    className={styles.device__title}
                                    to={`/objects/${device.housingStockId}/devices/${device.id}`}
                                >
                                    <Icon className={styles.icon} icon="water" fill="var(--hot-water)" />
                                    {device.model}
                                    <span className={styles.deviceId}>
                                        {` (${device.serialNumber})`}
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
