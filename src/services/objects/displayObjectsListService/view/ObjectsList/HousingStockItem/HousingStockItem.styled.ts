import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled(Link)`
  display: grid;
  grid-template-columns: 1.2fr 0.5fr 0.5fr 32px;
  align-items: center;

  padding: 10px 0;
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

export const Address = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #272f5a;
`;

export const AdditionalAddress = styled.div`
  font-size: 13px;
  font-weight: 400;
  opacity: 0.8;
  margin-top: 7px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: min-content;
  max-width: 400px;
`;

export const NumberOfTasks = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin-left: 10px;
  color: #272f5ae5;
`;
