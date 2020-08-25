import styled, {
  css
} from 'styled-components'

export const Button = styled.button`
  border: 1px solid #DCDEE4;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 16px;
  margin-top:16px;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  width: fit-content;
  transition: all 0.3s;
  &: hover {
    transition: all 0.3s;
    transform: translate(-2px, -2px);
    border-color: rgb(var(--primary));
    color: rgb(var(--primary));     
    }
  }
  ${props =>
  props.primary &&
  css`
      background: palevioletred;
      color: white;
    `};
`