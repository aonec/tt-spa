import React, { useContext } from 'react'
import { Loader } from '01/components'
import { ListWrap, ListItem, Title } from '01/_components/List'
import _ from 'lodash'
import { DeviceContext } from '../CalculatorProfile'
import { DEFAULT_BUILDING, DEFAULT_DEVICE } from './Templates'
import { Subtitle } from '../../../_components/Headers'
import moment from 'moment'

export const Information = () => {
    const { device, loadings, error } = useContext(DeviceContext)
    const {address} = device
    const loading = _.get(loadings, 'device', true)

    const { city, street, housingStockNumber, corpus, id } =
    address || DEFAULT_BUILDING
    const {
        futureCommercialAccountingDate,
        lastCommercialAccountingDate,
        futureCheckingDate,
        lastCheckingDate,
    } = device || DEFAULT_DEVICE

    const errorOfComponent = _.get(error, 'resource', null)

    if (errorOfComponent) {
        return (
            <ListWrap>
                <Title>{error.message}</Title>
            </ListWrap>
        )
    }

    return (
        <ListWrap>
            <Loader show={loading} size="32">
                <Title>Информация</Title>
                <ListItem>
                    <span>Адрес</span>
                    <Subtitle to={`/objects/${id}`} style={{ padding: 8 }}>
                        {`${city}, ${street}, ${housingStockNumber}${
                            corpus ? `, к.${corpus}` : ''
                        }`}
                    </Subtitle>
                </ListItem>
                <ListItem>
                    <span>Дата начала действия акта-допуска</span>
                    <span>{moment(lastCommercialAccountingDate).format('DD.MM.YYYY')}</span>
                </ListItem>
                <ListItem>
                    <span>Дата окончания действия акта-допуска</span>
                    <span>{moment(futureCommercialAccountingDate).format('DD.MM.YYYY')}</span>
                </ListItem>
                <ListItem>
                    <span>Дата поверки прибора</span>
                    <span>
                        {moment(lastCheckingDate).format('DD.MM.YYYY')}
                    </span>
                </ListItem>
                <ListItem>
                    <span>Дата следующей поверки прибора</span>
                    <span>
                         {moment(futureCheckingDate).format('DD.MM.YYYY')}</span>
                </ListItem>
            </Loader>
        </ListWrap>
    )
}

export default Information

