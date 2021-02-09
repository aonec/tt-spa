import React from 'react';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import styles from '../TabsDevices.module.scss';
import { Icon } from '../../../../tt-components/Icon';
import DeviceIcons from "../../../../_components/DeviceIcons";
import transformDate from "../../../../utils/transformDate";
import {NotConnectedIcon} from "../../../../components/NotConnectedIcon/NotConnectedIcon";
import {Dates} from "./Dates";
import Node from "./Node/Node";

const DeviceBlock = (props) => {
    const { device: calculator} = props;
    let lastCalculatorCheckingDate = transformDate(calculator.lastCheckingDate);
    let futureCalculatorCheckingDate = transformDate(calculator.futureCheckingDate);
    let lastCalculatorCommercialAccountingDate = transformDate(calculator.lastCommercialAccountingDate);


    // let lastCalculatorCheckingDate = transformDate(calculator.lastCheckingDate);
    // let futureCalculatorCheckingDate = transformDate(calculator.futureCheckingDate);
    // let lastCalculatorCommercialAccountingDate = transformDate(calculator.lastCommercialAccountingDate);

    const subdevices = calculator.hubs?.length
        ? calculator.hubs.map((odpu) => {
            const { icon, color } = DeviceIcons[odpu.resource];

            return (
                <DeviceWrapper>
                    <div style={{marginLeft: 23}}>
                        <DeviceLink
                            to={`/housingMeteringDevices/${odpu.id}`}
                        >
                            <DeviceIcon icon={icon} fill={color} />
                            {`${odpu.model} `}
                            <SerialNumber>
                                ({odpu.serialNumber})
                            </SerialNumber>
                        </DeviceLink>
                    </div>

                    <Dates device={odpu} />

                    <Diameter>
                        {odpu.diameter ? odpu.diameter + ' мм' : ''}
                    </Diameter>

                </DeviceWrapper>
            )
        })
        : 'Подключенных приборов нет';

        const nodes = calculator.nodes.map((node) => <Node node={node} />)

    return (
        <>
            <DeviceWrapper>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <DeviceLink
                        to={`/calculators/${calculator.id}`}
                    >
                        <DeviceIcon icon="device" fill="var(--main-100)" />
                        {calculator.model}
                        <SerialNumber>
                            ({calculator.serialNumber})
                        </SerialNumber>
                    </DeviceLink>

                    <div hidden={calculator.connection?.isConnected ?? true}>
                        <NotConnectedIcon />
                    </div>

                </div>

                <Dates device={calculator} />


            </DeviceWrapper>
            <div>
                {/*{subdevices}*/}
                {nodes}
            </div>


    </>

    );
};

/*Element Dates doesn't have required attribute closingDate. ' +
'Element Dates doesn't have required attribute futureCheckingDate.
    Element Dates doesn't have required attribute futureCommercialAccountingDate. ' +
'Element Dates doesn't have required attribute id.
    Element Dates doesn't have required attribute lastCheckingDate. ' +
'Element Dates doesn't have required attribute lastCommercialAccountingDate.
    Element Dates doesn't have required attribute managementFirm. ' +
'Element Dates doesn't have required attribute model.
    Element Dates doesn't have required attribute serialNumber.*/

export const DeviceWrapper = styled.div`
display: grid;
grid-template-columns: 4.5fr 3fr 1.5fr 2fr 1fr;
margin-bottom: 24px;
align-items: center;
justify-content: center;
`

export const SerialNumber = styled.span`
margin-left: 6px;
font-weight: normal;
color: rgba(39, 47, 90, 0.6);
`

export const Diameter = styled.div`
margin: 0 auto;
`

export const DeviceLink = styled(NavLink)`
display: flex;
align-items: center;
font-weight: bold;
font-size: 16px;
line-height: 2;
color: #272f5A;
`

export const DeviceIcon = styled(Icon)`
margin-right: 8px;
`

export default DeviceBlock;
