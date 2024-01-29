import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  color: #272f5a;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

export const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
  margin-top: 8px;
`;

export const SkeletonSC = styled(Skeleton.Input)`
  height: 70px !important;
  width: 100% !important;
`;

export const LinkButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;

  color: #189ee9;

  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;

  path {
    fill: #189ee9;
  }
`;
