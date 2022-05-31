import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  padding: 20px 15px;
  transition: 0.2s;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #00000000;

  color: #272f5ae5 !important;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;

  &:hover {
    border-color: #189ee966;
    background-color: #189ee913;
  }
`;

export const Address = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #272f5a;
`;

export const AdditionalAddress = styled.span`
  font-size: 13px;
  font-weight: 400;
  opacity: 0.8;
  margin-left: 10px;
`;

export const NumberOfTasks = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin-left: 10px;
  color: #272f5ae5;
`;
