import styled from 'styled-components';

export const Wrapper = styled.div<{ disabled: boolean }>`
  ${({ disabled }) =>
    disabled &&
    `opacity: 0.7;
    user-select: none;
        `}
`;
