import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 8px #1115352d;
  border-radius: 4px;
  padding: 16px 24px;
  margin-top: 16px;
  width: 700px;
`;

export const ReadingsWrapper = styled.div`
  display: flex;
`;

export const OldReadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NewReadingWrapper = styled.div`
  margin-left: 16px;
  width: 150px;
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
  align-items: center;
  margin-top: 12px;
`;
