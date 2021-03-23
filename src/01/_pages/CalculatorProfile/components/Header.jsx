import React, {useContext, useState} from 'react';
import {
    Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import DeviceIcons from '01/_components/DeviceIcons';
import {useHistory} from 'react-router-dom';
import {DeviceContext} from '../CalculatorProfile';
import {DEFAULT_BUILDING, DEFAULT_DEVICE, DEFAULT_ICON} from './Templates';
import {MenuButtonTT} from '../../../tt-components';
import useAccessesList from "../../../_api/utils/useAccessesList";

export const Header = () => {
    const {push} = useHistory();
    const access = useAccessesList();
    const {show} = access

    const {
        device,
        setReport,
        setDeregister,
    } = useContext(DeviceContext);
    // console.log(device)
    const {address} = device;
    const {
        city, street, housingStockNumber, corpus, id,
    } = address || DEFAULT_BUILDING;
    const {model, serialNumber, resource} = device || DEFAULT_DEVICE;
    const {icon, color} = DeviceIcons[resource] || DEFAULT_ICON;

    const menuButtonArr = [
        {
            title: 'Редактировать вычислитель',
            cb: () => push(`/calculators/${device.id}/edit`),
            show: show('CalculatorUpdate'),
            color: 'default',
        },
        {
            title: 'Выгрузить отчет о общедомовом потреблении',
            cb: () => {
                setReport(true);
            },
            show: show('ReportRead'),
            color: 'default',
        },
        {
            title: 'Добавить Узел',
            cb: () => {
                push(`/objects/${device.address.id}/add_node`);
            },
            show: show('CalculatorUpdate'),
            color: 'default',
        },
        {
            title: 'Закрыть вычислитель',
            cb: () => {
                setDeregister(true);
            },
            show: show('MeteringDevicesClose'),
            color: 'red',
        },
    ];

    return (
        <HeaderWrap
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <div>
                <Title>
                    <Icon
                        icon={icon}
                        color={color}
                        size="24"
                        style={{marginRight: '8px'}}
                    />
                    {`${model} (${serialNumber})`}
                </Title>
                <Subtitle to={`/objects/${id}`}>
                    {`${city}, ${street}, ${housingStockNumber}${
                        corpus ? `, к.${corpus}` : ''
                    }`}
                </Subtitle>
            </div>
            <div style={{position: 'relative'}}>
                <MenuButtonTT menuButtonArr={menuButtonArr}/>
            </div>
        </HeaderWrap>
    );
};

export default Header;
