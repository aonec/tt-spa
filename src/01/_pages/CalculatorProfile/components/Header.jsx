import React, {useContext, useState} from 'react';
import {
    Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import DeviceIcons from '01/_components/DeviceIcons';
import {useHistory} from 'react-router-dom';
import {DeviceContext} from '../CalculatorProfile';
import {DEFAULT_BUILDING, DEFAULT_DEVICE, DEFAULT_ICON} from './Templates';
import {MenuButtonTT} from '../../../tt-components';
import isWatcher from "../../../_api/utils/isWatcher";
import userAccessesList from "../../../_api/utils/useAccessesList";
import useAccessesList from "../../../_api/utils/useAccessesList";

export const Header = () => {
    const {push} = useHistory();

    const {
        device,
        building,
        calcModel,
        setReport,
        setDeregister,
    } = useContext(DeviceContext);


    const {
        city, street, housingStockNumber, corpus, id,
    } = building || DEFAULT_BUILDING;
    const {model, serialNumber, resource} = device || DEFAULT_DEVICE;
    const {icon, color} = DeviceIcons[resource] || DEFAULT_ICON;

    const access = useAccessesList();
    const {show} = access

    const menuButtonArr = [
        {
            title: 'Редактировать вычислитель',
            cb: () => !isWatcher ? alert('Вы не имеете права редактирования!') : push(`/calculators/${device.id}/edit`),
            show: show('CalculatorUpdate'),
            color: 'default',
            clickable: false
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
                    {`${model || 'Вычислитель'} (${serialNumber})`}
                </Title>
                {/* <ButtonTT onClick={buttonHandler}>TEST</ButtonTT> */}
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
