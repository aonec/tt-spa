import { LineSegment, VictoryAxisProps } from 'victory'
import React from 'react'

interface TickComponentProps extends VictoryAxisProps {
    y1?: number
}

export const TickComponent = (props: TickComponentProps) => {
    const { y1 } = props
    const y2 = y1 !== 300 ? y1! + 5 : y1 - 5
    return <LineSegment {...props} y2={y2} style={{ stroke: 'var(--frame)' }} />
}
