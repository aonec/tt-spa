import { Plus } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { Input } from 'ui-kit/Input';

export const PageWrapper = styled.div`
  width: min-content;
  overflow-x: hidden;
`;

export const WrapperMultiHeader = styled.div`
  margin: 10px 0px;
`;

export const WrapperT3 = styled.div`
  white-space: normal;
`;

export const WrapperCelsius = styled.div`
  color: rgba(39, 47, 90, 0.32);
`;

export const WrapperValue = styled.div`
  padding: 0 0 0 17px;
`;

export const WrapperUnderscore = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding: 0 26px 6px 6px;
  margin-bottom: 6px;
`;

export const WrapperTime = styled.div`
  display: grid;
  width: 260px;
  padding-left: 16px;
  grid-template-columns: 1.55fr 1fr;
`;

export const InputSc = styled(Input)<{ isErr?: boolean }>`
  height: 32px;

  .ant-input {
    background-color: ${({ isErr }) => (isErr ? '#ff002140' : 'none')};
    margin-top: 6px;
    height: 20px;
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  gap: 32px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: end;
  justify-content: flex-end;
  gap: 16px;
  height: 280px;
  background-color: white;
`;

export const activeRowCSS = `
  background-color: #ffe8e8;
`;

export const NewLineWrapper = styled.div<{ temp: string }>`
  background: #f2faffff;
  display: grid;
  grid-template-columns: ${({ temp }) => temp};
  padding-top: 8px;
  min-height: 50px;
  gap: 16px;
  padding-left: 16px;
  width: calc(100% - 16px);
`;

export const NewLineCiolumnWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const PlusIconSC = styled(Plus)`
  transform: scale(2);
`;
