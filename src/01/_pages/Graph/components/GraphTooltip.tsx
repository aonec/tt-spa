import React from 'react'
import { format } from 'date-fns'
import styled from 'styled-components'
import { VictoryLabelProps } from 'victory'
import { GraphParamsType } from '../Graph'

const formatDate = (timeStamp: string): Date => {
    const dateObject = new Date(timeStamp)
    const millisecondsInHour = 60 * 1000
    const date = new Date(
        dateObject.valueOf() +
        dateObject.getTimezoneOffset() * millisecondsInHour
    )
    return date
}

interface ExtraProps {
    graphParam: GraphParamsType
}

const formMeteringUnit = (graphParam: GraphParamsType) => {
    switch (graphParam) {
        case 'energy':
            return 'ГКал'
        case 'inputMass':
        case 'outputMass':
        case 'deltaMass':
            return 'Т'
        case 'inputVolume':
        case 'outputVolume':
        case 'deltaVolume':
            return 'м³';
    }
}

export const GraphTooltip: React.FC<GraphTooltipProps & ExtraProps> = (
    props
) => {
    const { datum, x, y, graphParam } = props
    return (
        <g style={{ pointerEvents: 'none' }}>
            <foreignObject
                x={x}
                y={y}
                width="100%"
                height="100%"
                style={{ overflow: 'visible' }}
            >
                <TooltipBlock value={datum!.value}>
                    <DateBlock>
                        {format(formatDate(datum!.time), 'dd.MM.yyyy')}
                    </DateBlock>
                    <Value>
                        {datum!.value.toFixed(3)} {formMeteringUnit(graphParam)}
                    </Value>
                    <Pointer value={datum!.value} />
                </TooltipBlock>
            </foreignObject>
        </g>
    )
}

const TooltipBlock = styled.div<{ value: number }>`
    display: inline-block;
    position: relative;
    background-color: var(--main-100);
    padding: 8px 16px;
    border-radius: 4px;
    border: 0;
    transform: ${({ value }) =>
    value >= 0 ? 'translate(-15%, -135%)' : 'translate(-15%, 35%)'};
`

const DateBlock = styled.div`
    font-size: 12px;
    line-height: 16px;
    color: #fff;
`

const Value = styled.div`
    color: #fff;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
`

const Pointer = styled.div<{ value: number }>`
    position: absolute;
    left: 15%;
    top: ${({ value }) => (value >= 0 ? '95%' : '-15%')};
    margin: 0 auto;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 12px 6px 0 6px;
    border-color: var(--main-100) transparent transparent transparent;
    transform: translate(-50%, 0)
        ${({ value }) => (value >= 0 ? 'scale(1, 1)' : 'scale(1,-1)')};
`

interface GraphTooltipProps extends VictoryLabelProps {
    datum?: {
        time: string
        value: number
    }
}

export default GraphTooltip
