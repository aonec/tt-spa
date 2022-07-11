import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 8px #1115352d;
  border-radius: 4px;
  padding: 16px 24px;
`;

export const ReadingsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const OldReadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NewReadingWrapper = styled.div`
  margin-left: 20px;
`;

export const SerialNumberWrapper = styled.div`
  color: rgba(39, 47, 90);
  margin-left: 10px;
`;
export const ModelWrapper = styled.div`
  color: rgba(39, 47, 90, 0.32);
  margin-left: 10px;
`;

export const Title = styled.div`
  color: #272f5ab2;
  font-size: 16px;
  font-weight: 500;
`;

export const DeviceInfo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

export const Input = styled.input<{ color: string; edited?: boolean }>`
  height: 35px;
  padding: 2px 10px;
  border: 1px solid ${({ color }) => color};
  border-left: 5px solid ${({ color }) => color};
  border-radius: 5px;
  transition: 0.2s;

  &:focus {
    box-shadow: 0 4px 8px rgba(7, 0, 44, 0.15);
  }
`;
