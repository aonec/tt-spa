import transformDate from "../../../../utils/transformDate";
import React from "react";
import styled from "styled-components";


export const Dates: React.FC<DateProps> = ({firstDate, lastDate}) => {
    return (
        <>
            <DateWrapper>
                {transformDate(firstDate)} - {transformDate(lastDate)}
            </DateWrapper>
        </>
    )
}


interface DateProps {
  firstDate: string | null
  lastDate: string | null
}

const DateWrapper = styled.span`
  margin: 0 auto;
  color: #272F5A;
  opacity: 0.7;
`
