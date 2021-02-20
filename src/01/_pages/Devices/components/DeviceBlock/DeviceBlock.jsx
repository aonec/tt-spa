import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../../../tt-components/Icon';
import {NotConnectedIcon} from '../../../../components/NotConnectedIcon/NotConnectedIcon';
import {Dates} from './Dates';
import Node from './Node/Node';

const DeviceBlock = (props) => {
    const { device: calculator} = props;

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

                <Dates firstDate={calculator.lastCheckingDate} lastDate={calculator.futureCheckingDate} />

            </DeviceWrapper>
            <div>
                {calculator.nodes.map((node) => <Node node={node} />)}
            </div>
        </>

    );
};

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
    margin-right: 8px;
`

export const DeviceIcon = styled(Icon)`
    margin-right: 8px;
`

export default DeviceBlock;
