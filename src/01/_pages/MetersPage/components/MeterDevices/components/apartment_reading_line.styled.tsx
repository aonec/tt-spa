import styled from "styled-components";

export const FullDeviceLine = styled.div`
  display: grid;
  grid-template-columns: minmax(330px, 4.75fr) 2.25fr 2.25fr 1.2fr;
  column-gap: 16px;
  margin-top: 4px;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
  padding: 4px 0 10px 8px;
  border-bottom: 1px solid #dcdee4;
  ${({ closed }: { closed?: boolean }) => (closed ? 'opacity: 0.7;' : '')}
`;
