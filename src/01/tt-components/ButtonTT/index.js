import styled, { css } from 'styled-components';

export const ButtonTT = styled.button.attrs((props) => ({
  size: props.size,
  small: props.small,
}))`
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
  width: ${(props) => (props.big ? '224px' : 'fit-content')};


  
  &:before {
    display: none;
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    position: absolute;
    border-right: 1px solid rgba(39, 47, 90, 0.8);
    border-bottom: 1px solid rgba(39, 47, 90, 0.8);
    border-radius: inherit;
  }

  &:hover:not(:disabled) {
    transform: translate(-4px, -4px);

    &:before {
      display: block;
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
                  `)
          || (color === 'blueshadow'
                  && css`

                    background: #189ee9;
                    opacity: 0.5;
                    color: #ffffff;

                  `)
          || (color === 'white'
                  && css`
                    background: transparent;
                    color: #272F5A;
                    border: 1px solid #DCDEE4;
                  `)};

  ${({ color }) => (color === 'red'
          && css`
            background: #fc525b;
            color: #ffffff;
          `)
          || (color === 'blue'
                  && css`
                    background: #189ee9;
                    color: #ffffff;

                  `) || (color === 'white'
                  && css`
                    background: transparent;
                    color: #272F5A;
                    border: 1px solid #DCDEE4;
                  `)};

  &:active {
    background-color: #272F5A;
  }

  &:disabled {
    background-color: rgba(39, 47, 90, 0.32);
    color: #fff;
  }

  ${(props) => props.small && css`
    padding: 8px 16px;
    font-size: 14px;
    line-height: 16px;
    height: auto;
    display: flex;
    svg {
      margin-left: 16px;
    }
  `}

`;

export default ButtonTT;
