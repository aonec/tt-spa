import React from 'react';
import transformDate from '../../utils/transformDate';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    font-weight: 400;
    color: rgba(39, 47, 90, 0.6);
    line-height: 1.2;
    align-items: center;
    white-space: nowrap;
`

export const DateLine = ({ lastCheckingDate, futureCheckingDate }) => {
    return (
        <Container>
            {transformDate(lastCheckingDate)} —{' '}
            {transformDate(futureCheckingDate)}
        </Container>
    )
}
