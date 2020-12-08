import React, {ReactEventHandler, useContext, useState} from 'react';

import { Input } from 'antd';
import styled from 'styled-components';



const ReadingLineStyled = styled.div`

position: relative; 
padding-right: 16px;

&:not(:first-child) {
padding-top: 8px;
}

&:not(:last-child) {
border-bottom: 1px solid var(--frame);
padding-bottom: 7px;
}
`;


const Label = styled.label`
display: flex;
min-width: 60px;
align-items: center;
padding-left: 10px;
margin-right:10px; 
background-color: #E5E5E5
`;

const TarifLabel = styled.span`
width: 72px;
padding-left: 8px;
padding-right: 8px;
color: rgba(39, 47, 90, 0.32);
`;

interface DeviceRatesVerticalProps {
    index: number,
    onChange: () => void,
    value: number,
    readingsBlocked: boolean,
    resource: string,
    sendReadings: () => void
}

const SuffixLine = styled.span`
// position: absolute;
`
const StyledInput = styled(Input)`
color: var(--main-70);
border: 0;
padding: 0;
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
`;

const DeviceRatesVertical : React.FC<DeviceRatesVerticalProps> = ({
                         index, onChange, value, readingsBlocked = false, resource, sendReadings,
                     }) => {
    const width = value.toString().length + 'em';


    const [prevValue, setPrevValue] = useState(null);

    const onBlurHandler: React.ReactEventHandler<HTMLInputElement> = (e: any) => {
        if (prevValue === e.target.value) return;
        sendReadings();
    };

    const onFocusHandler  = (e: any) => {
        setPrevValue(e.target.value)
    }




    return (
        <ReadingLineStyled>
            <StyledInput
                prefix={readingsBlocked ? null : (
                    <TarifLabel>
                        Тариф
                        {index + 1}
                        {' '}
                    </TarifLabel>
                )}
                suffix={resource === 'Electricity' ? <SuffixLine>кВтч</SuffixLine> : <SuffixLine>м³</SuffixLine>}
                disabled={readingsBlocked}
                type="text"
                value={value}
                onChange={onChange}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                width={value.toString().length + 'em'}
                required
            />
        </ReadingLineStyled>
    );
};

export default DeviceRatesVertical;
