import styled from 'styled-components';
import { Input } from 'ui-kit/Input';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px 20px;
`;

export const GridContainerAsymmetricLeft = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 4px 20px;
`;

export const GridContainerAsymmetricRight = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 4px 20px;
`;

export const ContainerWithOutline = styled.div`
  border-bottom: 1px solid #dcdee4;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export const TextareaSC = styled(Input.TextArea)`
  padding: 10px 10px 10px 20px;
  resize: none;
  border: 1px solid #dcdee4;
  border-radius: 4px;

  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
`;
