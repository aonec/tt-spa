import React from "react";
import styled from "styled-components";
import {InputTT} from "../../../../../../tt-components/InputTT";
import { Input} from 'antd';

let ReadingLineStyled = styled.div`
display: flex;
border: 1px solid #DCDEE4;
margin-right: 8px;
// padding: 16px 24px;
`

const Label = styled.label`
display: flex;
min-width: 60px;
align-items: center;
padding-left: 10px;
margin-right:10px; 
background-color: #E5E5E5
`

// const Input = styled.Input`
//       color: rgba(39, 47, 90, 0.8);
//       box-sizing: border-box;
//       border-radius: 4px;
//       width: 100%;
//       height: 48px;
//       font-size: 14px;
//       line-height: 1.6;
//
//       &:after {
//       content: "м",
//       display: block;
//       }
// `

const TarifLabel = styled.span`
color: rgba(39, 47, 90, 0.32);
`


const DeviceRates = ({index, onChange, value, readingsBlocked}) => {



   return (
       <ReadingLineStyled>
        {/*<span style={{width: `${100/readingsState.length}%`}}>Тариф {index+1}: {value}</span>*/}
        {/*<Label htmlFor={'id' + index} style={{}}><span style={{color: '#DCDEE4'}}>Тариф {index+1}: </span></Label>*/}
        {/*<Input*/}
        {/*    // name="numberOfGuests"*/}
        {/*    disabled={readingsBlocked}*/}
        {/*    type="text"*/}
        {/*    value={value}*/}
        {/*    onChange={onChange}*/}
        {/*/>*/}
           <Input
               // placeholder="Enter your username"
               prefix={<TarifLabel>Тариф {index+1}: </TarifLabel>}
               suffix={`м³`}
               disabled={readingsBlocked}
               type="text"
               value={value}
               onChange={onChange}
           />
       </ReadingLineStyled>
)
}

export default DeviceRates;
