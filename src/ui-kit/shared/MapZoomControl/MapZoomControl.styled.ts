import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

export const ZoomButton = styled.div`
  margin-bottom: 8px;
  background: white;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: white;
    background-color: #189ee9;
  }
`;
