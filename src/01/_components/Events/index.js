import styled from 'styled-components';

export const Task = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: fit-content;

  &:hover {
    color: #40a9ff;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    div {
      color: #40a9ff;
    }
  }
`;

export const StageName = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.85);
`;
export const TasksWrap = styled.div`
  padding-left: 40px;
`;

export const TaskName = styled.p`
  color: rgba(39, 47, 90, 0.45);
  font-size: 12px;
  line-height: 16px;
`;

export const TaskRow = styled.div`
  padding-top: 8px;
  color: rgba(39, 47, 90, 0.6);
  display: inline-flex;
  align-items: center;
`;

export const TasksTitle = styled.h2`
  font-size: 24px;
  line-height: 32px;
  padding-bottom: 14px;
`;
