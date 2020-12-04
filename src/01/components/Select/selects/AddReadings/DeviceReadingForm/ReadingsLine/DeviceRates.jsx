import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { InputTT } from '../../../../../../tt-components/InputTT';

const ReadingLineStyled = styled.div`
// max-width: 180px;
// border: 1px solid #DCDEE4;
// margin-right: 8px;
`;

const StyledInput = styled(Input)`
color: var(--main-70);
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
  index, onChange, value, readingsBlocked = false, resource, operatorCabinet = false, sendReadings,
}) => {
  const [prevValue, setPrevValue] = useState(null);

  const onBlurHandler = (e) => {
    if (prevValue === e.target.value) return;
    sendReadings();
  };

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
        onBlur={operatorCabinet ? onBlurHandler : null}
        onFocus={(e) => setPrevValue(e.target.value)}
      />
    </ReadingLineStyled>
  );
};

export default DeviceRates;
