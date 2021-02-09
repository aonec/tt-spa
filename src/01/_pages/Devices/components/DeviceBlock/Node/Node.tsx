import React from 'react';
import {CommunicationPipeInterface} from "../../utils/groupDevicesByObjects";
import {Dates} from "../Dates";
import {DeviceIcon, DeviceLink, DeviceWrapper, Diameter, SerialNumber} from "../DeviceBlock";
import IconTT from "../../../../../tt-components/IconTT";
import styled from "styled-components";
import DeviceIcons from "../../../../../_components/DeviceIcons";

interface NodeInterface {
    calculatorId: number
    communicationPipes: CommunicationPipeInterface[]
    futureCommercialAccountingDate: string
    id: number
    lastCommercialAccountingDate: string
    nodeStatus: string
    number: number
    resource: string
    serviceZone: string
}

interface Props {
    node: NodeInterface
}

const Node:React.FC<Props> = ({node}) => {
    debugger;

    const housingDevices = node.communicationPipes.map((pipe) => {
        const devices = pipe.devices.map((housingDevice) => {
            const { icon, color } = DeviceIcons[housingDevice.resource];

            return <DeviceWrapper>
                <div style={{marginLeft: 23}}>
                    <DeviceLink
                        to={`/housingMeteringDevices/${housingDevice.id}`}
                    >
                        <DeviceIcon icon={icon} fill={color} />
                        {`${housingDevice.model} `}
                        <SerialNumber>
                            ({housingDevice.serialNumber})
                        </SerialNumber>
                    </DeviceLink>
                </div>

                <Dates device={housingDevice} />

                <Diameter>
                    {housingDevice.diameter ? housingDevice.diameter + ' мм' : ''}
                </Diameter>

            </DeviceWrapper>
        });
        return devices;
    });

 return (
     <>
     <DeviceWrapper>
         <div style={{marginLeft: 23}}>
             <DeviceLink
                 to={`/nodes/${node.id}`}
             >

                 <NodeIcon icon="node" />
                 {`Узел ${node.number}`}
             </DeviceLink>
         </div>

         <Dates device={node} />

     </DeviceWrapper>
    {housingDevices}
    </>
 );
};

const NodeIcon = styled(IconTT)`
margin-right: 8px;
`


export default Node;