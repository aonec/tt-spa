import styled from 'styled-components';

export const Badge = styled.div`
  margin-top: 24px;
  color: #9a9fac;
  font-size: 13px;
`;

export const DevUrlInputWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const FeatureTogglesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const FeatureToggle = styled.div<{ color: string; isActive: boolean }>`
  cursor: pointer;
  border: 1px solid ${({ color }) => color};
  background: ${({ isActive, color }) => (isActive ? color : 'white')};
  color: ${({ isActive, color }) => (!isActive ? color : 'white')};
  padding: 2px 16px;
  border-radius: 16px;
  font-weight: bold;
`;
