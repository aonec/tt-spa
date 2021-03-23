import React, {Dispatch, SetStateAction} from 'react';
import {
    HeaderWrap, Title, Subtitle,
} from '01/_components';
import {useHistory} from 'react-router-dom';
import {DEFAULT_BUILDING, DEFAULT_DEVICE, DEFAULT_ICON} from './Templates';
import {IconTT, MenuButtonTT} from '../../../tt-components';
import useAccessesList from "../../../_api/utils/useAccessesList";
import {CalculatorResponse} from "../../../../myApi";

interface HeaderInterface {
    device: CalculatorResponse | undefined
    setReport: Dispatch<SetStateAction<boolean>>
    setDeregister: Dispatch<SetStateAction<boolean>>
}

export const Header = ({
                           device, setReport,
                           setDeregister
                       }: HeaderInterface) => {
    const {push} = useHistory();
    const access = useAccessesList();
    const {show} = access

    const {address} = device || {address: DEFAULT_BUILDING};
    const {
        city, street, housingStockNumber, corpus, id,
    } = address || DEFAULT_BUILDING;

    const {model, serialNumber} = device || DEFAULT_DEVICE;

    const menuButtonArr = device ? [
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
    ] : null

    return (
        <HeaderWrap
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <div>
                <Title>
                    <IconTT
                        icon={'device'}
                        size={24}
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
