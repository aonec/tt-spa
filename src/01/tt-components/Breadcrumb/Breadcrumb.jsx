import React from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import styled from 'styled-components'

const StyledBreadcrumb = styled(Link)`
font-weight: 500;
color: #272F5A;
cursor: pointer;

&: hover {
color: #189EE9;
}
`

const Breadcrumb = ({path}) => {


    return (
        <div>

            <StyledBreadcrumb to={`${path}`}>&lt; Назад</StyledBreadcrumb>

        </div>
    )
}

export default Breadcrumb;
