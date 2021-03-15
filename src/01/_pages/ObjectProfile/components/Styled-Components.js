import styled from 'styled-components'

export const EditButtonTemplate = styled.button`
    border: 1px solid #dcdee4;
    box-sizing: border-box;
    border-radius: 4px;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const List = styled.ul`
    border: 1px solid #dcdee4;
    position: absolute;
    right: 0;
    min-width: 408px;
    width: max-content;
    z-index: 1;
    background: white;
    display: none;
`

export const ListItem = styled.li`
    font-size: 16px;
    line-height: 32px;
    padding: 8px 24px;
    cursor: pointer;
    color: #272f5a !important;
    border-bottom: 1px solid #dcdee4;
    &:hover {
        background: #189ee9;
        color: #ffffff !important;
    }
`

export const EditButtonWrap = styled.button`
border: 1px solid #DCDEE4;
box-sizing: border-box;
border-radius: 4px;
width: 48px;
height: 48px;
display: flex;
justify-content: center;
align-items: center;
}
`
