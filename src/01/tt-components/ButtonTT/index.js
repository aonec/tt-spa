import styled, { css } from 'styled-components';

export const ButtonTT = styled.button`
  position: relative;   
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  height: 48px;
  border: 1px solid #dcdee4;
  padding: 8px 24px;
  background-color: #189EE9;
  transition: background-color 150ms linear 0s, transform 150ms linear 0s, border-color 150ms linear 0s;
  &:before {
      display: none;
      content: "";
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        z-index:0;
        position: absolute;
        border-right: 1px solid rgba(39, 47, 90, 0.8);
        border-bottom: 1px solid rgba(39, 47, 90, 0.8);
        border-radius: inherit;
    }
  &:hover:not(:disabled) {
    transform: translate(-4px, -4px);
    &:before {
    display:block;
        transform: translate(4px, 4px);
    }
  }
  ${({ color }) => (color === 'red'
    && css`
        background: #fc525b;
        color: #ffffff;
      `)
    || (color === 'blue'
        && css`
        background: #189ee9;
        color: #ffffff;
        
      `)|| (color === 'white'
        && css`
        background: transparent;
        color: #272F5A;
        border: 1px solid #DCDEE4;
      `)};
      
      
      
       $:disabled {
        background: rgba(39, 47, 90, 0.32);
        color: #ffffff;
      )};
      
      &:active {
        background-color: #272F5A;
      }
      
      &:disabled {
        background-color: rgba(39, 47, 90, 0.32);
        color: #fff;
      }
      

`;

export default ButtonTT;
