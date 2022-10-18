import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr 0.75fr;
  align-items: center;
  grid-gap: 0 15px;
  height: 46px;
  border-bottom: 1px solid #dcdee4;
  padding-left: 15px;
  color: rgba(39, 47, 90, 0.8);
  cursor: pointer;
  transition: 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: #189ee9;
  }
`;

export const ApartmentNumberWrapper = styled.div`
  font-weight: 500;
`;
