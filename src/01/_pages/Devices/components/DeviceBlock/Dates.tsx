import transformDate from "../../../../utils/transformDate";
import React from "react";
import styled from "styled-components";
import {CalculatorsInterface, DeviceInterface} from "../utils/groupDevicesByObjects";

export const Dates: React.FC = ({device}) => {

    debugger;

    return (
        <>
            <CheckingDates>
                {transformDate(device.futureCheckingDate)}
            </CheckingDates>

            <LastCommercialAccountingDate>
                {transformDate(device.lastCommercialAccountingDate)}
            </LastCommercialAccountingDate>
        </>
    )
}

const LastCommercialAccountingDate = styled.div`
margin: 0 auto;
color: '272F5A';
opacity: 0.6;
`

const CheckingDates = styled.div`
margin: 0 auto;
color: '272F5A';
opacity: 0.8;
`