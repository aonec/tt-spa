import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled(Link)`
  min-width: 650px;
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr 0.75fr;
  align-items: center;
  grid-gap: 0 15px;
  height: 46px;
  border-bottom: 1px solid #dcdee4;
  padding-left: 15px;
  color: rgba(39, 47, 90, 0.8);
  cursor: pointer;
  transition: 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: #189ee9;
  }
`;

export const ApartmentNumberWrapper = styled.div`
  font-weight: 500;
  display: flex;
`;

export const HomeownerNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AdditionalHomeownersCountWrapper = styled.div`
  margin-left: 10px;
  color: #189ee9;
  background: rgba(24, 158, 233, 0.16);
  width: 17px;
  height: 17px;
  font-size: 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AdditionalHomeownersCountTextWrapper = styled.span`
  transform: translateX(-1px);
`;

export const WarningIconWrapper = styled.div`
  margin-left: 10px;
`;

export const PauseIconWrapper = styled.div`
  margin-left: 10px;
`;
