import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  margin-top: 16px;
`;

export const Circle = styled.div<{
  iconColor: string;
  border: string;
  background: string;
}>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid;

  display: flex;
  align-items: center;
  justify-content: center;

  path {
    fill: ${({ iconColor }) => iconColor};
  }
  color: ${({ iconColor }) => iconColor};

  border-color: ${({ border }) => border};
  background-color: ${({ background }) => background};
`;

export const StageNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StageInfoWrapper = styled.div<{ isActive: boolean }>`
  font-size: 14px;
  color: ${({ isActive }) => (isActive ? '#272F5ACC' : '#272F5A99')};
  font-weight: ${({ isActive }) => (isActive ? '500' : '400')};

  flex-grow: 3;
  margin-left: 16px;
`;

export const PerpetratorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #272f5a52;
  font-size: 12px;
`;

export const StageLine = styled.div<{ isActive: boolean }>`
  margin-top: 8px;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--primary-100)' : '#DCDEE4'};
  width: 1px;
  height: 100%;
`;

export const StageLineWrapper = styled.div`
  min-height: 12px;
  flex-grow: 3;

  display: flex;
  justify-content: center;
`;

export const StagePanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
