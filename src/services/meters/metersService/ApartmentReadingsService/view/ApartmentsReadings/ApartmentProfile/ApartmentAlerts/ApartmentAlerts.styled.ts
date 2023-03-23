import styled from 'styled-components';
import { ArrowRight } from 'react-bootstrap-icons';

export const ApartmentAlertWrapper = styled.div`
  margin-top: 16px;
`;

export const AlertLink = styled.div`
  display: flex;
  align-items: center;
  color: #fc525b;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    color: red;

    .arrow-right {
      transform: translateX(2px);
    }
  }
`;

export const AlertContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ArrowRightSC = styled(ArrowRight)`
  margin-left: 6px;
  transition: 0.2s;
`;

export const HomeownerAccountChangeDate = styled.div`
  color: #272f5ab2;
`;
