import styled, { css } from 'styled-components'

export const ListItem = styled.div`
display: grid;
grid-template-columns: 1fr 3fr;
padding:16px 8px;
margin:0;
font-weight: normal;
font-size: 14px;
line-height: 16px;
border-bottom: 1px solid #DCDEE4;
  ${props =>
    props.description &&
    css`
    font-size: 24px;
    line-height: 48px;
   `||
    props.value &&
    css`
    font-size: 32px;
    line-height: 48px;
      `
  };
`
export const ListItemDescription = styled.p`
padding:0;
margin:0;
color: rgba(39, 47, 90, 0.6);
width: 210px;
  ${props =>
    props.description &&
    css`
    font-size: 24px;
    line-height: 48px;
   `||
    props.value &&
    css`
    font-size: 32px;
    line-height: 48px;
      `
  };
`
export const ListItemValue = styled.p`
padding:0;
padding-left:16px;
margin:0;
color: rgba(39, 47, 90, 0.8);
  ${props =>
    props.description &&
    css`
    font-size: 24px;
    line-height: 48px;
   `||
    props.value &&
    css`
    font-size: 32px;
    line-height: 48px;
      `
  };
`