import React from 'react'
import styled from 'styled-components'
import s from "../../../MetersPage/components/MeterDevices/MeterDevicesNew.module.scss";
import Arrow from "../../../../_components/Arrow/Arrow";
import moment from "moment";
import {firstLetterToUpperCase, getMonthFromDate} from "../../../../utils/getMonthFromDate";
import {ArrowContainer, CenterContainer} from "../../../MetersPage/components/MeterDevices/ApartmentReadings";

const HeaderWrap = styled.div`
    display: grid;
    grid-template-columns: 5fr 2fr 2fr 3fr;
    background: rgba(39, 47, 90, 0.04);
    padding: 16px;
`

const Title = styled.h5`
    padding: 0;
    margin: 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: rgba(39, 47, 90, 0.6);
`

export function Header({ sliderIndex, setSliderIndex, isReadingsCurrent, readingsLength }) {



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

    const getPreviousReadingsMonth = (sliderIndex) => {
        const month = moment()
            .subtract(sliderIndex + 1, 'months')
            .format('MMMM')

        return firstLetterToUpperCase(month)
    }

    return (
        <HeaderWrap>
            <Title>Информация о приборе</Title>
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
            <div />
        </HeaderWrap>
    )
}

export default Header
