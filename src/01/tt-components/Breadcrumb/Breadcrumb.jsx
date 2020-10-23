import React from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components'

const StyledBreadcrumb = styled.span`
font-weight: 500;
color: #272F5A;
cursor: pointer;

&: hover {
color: #189EE9;
}
`

const Breadcrumb = () => {

    const {goBack} = useHistory();

    return (
        <div>

        <StyledBreadcrumb onClick={goBack}>

            <span>&#60; </span>Назад

        </StyledBreadcrumb>
        </div>
    )
}

export default Breadcrumb;
