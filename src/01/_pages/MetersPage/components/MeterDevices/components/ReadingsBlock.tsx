import React, {
    MutableRefObject,
    ReactEventHandler,
    RefObject,
    useContext,
    useState,
} from 'react'

import { Input } from 'antd'
import styled from 'styled-components'

const ReadingLineStyled = styled.div<{
    houseReadings: boolean
    isDisabled: boolean | undefined
}>`
    position: relative;

    &:not(:first-child) {
        padding-top: 8px;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--frame);
        padding-bottom: 7px;
    }

    & .ant-input-affix-wrapper-disabled {
        background-color: transparent;

        input {
            color: var(--main-70) !important;
        }
    }
`

const TarifLabel = styled.span<{ houseReadings: boolean }>`
    // width: ${(props) => (props.houseReadings ? '20px' : '72px')};
    width: 20px;
    // padding-left: ${(props) => (props.houseReadings ? 0 : '8px')};
    // padding-right: ${(props) => (props.houseReadings ? 0 : '8px')};
    //padding-left: 8px;
    margin-right: 4px;
    color: rgba(39, 47, 90, 0.32);
`

interface DeviceRatesVerticalProps {
    index: number
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: number
    readingsBlocked?: boolean
    resource: string
    operatorCabinet?: boolean
    houseReadings?: boolean
    isDisabled?: boolean | undefined
    textInput?: MutableRefObject<Input | null>
}

const SuffixLine = styled.span`
    // position: absolute;
`
const StyledInput = styled(Input)`
    color: var(--main-70);
    border: 0;
    border-left-width: 3px;
    padding: 0;
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    min-width: 72px;

    .ant-input .ant-input-disabled {
        color: var(--main-70) !important;
    }
`

const ReadingsBlock: React.FC<DeviceRatesVerticalProps> = ({
    index,
    onChange,
    value,
    readingsBlocked = false,
    resource,
    operatorCabinet = false,
    houseReadings = false,
    textInput,
    isDisabled,
}) => {

    const onFocusHandler = (e: any) => {
        textInput!.current = e.target
    }

    const onBlurHandler = (e: any) => {
        textInput!.current = null
    }

    return (
        <ReadingLineStyled
            houseReadings={houseReadings}
            isDisabled={isDisabled}
        >
            <StyledInput
                prefix={
                    <TarifLabel houseReadings={houseReadings}>
                        Т{index + 1}{' '}
                    </TarifLabel>
                }
                suffix={
                    resource === 'Electricity' ? (
                        <SuffixLine>кВтч</SuffixLine>
                    ) : (
                        <SuffixLine>м³</SuffixLine>
                    )
                }
                disabled={readingsBlocked || isDisabled}
                type="text"
                value={value}
                ref={operatorCabinet && !isDisabled ? textInput : undefined}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                onChange={onChange}
                required
                tabIndex={index + 1}
            />
        </ReadingLineStyled>
    )
}

export default ReadingsBlock
