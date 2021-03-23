import React, { useContext } from 'react'
import _ from 'lodash'
import { Loader } from '../../../components'
import { ListWrap, ListItem, Title } from '../../../_components/List'
import { DeviceContext } from '../CalculatorProfile'
import styles from '../calculator.module.css'
import { IconWithTooltip } from '../../../components/NotConnectedIcon/IconWithTooltip'
import {CalculatorResponse} from "../../../../myApi";
import {DEFAULT_DEVICE} from "./Templates";

interface ConnectionInterface {
    device: CalculatorResponse | undefined
}

export const Connection = ({device} : ConnectionInterface) => {

    const { connection, isConnected } = device || DEFAULT_DEVICE;
    const { ipV4, port, deviceAddress } = connection;


    const NoConnection = () => {
        console.log('NoConnection')
        return (
            <div className={styles.warning}>
                <IconWithTooltip title={'Вычислитель не опрашивается'}/>
                <span>Вычислитель не опрашивается</span>
            </div>
        )
    }

    return (
        <div>
            {!isConnected ? <NoConnection /> : null}
            <ListWrap style={{ opacity: !isConnected ? '0.5' : '0' }}>
                    <Title>Настройки</Title>
                    <ListItem>
                        <span>IP адрес вычислителя</span>
                        <span>{ipV4}</span>
                    </ListItem>
                    <ListItem>
                        <span>Порт</span>
                        <span>{port}</span>
                    </ListItem>
                    <ListItem>
                        <span>Адрес прибора</span>
                        <span>{deviceAddress}</span>
                    </ListItem>
            </ListWrap>
        </div>
    )
}

export default Connection
