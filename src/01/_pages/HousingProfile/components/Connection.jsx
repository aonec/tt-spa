import React, { useContext } from 'react'
import _ from 'lodash'
import { Loader } from '../../../components'
import { ListWrap, ListItem, Title } from '../../../_components/List'
import { HousingContext } from '../HousingProfile'

export const Connection = () => {
    const { device, loadings } = useContext(HousingContext)
    const isLoading = _.get(loadings, 'device', true)

    return (
        <ListWrap>
            <Title>Настройки (не вычислитель)</Title>
            <Loader show={isLoading} size="32">
                <ListItem>
                    <span>IP адрес вычислителя</span>
                    <span>{device.ipV4 || 'X'}</span>
                </ListItem>
                <ListItem>
                    <span>Порт</span>
                    <span>{device.port || 'X'}</span>
                </ListItem>
                <ListItem>
                    <span>Адрес прибора</span>
                    <span>{device.deviceAddress || 'X'}</span>
                </ListItem>
            </Loader>
        </ListWrap>
    )
}

export default Connection
