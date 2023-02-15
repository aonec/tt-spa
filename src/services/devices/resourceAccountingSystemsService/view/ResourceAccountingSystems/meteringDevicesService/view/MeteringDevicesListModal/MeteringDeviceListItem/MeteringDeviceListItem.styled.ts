import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);

  margin-top: 5px;

  &:first-child {
    margin-top: 0;
  }

  height: 64px;
  padding: 0 5px 0 20px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 0.3fr 0.3fr 40px;
  align-items: center;
`;

export const ModelWrapper = styled(Link)`
  cursor: pointer;

  &:hover {
    span {
      color: #189ee9;
    }
  }
`;

export const Model = styled.span`
  color: #272f5a;
  font-size: 16px;
  font-weight: 400;
`;

export const SerialNumber = styled.span`
  margin-left: 5px;
  color: rgba(39, 47, 90, 0.7);
  font-size: 16px;
  font-weight: 400;
`;

export const AdditionalInfo = styled.div`
  color: rgba(39, 47, 90, 0.7);
  font-size: 14px;
`;

export const BaseInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const WarningIconWrapper = styled.div`
  margin-left: 10px;
  display: flex;
`;
