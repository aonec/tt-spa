import styled from 'styled-components';

export const Wrapper = styled.div``;

export const PageTitle = styled.div`
  margin-top: 12px;
  margin-bottom: 20px;
`;

export const DeviceTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const DeviceModel = styled.div`
  color: rgba(39, 47, 90, 1);
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
  margin: 0px 12px;
`;

export const DeviceNumber = styled.div`
  color: rgba(39, 47, 90, 0.7);
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
`;

export const PageGridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

export const RightBlock = styled.div``;

export const MockComponent = styled.div`
  width: 312px;
  background: #ffffff;
  border: 1px solid #f3f5f6;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  border-radius: 4px;
  padding: 14px;
  margin: 10px;
`;

export const CommentComponent = styled.div`
  width: 312px;
  height: 160px;
  background: #ffffff;
  border: 1px solid #f3f5f6;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  border-radius: 4px;
  padding: 14px;
  margin: 10px;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CommentTitle = styled.div`
  color: #272f5a;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

export const RightButtonsBlock = styled.div``;

export const CommentText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #272f5a;
  margin-top: 12px;
`;

export const CommentInfo = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
`;

export const UserName = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.9);
  margin: 0px 6px;
`;

export const CommentDate = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.7);
`;

export const IconSubstrate = styled.div`
  display: flex;
  border-radius: 50%;
  background: #f3f5f6;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;
