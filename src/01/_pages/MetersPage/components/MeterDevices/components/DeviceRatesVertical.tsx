import React, {ReactEventHandler, RefObject, useContext, useState} from 'react';

import { Input } from 'antd';
import styled from 'styled-components';

const ReadingLineStyled = styled.div<{houseReadings: boolean, isDisabled: boolean | undefined}>`

position: relative; 
padding-right: ${props => props.houseReadings ? 0 : '16px'};
padding-right: 8px;
padding-left: 8px;


&:not(:first-child) {
padding-top: 8px;
}

&:not(:last-child) {
border-bottom: 1px solid var(--frame);
padding-bottom: 7px;
}

& .ant-input-affix-wrapper-disabled { 
background-color: #F3F5F6;
}
`;

const TarifLabel = styled.span<{houseReadings: boolean}>`
width: ${props => props.houseReadings ? '20px': '72px'};
padding-left: ${props => props.houseReadings ? 0: '8px'};
padding-right: ${props => props.houseReadings ? 0: '8px'};
color: rgba(39, 47, 90, 0.32);
`;

interface DeviceRatesVerticalProps {
    index: number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: number,
    readingsBlocked?: boolean,
    resource: string,
    operatorCabinet?: boolean
    houseReadings?: boolean
    isDisabled?: boolean | undefined
    textInput?: RefObject<Input>
}

const SuffixLine = styled.span`
// position: absolute;
`
const StyledInput = styled(Input)`
color: var(--main-70);
border: 0;
padding: 0 8px 0 0 ;
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

`;

const DeviceRatesVertical : React.FC<DeviceRatesVerticalProps> = ({
                          index,
                          onChange,
                          value,
                          readingsBlocked = false,
                          resource,
                          operatorCabinet = false,
                          houseReadings = false,
                          textInput,
                          isDisabled

                     }) => {


    const [isFocused, setIsFocused] = useState(false);

    const onFocusHandler  = (e: any) => {
        setIsFocused(true)
    }

    return (
        <ReadingLineStyled houseReadings={houseReadings} isDisabled={isDisabled}>
            <StyledInput
                prefix={readingsBlocked && !houseReadings ? null : (
                    <TarifLabel houseReadings={houseReadings}>
                        {houseReadings ? 'Т' : 'Тариф'}
                        {index + 1}
                        {' '}
                    </TarifLabel>
                )}
                suffix={resource === 'Electricity' ? <SuffixLine>кВтч</SuffixLine> : <SuffixLine>м³</SuffixLine>}
                disabled={readingsBlocked || isDisabled}
                type="text"
                value={value}
                ref={operatorCabinet && !isDisabled ? textInput : undefined}
                onChange={onChange}
                // onBlur={operatorCabinet ? onBlurHandler : undefined}
                onFocus={operatorCabinet ? onFocusHandler : undefined}
                required
            />
        </ReadingLineStyled>
    );
};

export default DeviceRatesVertical;
