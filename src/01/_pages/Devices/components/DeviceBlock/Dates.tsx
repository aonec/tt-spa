import transformDate from "../../../../utils/transformDate";
import React from "react";
import styled from "styled-components";
import {CalculatorsInterface, DeviceInterface} from "../utils/groupDevicesByObjects";

export const Dates: React.FC = ({firstDate, lastDate}) => {


    return (
        <>
            {/*<CheckingDates>*/}
            {/*    {transformDate(device.futureCheckingDate)}*/}
            {/*</CheckingDates>*/}

            <LastCommercialAccountingDate>
                {transformDate(firstDate)} - {transformDate(lastDate)}
            </LastCommercialAccountingDate>
        </>
    )
}

const LastCommercialAccountingDate = styled.span`
margin: 0 auto;
color: #272F5A;
opacity: 0.7;
`

const CheckingDates = styled.div`
margin: 0 auto;
color: #272F5A;
opacity: 0.8;
`