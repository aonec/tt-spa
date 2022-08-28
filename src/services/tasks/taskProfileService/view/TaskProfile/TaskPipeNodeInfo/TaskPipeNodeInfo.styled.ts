import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 32px;
  width: 100%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  font-size: 24px;
  font-weight: 400;
  color: #272f5a;
`;

export const StatisticWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 16px;
  padding: 16px;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16);
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TextWrapper = styled.div`
  margin-left: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #272f5a;
`;

export const LinkSC = styled(Link)`
  color: #189ee9;
`;
