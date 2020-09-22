import styled, { css } from 'styled-components';

export const ButtonTT = styled.button`
      border-radius: 4px;
    font-weight: 500;
    font-size: 16px;
    line-height: 32px;
    height: 48px;
    border: 1px solid #dcdee4;
    padding: 8px 24px;
 ${({ color }) => (color === 'red'
  && css`
   background: #FC525B;
   color: #ffffff;
      `)
  || (color === 'blue'
    && css`
   background: #189EE9;
   color: #ffffff;
      `)};
`;

export default ButtonTT;

// import styled, {css} from 'styled-components';
//
// export const ButtonDefault = styled.button`
//   --color-def: var(--main-100);
//   --color-hover: var(--primary-100);
//   --border-def: var(--frame);
//   --border-hover: var(--primary-100);
//   --bg-def: transparent;
//   --bg-hover: transparent;
//   --padding: 16px;
//   --fs: 14px;
//   --h: var(--h-norm);
//   height: var(--h);
//   color: var(--color-def);
//   font-size: var(--fs);
//   padding: 0 var(--padding);
//   display: grid;
//   grid-auto-flow: column;
//   grid-gap: 8px;
//   font-weight: 600;
//   position: relative;
//   transition: color 70ms linear;
//   min-width: max-content;
//   z-index: 10;
//
//   &::before,
//   &::after {
//     content: "";
//     left: 0;
//     right: 0;
//     top: 0;
//     bottom: 0;
//     position: absolute;
//     border: 1px solid;
//     border-radius: inherit;
//   }
//   &::before {
//     background-color: var(--bg-def);
//     border-color: var(--border-def);
//     z-index: 0;
//   }
//   &::after {
//     z-index: -1;
//     border-color: transparent;
//   }
//   &::before,
//   &::after,
//   & > * {
//     transition: background-color 150ms linear, transform 150ms linear,
//       border-color 150ms linear;
//   }
//   & > * {
//     position: relative;
//     z-index: 2;
//   }
//
//
//   &:hover {
//     color: var(--color-hover);
//     &::before,
//     & > * {
//       transform: translate(-2px, -2px);
//     }
//     &::before {
//       border-color: var(--border-hover);
//       background-color: var(--bg-hover);
//     }
//     &::after {
//       transform: translate(2px, 2px);
//       border-color: var(--frame);
//     }
//   }
//   &:active:not(:disabled) {
//     color: #fff;
//     &::before {
//       border-color: var(--main-100);
//       background-color: var(--main-100);
//     }
//   }
//
//
//   &:hover:not(:active, :disabled),
//   &:focus:not(:active) {
//     color: var(--color-hover);
//     &::before,
//     & > * {
//       transform: translate(-2px, -2px);
//     }
//     &::before {
//       border-color: var(--border-hover);
//       background-color: var(--bg-hover);
//     }
//     &::after {
//       transform: translate(2px, 2px);
//       border-color: var(--frame);
//     }
//   }
//   &:active:not(:disabled) {
//     color: #fff;
//     &::before {
//       border-color: var(--main-100);
//       background-color: var(--main-100);
//     }
//   }
//
//   &[data-big] {
//     font-size: 16px;
//     height: var(--h-big);
//   }
//   &[data-primary] {
//     --color-def: #fff;
//     --color-hover: #fff;
//     --border-def: var(--primary-100);
//     --border-hover: var(--primary-100);
//     --bg-def: var(--primary-100);
//     --bg-hover: var(--primary-100);
//   }
//   &:disabled {
//     background-color: #fff;
//     color: var(--main-32);
//     &::before {
//       background-color: var(--main-4);
//       border-color: var(--frame);
//     }
//   }
//   & > Loader {
//     position: absolute;
//     top: 4px;
//     right: 4px;
//   }
// `;
//
// export default ButtonDefault;
