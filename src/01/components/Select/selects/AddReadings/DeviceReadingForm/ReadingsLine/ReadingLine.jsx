import React from "react";
import styled from "styled-components";

let ReadingLineStyled = styled.div`
display: flex;
border: 1px solid #DCDEE4;

`

const Label = styled.label`
display: flex;
min-width: 60px;
`


const ReadingLine = ({index, onChange, readingsState}) => {

   return (
       <ReadingLineStyled>
        {/*<span style={{width: `${100/readingsState.length}%`}}>Тариф {index+1}: {value}</span>*/}
        <Label htmlFor={'id' + index} style={{paddingLeft: 10, marginRight:10}}><span style={{color: '#DCDEE4'}}>Тариф {index+1}: </span></Label>
        <input
            // name="numberOfGuests"
            type="text"
            id={'id' + index}
            value={readingsState[index]}
            onChange={onChange}
        />
       </ReadingLineStyled>
)
}

export default ReadingLine;
