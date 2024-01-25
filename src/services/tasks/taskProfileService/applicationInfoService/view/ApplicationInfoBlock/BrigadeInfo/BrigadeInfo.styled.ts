import { Avatar } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 30px;
`;

export const Header = styled.div`
  color: #272f5a;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  margin-bottom: 16px;
`;

export const BrigadeMember = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const Name = styled.div`
  color: #272f5a;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;

export const AvatarSC = styled(Avatar)<{ color: string }>`
  background-color: ${({ color }) => color};
  padding-top: 0px;
`;
