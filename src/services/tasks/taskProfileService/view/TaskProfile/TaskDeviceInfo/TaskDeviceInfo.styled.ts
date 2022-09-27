import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 32px;
  width: 100%;
`;

export const TitleWrapper = styled(Link)`
  display: flex;
  align-items: center;

  font-size: 24px;
  font-weight: 400;
  color: #272f5a;
`;

export const RowWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  height: 48px;

  color: #272f5ae5;
  font-size: 14px;

  border-bottom: 1px solid var(--frame);
`;

export const SerialNumber = styled.div`
  margin-left: 10px;
  font-size: 16px;
`;

export const Model = styled.div`
  margin-left: 10px;
  font-size: 16px;
  color: #272f5a88;
`;
