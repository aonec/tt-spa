import styled from 'styled-components';

export const Wrap = styled.div`
  padding: 15px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 0.6fr 1fr;
  grid-gap: 30px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

export const Address = styled.div`
  font-weight: bold;
`;

export const AddInspecor = styled.div`
  border-top: 2px solid #dcdee4;
  height: 40px;
  color: #189ee9;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  border-radius: 0px;
  margin-top: 6px;
  padding-top: 10px;
  padding-left: 14px;
`;
