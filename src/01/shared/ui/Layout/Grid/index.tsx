import styled from 'styled-components';

interface Props {
  temp: string;
  gap?: string;
}

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ temp }: Props) => temp};
  grid-gap: ${({ gap }: Props) => gap};
`;
