
import React, {useEffect, useState} from "react"
import ApartmentReadingLine from "./components/ApartmentReadingLine";
import {formReadingToPush} from "../../../../utils/formReadingsToPush";
import axios from "axios";
import {firstLetterToUpperCase, getMonthFromDate} from "../../../../utils/getMonthFromDate";
import Arrow from "../../../../_components/Arrow/Arrow";
import s from "./MeterDevicesNew.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {selectDevices} from "../../../../Redux/ducks/readings/selectors";
import {setDevices} from "../../../../Redux/ducks/readings/actionCreators";
import {IndividualDeviceType} from "../../../../../types/types";
import styled from "styled-components";
import {useSwitchOnInputs} from "../../../../hooks/useSwitchInputsOnEnter";
import moment from "moment";


interface ApartmentReadingsProps {
    items: IndividualDeviceType[]
}

export const ApartmentReadings = ({ items = [] }: ApartmentReadingsProps) => {

    const [sliderIndex, setSliderIndex] = useState(0)

    const dispatch = useDispatch();

    useSwitchOnInputs();

    useEffect(() => {
        dispatch(setDevices(items))
    }, [items])

    const devices = useSelector(selectDevices);

    if (!devices.length) return null

    const readings = devices.map((device) => <ApartmentReadingLine
        sliderIndex={sliderIndex}
        key={device.id}
        device={device}
    />);

    const currentMonth = getMonthFromDate()

    const readingsLength = devices[0].readings?.length;
    const isReadingsCurrent = currentMonth === getMonthFromDate(devices[0].readings[0].readingDate);

    const isRightArrowDisabled = sliderIndex + 1 > readingsLength - +isReadingsCurrent - 1

    const onClickIncrease = () => {
        setSliderIndex((index) => {
                return isRightArrowDisabled
                    ? index
                    : index + 1
            }
        )
    }

    const isLeftArrowDisabled = sliderIndex - 1 < 0;

    const onClickDecrease = () => {
        setSliderIndex((index) => {
                return isLeftArrowDisabled
                    ? index
                    : index - 1
            }
        )
    }

    const getPreviousReadingsMonth = (sliderIndex: number) => {
        const month = moment().subtract(sliderIndex + 1, 'months').format('MMMM');

        return firstLetterToUpperCase(month)
    }

    return (
        <Meters>
            <MetersHeader>
                <span>Информация o приборe</span>

                <CenterContainer>
                    <ArrowContainer
                        onClick={onClickDecrease}
                        className={isLeftArrowDisabled ? s.arrowDisabled : s.arrowEnabled}>
                        <Arrow isDisabled={isLeftArrowDisabled} />
                    </ArrowContainer>
                    <CenterContainer>
                        {getPreviousReadingsMonth(sliderIndex)}
                    </CenterContainer>
                    <ArrowContainer
                        className={isRightArrowDisabled ? s.arrowDisabled : s.arrowEnabled}
                        onClick={onClickIncrease}>
                        <Arrow isRight isDisabled={isRightArrowDisabled} />
                    </ArrowContainer>
                </CenterContainer>

                <CenterContainer>
                    {currentMonth}
                </CenterContainer>

            </MetersHeader>
            {readings}
        </Meters>
    )
}

const Meters = styled.div`
  grid-template-columns: minmax(250px, 350px) auto minmax(300px, 350px);
`

const MetersHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(330px, 5.5fr) 2.25fr 2.25fr 2fr;
  border-bottom: 1px solid var(--frame);
  padding: 8px 16px;
  column-gap: 16px;
  height: 48px;
  background: var(--bg);
  align-items: center;
  color: var(--main-90);
`

const ArrowContainer = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const CenterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`


