import React from 'react';
import styled from 'styled-components';

const ShowHiddenWrap = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

export function ShowHidden() {
  return <ShowHiddenWrap>Показать закрытые приборы (1)</ShowHiddenWrap>;
}

export default ShowHidden;
