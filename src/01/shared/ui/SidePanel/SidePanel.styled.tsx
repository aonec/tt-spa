import styled from 'styled-components';
import { ChevronRight } from 'react-bootstrap-icons';
import { Link as RouterLink } from "react-router-dom"

export const Wrap = styled.div`
  padding: 15px;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  display: flex;
  justify-content: space-between;
  height: min-content;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #272f5a;
`;

export const Link = styled(RouterLink)`
  display: flex;
  align-items: center;
  color: #189ee9;
  cursor: pointer;
`;

export const LinkArrowIcon = styled(ChevronRight)`
  margin-left: 3px;
  transform: translateY(1px);
  font-size: 12px;
`;
