import React, { useContext } from 'react'
import moment from 'moment'
import _ from 'lodash'
import { ListWrap, ListItem, Title } from '../../../tt-components/List'
import { Subtitle } from '../../../_components/Headers'
import { NodeContext } from '../index'
import {
    nodeStatusList,
    serviceZoneList,
} from '../../../tt-components/localBases'

const Information = () => {
    const { node, calculator } = useContext(NodeContext)
    const {
        serviceZone,
        nodeStatus,
        lastCheckingDate,
        futureCheckingDate,
    } = node

    const { address } = calculator
    const { city, street, housingStockNumber, corpus, id } = address

    const getServiceZone =
        _.find(serviceZoneList, { value: serviceZone })?.label ??
        'Зона не определена'
    const getNodeStatus =
        _.find(nodeStatusList, { value: nodeStatus })?.label ??
        'Статус не определен'

    return (
        <ListWrap>
            <Title>Информация</Title>
            <ListItem>
                <span>Адрес</span>
                <Subtitle to={`/objects/${id}`}>
                    {`${city}, ${street}, ${housingStockNumber} ${
                        corpus ? `, к.${corpus}` : ''
                    }`}
                </Subtitle>
            </ListItem>
            <ListItem>
                <span>Зона</span>
                <div>{getServiceZone}</div>
            </ListItem>
            <ListItem>
                <span>Коммерческий учет показателей приборов</span>
                <div>{getNodeStatus}</div>
            </ListItem>
            <ListItem>
                <span>Дата начала действия акта-допуска</span>
                <div>{moment(lastCheckingDate).format('DD.MM.YYYY')}</div>
            </ListItem>
            <ListItem>
                <span>Дата окончания действия акта-допуска</span>
                <div>{moment(futureCheckingDate).format('DD.MM.YYYY')}</div>
            </ListItem>
        </ListWrap>
    )
}

export default Information
