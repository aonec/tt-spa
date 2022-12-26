import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div``;

export const PageTitle = styled.div`
  margin-top: 12px;
  margin-bottom: 20px;
`;

export const DeviceTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const DeviceModel = styled.div`
  color: rgba(39, 47, 90, 1);
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
  margin: 0px 12px;
`;

export const DeviceNumber = styled.div`
  color: rgba(39, 47, 90, 0.7);
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
`;

export const PageGridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 36px;
`;

export const RightBlock = styled.div``;

export const TasksWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Tasks = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #272f5a;
`;

export const LinkSC = styled(Link)`
  color: #189ee9;
`;
