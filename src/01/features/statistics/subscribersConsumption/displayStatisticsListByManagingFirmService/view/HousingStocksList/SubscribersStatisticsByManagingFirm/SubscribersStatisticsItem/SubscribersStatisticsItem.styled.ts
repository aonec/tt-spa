import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 2.5fr 2.5fr 3.5fr;

  align-items: center;
  height: 50px;
  padding-left: 16px;
  color: #272f5a;
  border-bottom: 1px solid #dcdee4;
  transition: 0.2s;

  cursor: pointer;

  &:hover {
    color: #3241e6;
    background-color: #3948f113;
  }
  &:last-child {
    margin-bottom: 4px;
    box-shadow: 0px 6px 6px rgba(78, 93, 146, 0.16);
  }
`;

export const ApartmentNumberWrapper = styled.div`
  color: #272f5a;
  font-weight: 700;
`;

export const ConsumptionWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const HomeownerNumberWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  color: #272f5ab2;
`;

export const HomeownerNameWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const HomeownerInfoWrapper = styled.div`
  font-size: 12px;
  padding: 8px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
