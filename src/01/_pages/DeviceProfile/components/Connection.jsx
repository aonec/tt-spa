import React, { useContext } from 'react'
import _ from 'lodash'
import { Loader } from '../../../components'
import { ListWrap, ListItem, Title } from '../../../_components/List'
import { DeviceContext } from '../DeviceProfile'

export const Connection = () => {
    const { device, loadings } = useContext(DeviceContext)
    const { connection } = device
    const { ipV4, port, deviceAddress } = connection || {
        ipV4: '',
        port: null,
        deviceAddress: null,
    }
    const loading = _.get(loadings, 'device', true)

    return (
        <ListWrap>
            <Title>Настройки</Title>
            <Loader show={loading} size="32">
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
            </Loader>
        </ListWrap>
    )
}

export default Connection
