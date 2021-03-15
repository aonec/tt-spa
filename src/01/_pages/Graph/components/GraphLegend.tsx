import React from 'react'
import { ResourceType } from './GraphView'
import { getResourceColor } from '../../../utils/getResourceColor'
import styled from 'styled-components'

interface Props {
    resource: ResourceType
}

const GraphLegend: React.FC<Props> = ({ resource }) => {
    return <CurrentPeriod resource={resource}>Текущий период</CurrentPeriod>
}

const CurrentPeriod = styled.div<Props>`
    position: absolute;
    bottom: -100px;
    left: 75px;
    color: var(--main-70);

    &:before {
        content: '';
        display: block;
        position: absolute;
        left: -51px;
        top: 10px;
        width: 32px;
        height: 2px;
        background: ${(props) => getResourceColor(props.resource)};
    }
`

export default GraphLegend
