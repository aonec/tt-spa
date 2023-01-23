import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Description = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
`;

export const CalculatorBlock = styled.div`
  display: flex;

  margin-top: 16px;
`;

export const Model = styled.a`
  color: rgba(39, 47, 90, 1);
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;

  :hover {
    color: rgba(24, 158, 233, 1);
    text-decoration-line: underline;
    cursor: pointer;
  }
`;

export const Number = styled.div`
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  color: rgba(39, 47, 90, 0.7);
  margin-left: 8px;
`;
