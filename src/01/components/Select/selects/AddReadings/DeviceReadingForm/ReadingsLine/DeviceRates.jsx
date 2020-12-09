import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { InputTT } from '../../../../../../tt-components/InputTT';



const StyledInput = styled(Input)`
// color: var(--main-70);
// border: 0; 
// padding: 0;
max-width: 200px;
`;

const ReadingLineStyled = styled.div`
// max-width: 180px;
// border: 1px solid #DCDEE4;
// margin-right: 8px;

`;


const Label = styled.label`
display: flex;
min-width: 60px;
align-items: center;
padding-left: 10px;
margin-right:10px; 
background-color: #E5E5E5
`;

const TarifLabel = styled.span`
color: rgba(39, 47, 90, 0.32);
`;

const DeviceRates = ({
  index, onChange, value, readingsBlocked = false, resource, operatorCabinet = false,
}) => {

  const isPrevOperatorReadings = operatorCabinet && readingsBlocked;

  return (
    <ReadingLineStyled>
      <StyledInput
        prefix={isPrevOperatorReadings ? null : (
          <TarifLabel>
            Тариф
            {index + 1}
            :
            {' '}
          </TarifLabel>
        )}
        suffix={resource === 'Electricity' ? 'кВтч' : 'м³'}
        disabled={readingsBlocked}
        type="number"
        value={value}
        onChange={onChange}
      />
    </ReadingLineStyled>
  );
};

export default DeviceRates;
