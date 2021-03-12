import React, { useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { Icon, Loader, HeaderWrap, Title, Subtitle } from '01/_components'
import DeviceIcons from '01/_components/DeviceIcons'
import { Menu } from './EditButtonODPU'
import { DeviceContext } from '../DeviceProfile'
import { DEFAULT_BUILDING, DEFAULT_DEVICE, DEFAULT_ICON } from './Templates'

export const Template = styled.div``

export const List = styled.ul`
    border: 1px solid #dcdee4;
    position: absolute;
    right: 0;
    width: max-content;
    z-index: 50;
    background: white;
    display: none;
`

export const ListItem = styled.li`
    font-size: 16px;
    line-height: 32px;
    padding: 8px 24px;
    cursor: pointer;
    border-bottom: 1px solid #dcdee4;
    &:hover {
        background: #189ee9;
        color: #ffffff !important;
    }
`

export const HeaderNotCalculator = () => {
    const {
        device,
        building,
        loadings,
        errors,
        error,
        typeODPU,
        calcModel,
    } = useContext(DeviceContext)

    const loadingDevice = _.get(loadings, 'device', true)
    const loadingBuilding = _.get(loadings, 'building', true)

    const loading = loadingDevice || loadingBuilding

    const { city, street, housingStockNumber, corpus } =
        building || DEFAULT_BUILDING
    const { model, serialNumber, resource } = device || DEFAULT_DEVICE
    const { icon, color } = DeviceIcons[resource] || DEFAULT_ICON

    const errorOfComponent = _.get(error, 'resource', null)

    if (errorOfComponent) {
        return (
            <HeaderWrap>
                <Title>{error.text}</Title>
                <Subtitle>Обратитесь в тех.поддержку</Subtitle>
            </HeaderWrap>
        )
    }

    return (
        <HeaderWrap
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Loader show={loading} size="32">
                <div>
                    <Title>
                        <Icon
                            icon={icon}
                            color={color}
                            size="24"
                            style={{ marginRight: '8px' }}
                        />
                        {`${model} (${serialNumber})`}
                    </Title>

                    <Subtitle>{`${city}, ${street}, ${housingStockNumber}${
                        corpus ? `, к.${corpus}` : ''
                    }`}</Subtitle>
                </div>
                <div style={{ position: 'relative' }}>
                    <Menu />
                </div>
            </Loader>
        </HeaderWrap>
    )
}

export default HeaderNotCalculator
