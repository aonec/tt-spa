import React, {Dispatch, SetStateAction} from 'react'
import styled from 'styled-components'
import s from "../../../MetersPage/components/MeterDevices/MeterDevicesNew.module.scss";
import Arrow from "../../../../_components/Arrow/Arrow";
import moment from "moment";
import {firstLetterToUpperCase, getMonthFromDate} from "../../../../utils/getMonthFromDate";
import {ArrowContainer, CenterContainer} from "../../../MetersPage/components/MeterDevices/ApartmentReadings";

interface HeaderInterface {
    sliderIndex: number
    setSliderIndex: Dispatch<SetStateAction<number>>
    isReadingsCurrent: boolean
    readingsLength: number
}

export function Header({ sliderIndex, setSliderIndex, isReadingsCurrent, readingsLength }: HeaderInterface) {


// ДОБАВИТЬ ДИЗЕЙБЛД И ЗАТИПИЗИРОВАТЬ
    const isRightArrowDisabled =
        sliderIndex + 1 > readingsLength - +isReadingsCurrent - 1

    const onClickIncrease = () => {
        setSliderIndex((index) => {
            return isRightArrowDisabled ? index : index + 1
        })
    }

    const isLeftArrowDisabled = sliderIndex - 1 < 0

    const onClickDecrease = () => {
        setSliderIndex((index) => {
            return isLeftArrowDisabled ? index : index - 1
        })
    }

    const getPreviousReadingsMonth = (sliderIndex: number) => {
        const month = moment()
            .subtract(sliderIndex + 1, 'months')
            .format('MMMM')

        return firstLetterToUpperCase(month)
    }

    return (
        <HeaderWrap>
            <Title>Информация о приборе</Title>
            <div>Статус</div>
            <CenterContainer>
                <ArrowContainer
                    onClick={onClickDecrease}
                    className={
                        isLeftArrowDisabled
                            ? s.arrowDisabled
                            : s.arrowEnabled
                    }
                >
                    <Arrow isDisabled={isLeftArrowDisabled} />
                </ArrowContainer>
                <CenterContainer>
                    {getPreviousReadingsMonth(sliderIndex)}
                </CenterContainer>
                <ArrowContainer
                    className={
                        isRightArrowDisabled
                            ? s.arrowDisabled
                            : s.arrowEnabled
                    }
                    onClick={onClickIncrease}
                >
                    <Arrow isRight isDisabled={isRightArrowDisabled} />
                </ArrowContainer>
            </CenterContainer>
        </HeaderWrap>
    )
}

const HeaderWrap = styled.div`
    display: grid;
    grid-template-columns: minmax(330px, 4fr) 2fr 2fr 4fr;
    background: rgba(39, 47, 90, 0.04);
    padding: 16px;
    align-items: center;
`

const Title = styled.h5`
    padding: 0;
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.85);
`

export default Header
