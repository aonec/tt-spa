import React from 'react'
import styled, { css } from 'reshadow/macro'
import styledC from 'styled-components'
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom'
import { Loader } from '01/components'
import {ApartmentListResponse} from "../../../../myApi";

const styles = css`
    apart {
        display: grid;
        grid-template-columns: repeat(2, 1fr) repeat(2, 0.5fr);
        align-items: center;
        height: 48px;
        padding: 8px;
        cursor: pointer;
        &:hover {
            color: var(--primary-100);
            box-shadow: var(--shadow);
        }
    }

    apart_owner {
        opacity: 0.8;
    }
    apart_number,
    apart_square {
        opacity: 0.6;
    }
`

const Apart = styledC.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr) repeat(2, 0.5fr);
    align-items: center;
    height: 48px;
    padding: 8px;
    cursor: pointer;
        &:hover {
            color: var(--primary-100);
            box-shadow: var(--shadow);
        }
`

const ApartOwner = styledC.div`
    opacity: 0.8;
`

const ApartInfo = styledC.div`
    opacity: 0.6;
`

interface ApartmentsProps {
    loading: boolean | null
    items: ApartmentListResponse[] | null
}

export const Apartments = ({ loading = null, items = [] }: ApartmentsProps) => {
    debugger;
    const { push } = useHistory()
    const { url } = useRouteMatch()
    if (loading) return <Loader show={true} size="32" />

    if (items?.length === 1)
        return <Redirect to={`/meters/apartments/${items[0].id}`} />

    return styled(styles)(
        items?.map(({ title, id, owner, number, square }: any) => (
            <Apart key={id} onClick={() => push(`${url}/${id}`)}>
                <h4>{title}</h4>
                <ApartOwner>{owner}</ApartOwner>
                <ApartInfo>{number}</ApartInfo>
                <ApartInfo>
                    {square ?? '-'} м<sup>2</sup>
                </ApartInfo>
            </Apart>
        ))
    )
}
// homeownerName,personalAccountNumber,square
