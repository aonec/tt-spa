import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useReadings } from '../../../../../hooks/useReadings'
import { isNullInArray } from '../../../../../utils/checkArrayForNulls'
import {Input, Modal} from 'antd'
import ButtonTT from '../../../../../tt-components/ButtonTT'
import { useDispatch } from 'react-redux'
import {
    setInputUnfocused,
} from '../../../../../Redux/ducks/readings/actionCreators'
import DeviceInfo from './DeviceInfo'
import {IndividualDeviceType} from "../../../../../../types/types";
import {ResourceType} from "../../../../../../myApi";

interface ApartmentReadingLineProps {
    device: IndividualDeviceType
    sliderIndex: number
}

const ApartmentReadingLine = ({ device, sliderIndex }: ApartmentReadingLineProps) => {

    const dispatch = useDispatch()

    const textInput = React.createRef<Input>()

    const {
        readingsState,
        isVisible,
        handleOk,
        handleCancel,
        previousReadings,
        currentReadings
    } = useReadings(device, textInput, sliderIndex)


    //useInputsUnfocused
    useEffect(() => {
        if (!readingsState?.currentReadingsArray) return
        const isNull = isNullInArray(readingsState.currentReadingsArray)

        if (!isNull) {
            dispatch(setInputUnfocused())
        }
    }, [readingsState])

    if (!readingsState) return null


    return (
        <>
            <FullDeviceLine>
                <DeviceInfo device={device} />

                {/*Инпуты с показаниями*/}

                {previousReadings}
                {currentReadings}

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
                        <ButtonTT color={'red'}
                                  key="submit"
                                  onClick={handleOk}>
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

export const getInputColor = (resource: ResourceType) => {
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
