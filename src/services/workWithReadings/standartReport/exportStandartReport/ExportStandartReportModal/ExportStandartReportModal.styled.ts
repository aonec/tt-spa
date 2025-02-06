import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FileBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr auto;
  align-items: center;
  padding: 12px;
  box-shadow: 0px 8px 16px 0px #4e5d9214;
  box-shadow: 0px 4px 4px 0px #4e5d9229;
  background: white;
  border-radius: 2px;
`;

export const LastPollBlock = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${({ color }) => color}88;
  background: ${({ color }) => color}11;
`;

export const FileBlockTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
`;

export const ExportDateTime = styled.div`
  opacity: 0.8;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ExportResultTitle = styled.div`
  font-size: 18px;
  color: #6f6f6f;
`;

export const ExportResultDateTime = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
`;
