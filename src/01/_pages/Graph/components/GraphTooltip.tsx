import React from 'react';
import {format} from "date-fns";
import styled from "styled-components";
import {VictoryLabelProps} from "victory";

const formatDate = (timeStamp: string): Date => {
    const dateObject = new Date(timeStamp);
    const millisecondsInHour = 60 * 1000;
    const date = new Date(dateObject.valueOf() + dateObject.getTimezoneOffset() * millisecondsInHour);
    return date;
}

export const GraphTooltip:React.FC<GraphTooltipProps> = (props) => {
    const { datum, x, y } = props;
    return (
        <g style={{pointerEvents: 'none'}}>


            <foreignObject
                x={x} y={y}
                width="100%" height="100%"
                style={{overflow: 'visible'}}
            >
                <TooltipBlock>
                    <DateBlock>{ format(formatDate(datum!.time), 'dd.MM.yyyy') }</DateBlock>
                    <Value>{ datum!.value.toFixed(3) }м³</Value>
                    <Pointer />
                </TooltipBlock>
            </foreignObject>
        </g>
    );
};

const TooltipBlock = styled.div`
display: inline-block;
position: relative;
background-color: var(--main-100);
padding: 8px 16px;
border-radius: 4px;
border: 0;
transform: translate(-15%, -135%);
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

const Pointer = styled.div`
position: absolute;
left: 15%;
top: 95%;
margin: 0 auto;
width: 0;
height: 0;
border-style: solid;
border-width: 12px 6px 0 6px;
border-color: var(--main-100) transparent transparent transparent;
transform: translate(-50%, 0);
`

interface GraphTooltipProps extends VictoryLabelProps {
    datum?: {
        time: string
        value: number
    }
}

export default GraphTooltip;