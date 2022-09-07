import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const InfoWrapper = styled.div`
  margin-top: 16px;
`;

export const TitleWrapper = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: #272f5a;

  margin-top: 32px;
`;

export const RowWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  height: 48px;

  color: #272f5ae5;
  font-size: 14px;

  border-bottom: 1px solid var(--frame);
`;

export const LinkSC = styled(Link)`
  font-weight: 500;
  color: #272f5a;
`;
