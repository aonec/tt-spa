import styled from 'styled-components';

export const DisplayFileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 105px;

  border-radius: 8px;
  border: 1px solid #f3f5f6;
  background: #fff;

  box-shadow:
    0px 8px 16px 0px rgba(78, 93, 146, 0.08),
    0px 4px 4px 0px rgba(78, 93, 146, 0.16);
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 33px;
  height: 33px;
  border-radius: 50%;
  color: #585858;
  background-color: #00000015;
  font-size: 25px;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BottomBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const FileName = styled.p`
  display: flex;

  color: #272f5a;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
`;

export const FileTypeAndSize = styled.p`
  display: flex;

  color: #272f5a;
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  line-height: 32px;
`;

export const TrashIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;

  cursor: pointer;
`;
