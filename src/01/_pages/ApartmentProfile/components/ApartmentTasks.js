import styled, { css } from 'styled-components'

export const ApartmentTasks = styled.div`
padding:0 16px;
display: flex;
flex-direction:column;
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
export const ApartmentTasksTitle = styled.h2`
padding-bottom:24px;
margin:0;
font-weight: normal;
font-size: 24px;
line-height: 32px;
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
export const ApartmentTask = styled.a`
padding:0;
padding-top:32px;
margin:0;
&:first-of-type{
  padding:0;
}
`
export const ApartmentTaskTitle = styled.h3`
font-size: 14px;
line-height: 16px;
`

export const ApartmentTaskState = styled.p`
padding:0;
padding-top:8px;
margin:0;
display:flex;
font-size: 12px;
line-height: 16px;
color: #17B45A;
`

export const ApartmentTaskDate = styled.p`
padding:0;
padding-top:8px;
margin:0;
display:flex;
font-size: 12px;
line-height: 16px;
color: rgba(39, 47, 90, 0.6);
`