import React from 'react'
import { CommunicationPipeInterface } from '../../utils/groupDevicesByObjects'
import { Dates } from '../Dates'
import {
    DeviceIcon,
    DeviceLink,
    DeviceWrapper,
    Diameter,
    SerialNumber,
} from '../DeviceBlock'
import IconTT from '../../../../../tt-components/IconTT'
import styled from 'styled-components'
import DeviceIcons from '../../../../../_components/DeviceIcons'
import Icon from "../../../../../tt-components/Icon";

const Node: React.FC<Props> = ({ node }) => {
    const housingDevices = node.communicationPipes.map((pipe) => {
        const devices = pipe.devices.map((housingDevice) => {

            return (
                <DeviceWrapper>
                    <div>
                        <TitleWrapper>
                            <DeviceLink
                                to={`/housingMeteringDevices/${housingDevice.id}`}
                            >
                                {`${housingDevice.model} `}
                                <SerialNumber>
                                    ({housingDevice.serialNumber})
                                </SerialNumber>
                            </DeviceLink>
                        </TitleWrapper>
                    </div>

                    <Dates
                        firstDate={housingDevice.lastCheckingDate}
                        lastDate={housingDevice.futureCheckingDate}
                    />

                    <Diameter>
                        {housingDevice.diameter
                            ? housingDevice.diameter + ' мм'
                            : ''}
                    </Diameter>
                </DeviceWrapper>
            )
        })
        return devices
    })


    const { icon, color } = DeviceIcons[node.resource]

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <div>
                    <TitleWrapper>
                        <DeviceLink to={`/nodes/${node.id}`}>
                            <NodeIcon icon={icon} color={color}/>
                            <span>{`Узел ${node.number}`}</span>
                        </DeviceLink>
                        <ServiceZone>{node.serviceZone}</ServiceZone>
                    </TitleWrapper>
                </div>

                <CommercialAct>
                    <span>Акт-допуска </span>
                    <Dates
                        firstDate={node.lastCommercialAccountingDate}
                        lastDate={node.futureCommercialAccountingDate}
                    />
                </CommercialAct>
            </div>

            {housingDevices}
        </div>
    )
}

const NodeIcon = styled(Icon)`
    margin-right: 8px;
`

const TitleWrapper = styled.div`
    margin-left: 24px;
    display: flex;
    align-items: center;
`

const ServiceZone = styled.span`
    font-size: 16px;
    line-height: 2;
    color: var(--main-70);
`

const CommercialAct = styled.div`
    font-size: 12px;
    color: var(--main-70);
    padding-left: 48px;
`
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

export default Node
