import _ from 'lodash'
import React from 'react'

const Alert = ({ name, errors, touched }) => {
    const touch = _.get(touched, `${name}`)
    const error = _.get(errors, `${name}`)
    if (touch && error) {
        return <div>{error}</div>
    }
    return null
}

export default Alert
