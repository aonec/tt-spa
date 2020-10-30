import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import styled from 'styled-components'

const StyledBreadcrumb = styled(NavLink)`
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
