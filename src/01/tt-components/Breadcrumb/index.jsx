import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledBreadcrumb = styled(Link)`
    font-weight: 500;
    color: #272f5a;
    cursor: pointer;

    &: hover {
        color: #189ee9;
    }
`

export const Breadcrumb = ({ path }) => (
    <div>
        <StyledBreadcrumb to={`${path}`}>&lt; Назад</StyledBreadcrumb>
    </div>
)

export default Breadcrumb
