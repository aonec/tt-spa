import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const ClosingDate = styled.div`
  margin-top: 4px;
  margin-left: 38px;
  font-weight: bold;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SerialNumberWrapper = styled.span`
  margin-left: 6px;
  font-weight: 500;
`;

const clickableStyles = css`
  color: #189ee9 !important;
`;

export const LinkWrapper = styled(Link)<{ clickable: boolean }>`
  display: flex;
  align-items: center;

  font-size: 16px;
  color: #272f5a;
  cursor: pointer;

  &:hover {
    ${({ clickable }) => clickable && clickableStyles}
  }
`;

export const ModelWrapper = styled.span`
  margin-left: 6px;
  color: rgba(39, 47, 90, 0.6);

  max-width: 150px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const ApartmentInfo = styled.div`
  display: flex;
  align-items: center;

  margin-left: 6px;
  margin-top: 8px;
`;

export const MountPlace = styled.div`
  margin-left: 8px;
  font-weight: 400;
  color: rgba(39, 47, 90, 0.6);
`;

export const DateLineWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;

  font-weight: 500;
  color: rgba(39, 47, 90);

  white-space: nowrap;
`;

export const SealWrapper = styled.div`
  color: rgba(39, 47, 90, 0.7);
  margin-top: 8px;
  margin-left: 20px;
`;
