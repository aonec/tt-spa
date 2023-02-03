import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  max-width: 1200px;
`;

export const Title = styled.div`
  margin: 32px 0 0 16px;
  color: rgba(39, 47, 90, 0.9);
  font-weight: 400;
  font-size: 14px;
`;

export const ReportBlocksWrapper = styled.div`
  position: relative;
`;

export const ReportsList = styled.div`
  scroll-behavior: smooth;
  padding: 16px;
  display: flex;
  gap: 16px;
  overflow-x: scroll;
  scrollbar-width: none !important;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ReportBlock = styled(Link)`
  min-width: 280px;
  height: 104px;
  background: white;
  border: 1px solid #dcdee4;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  cursor: pointer;

  svg {
    width: 28px;
    height: 32px;

    path {
      fill: #272f5a;
    }
  }

  &:hover {
    transform: scale(1.04);
    box-shadow: 0px 6px 6px rgba(78, 93, 146, 0.16),
      0px 8px 16px rgba(78, 33, 146, 0.1);
  }
`;

export const ReportName = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #272f5a;
  margin-top: 8px;
`;

export const ScrollButton = styled.div<{ isRight?: boolean }>`
  position: absolute;
  top: calc(50% - 21px);
  transform: translateX(${({ isRight }) => (isRight ? '21px' : '-21px')});
  right: ${({ isRight }) => (isRight ? '0' : 'none')};
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff44;
  backdrop-filter: blur(4px);
  border: 1px solid #dcdee4;
  width: 42px;
  height: 42px;
  z-index: 2;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    box-shadow: 0px 4px 6px rgba(78, 93, 146, 0.1);
    background: #ffffff;
    svg {
      path {
        fill: #189ee9;
      }
    }
  }
`;

export const ChevronIconSC = styled(ChevronIcon)<{ isRight?: boolean }>`
  ${({ isRight }) => isRight && 'transform: rotate(180deg);'}
`;
