import {useEffect} from "react";
import rateTypeToNumber from "../_api/utils/rateTypeToNumber";
import {formEmptyReadingsObject} from "../utils/formEmptyReadingsObject";
import {getMonthFromDate} from "../utils/getMonthFromDate";


export const useReadings = (device, setReadingsState, sliderIndex = 0) => {

    const currentMonth = getMonthFromDate();
    const numberOfReadings = rateTypeToNumber(device.rateType);
    const emptyReadingsObject = formEmptyReadingsObject(numberOfReadings);
    const isReadingsCurrent = currentMonth === getMonthFromDate(device.readings[0].readingDate);

    useEffect(() => {
        const previousReadingsArray = [];
        const currentReadingsArray = [];
        const prevReadingsIndex = sliderIndex + +isReadingsCurrent
        // const prevReadings = (isReadingsCurrent ? device.readings[1] : device.readings[0]) || {};
        const currentReadings = (isReadingsCurrent ? device.readings[0] : emptyReadingsObject) || {};
        const prevReadings = device.readings[prevReadingsIndex] || {};

        for (let i=1; i <= numberOfReadings; i++) {
            previousReadingsArray.push(prevReadings[`value${i}`] ?? '');
            currentReadingsArray.push(currentReadings[`value${i}`] ?? '');
        }

        setReadingsState({
            previousReadingsArray,
            currentReadingsArray,
            prevId: prevReadings.id,
            currId: currentReadings.id,
            resource: device.resource })
    }, [device.readings, numberOfReadings, sliderIndex]);



}