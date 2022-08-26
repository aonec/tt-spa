import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled(Link)`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 0.6fr 32px;
  align-items: center;
  justify-content: space-around;

  padding: 10px 0px;
  transition: 0.2s;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #00000000;

  color: #272f5ae5 !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;

  &:hover {
    * {
      color: #189ee9 !important;
    }
  }
`;

export const Address = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #272f5ab2;
`;

export const HomeownerWrapper = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #272f5ae5;
`;

export const NumberOfTasks = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin-left: 16px;
  color: #272f5ae5;
`;

export const AccountNumber = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #272f5a;
`;
