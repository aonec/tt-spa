import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ReadingsBlock from './ReadingsBlock'
import { useReadings } from '../../../../../hooks/useReadings'
import { isNullInArray } from '../../../../../utils/checkArrayForNulls'
import { Modal } from 'antd'
import ButtonTT from '../../../../../tt-components/ButtonTT'
import { useDispatch, useSelector } from 'react-redux'
import { selectDisabledState } from '../../../../../Redux/ducks/readings/selectors'
import {
    setInputUnfocused,
} from '../../../../../Redux/ducks/readings/actionCreators'
import DeviceInfo from './DeviceInfo'


const ApartmentReadingLine = ({ device, sliderIndex }) => {

    const dispatch = useDispatch()

    const disabledState = useSelector(selectDisabledState)

    const isDisabled = disabledState?.find((el) => el.deviceId === device.id)
        ?.isDisabled;

    // const [isVisible, setIsVisible] = useState(false)

    const {
        readingsState,
        setReadingsState,
        isVisible,
        setIsVisible,
        initialReadings,
        setInitialReadings,
        onBlurHandler,
        onFocusHandler,
        onInputChange,
        isCancel,
        setIsCancel,
        handleOk,
        handleCancel
    } = useReadings(device, sliderIndex)


    const textInput = React.createRef()

    const afterCloseHandler = () => {
        if (isCancel) {
            setIsCancel(false)
            textInput.current.focus()
        }
    }

    //useInputsUnfocused
    useEffect(() => {
        if (!readingsState?.currentReadingsArray) return
        const isNull = isNullInArray(readingsState.currentReadingsArray)

        if (!isNull) {
            dispatch(setInputUnfocused())
        }
    }, [readingsState])


    if (!readingsState) return null


    const currentDeviceReadings = readingsState.currentReadingsArray.map(
        (value, index) => {
            return (
                <ReadingsBlock
                    key={
                        readingsState.currentReadingsArray.id ??
                        device.id + index
                    }
                    index={index}
                    onChange={(e) => onInputChange(e, index, setReadingsState)}
                    value={value}
                    resource={readingsState.resource}
                    operatorCabinet
                    textInput={textInput}
                    isDisabled={isDisabled}
                />
            )
        }
    )

    const previousDeviceReadings = readingsState.previousReadingsArray.map(
        (value, index) => (
            <ReadingsBlock
                key={readingsState.previousReadingsArray.id + 'a'}
                index={index}
                value={value}
                resource={readingsState.resource}
                operatorCabinet
                readingsBlocked
            />
        )
    )



    const options = (readingsElems, isCurrent) => [
        {
            value: () => (
                <DeviceReadingsContainer
                    color={
                        isCurrent
                            ? getInputColor(device.resource)
                            : 'var(--main-90)'
                    }
                    resource={device.resource}
                >
                    {readingsElems}
                </DeviceReadingsContainer>
            ),
            isSuccess:
                readingsState.resource !== 'Electricity' ||
                readingsElems.length === 1,
        },
        {
            value: () => (
                <>
                    <DeviceReadingsContainer
                        style={{ marginBottom: 8 }}
                        color={isCurrent ? 'var(--electro)' : 'var(--main-90)'}
                        resource={device.resource}
                    >
                        {readingsElems[0]}
                    </DeviceReadingsContainer>
                    <DeviceReadingsContainer
                        color={isCurrent ? '#957400' : 'var(--main-90)'}
                        resource={device.resource}
                    >
                        {readingsElems[1]}
                    </DeviceReadingsContainer>
                </>
            ),
            isSuccess: readingsElems.length === 2,
        },
        {
            value: () => (
                <>
                    <DeviceReadingsContainer
                        style={{ marginBottom: 8 }}
                        color={isCurrent ? 'var(--electro)' : 'var(--main-90)'}
                        resource={device.resource}
                    >
                        {[readingsElems[0], readingsElems[1]]}
                    </DeviceReadingsContainer>
                    <DeviceReadingsContainer
                        color={isCurrent ? '#957400' : 'var(--main-90)'}
                        resource={device.resource}
                    >
                        {readingsElems[2]}
                    </DeviceReadingsContainer>
                </>
            ),
            isSuccess: true,
        },
    ]

    return (
        <>
            <FullDeviceLine>
                <DeviceInfo device={device} />

                {/*Инпуты с показаниями*/}
                <div>
                    {options(previousDeviceReadings, false)
                        .find((el) => el.isSuccess)
                        .value()}
                </div>

                <div
                    onBlur={onBlurHandler}
                    onFocus={onFocusHandler}
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    {options(currentDeviceReadings, true)
                        .find((el) => el.isSuccess)
                        .value()}
                </div>
            </FullDeviceLine>

            <StyledModal
                visible={isVisible}
                title={
                    <Header>
                        Вы действительно хотите уйти без сохранения?
                    </Header>
                }
                onOk={handleOk}
                onCancel={handleCancel}
                afterClose={afterCloseHandler}
                width={800}
                footer={
                    <Footer>
                        <ButtonTT
                            color={'white'}
                            key="back"
                            onClick={handleCancel}
                        >
                            Отмена
                        </ButtonTT>
                        <ButtonTT color={'red'} key="submit" onClick={handleOk}>
                            Выйти без сохранения
                        </ButtonTT>
                    </Footer>
                }
            >
                <p style={{ color: 'var(--main-100)', margin: 0 }}>
                    Вы внесли не все показания, если вы покинете страницу, то
                    все изменения, которые были сделаны вами на этой странице не
                    сохранятся
                </p>
            </StyledModal>
        </>
    )
}

const FullDeviceLine = styled.div`
    display: grid;
    grid-template-columns: minmax(330px, 5.5fr) 2.25fr 2.25fr 2fr;
    column-gap: 16px;
    margin-top: 8px;
    align-items: center;
    justify-content: flex-start;
    white-space: nowrap;
    padding: 8px 8px 16px;
    border-bottom: 1px solid #dcdee4;
`

export const getInputColor = (resource) => {
    switch (resource) {
        case 'HotWaterSupply':
            return '#FF8C68'
        case 'ColdWaterSupply':
            return '#79AFFF'
        case 'Heat':
            return 'Отопление'
        case 'Electricity':
            return '#E2B104'
    }
}

export const DeviceReadingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 1px solid
        ${(props) => (props.color ? props.color : 'var(--main-90)')};
    border-left-width: 4px;
    max-width: 200px;
    //padding: 8px 16px;
    padding: 8px 8px 8px 12px;
    pointer-events: ${(props) => (props.isDisabled === true ? 'none' : 'auto')};

    &:focus-within {
        box-shadow: var(--shadow);
    }

    .ant-input-affix-wrapper:focus,
    .ant-input-affix-wrapper-focused {
        box-shadow: none;
    }
`

const Footer = styled.div`
    background-color: var(--bg);
    height: 96px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 32px;
    font-weight: 700;
`

const Header = styled.h1`
    font-size: 32px;
    line-height: 1.5;
    font-weight: 300;
    margin: 0;
`

const StyledModal = styled(Modal)`
    .ant-modal-header {
        padding: 24px 32px;
        border: 0;
    }

    .ant-modal-body {
        padding: 0 32px 32px 32px;
    }

    .ant-modal-footer {
        padding: 0;
    }

    .ant-modal-close-x {
        fill: var(--main-100);
    }

    .ant-modal-footer button + button {
        margin-bottom: 0;
        margin-left: 16px;
    }
`

export default ApartmentReadingLine
