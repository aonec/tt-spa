import React, { Memo } from 'react'
import styled, { css } from 'reshadow/macro'
import { Icon } from '01/components/Icon'

export const ObjectItem = Memo(
    ({
        styles,
        city,
        id,
        number,
        numberOfTasks,
        street,
        path = '/object/',
    }) => {
        return styled(styles)(
            <item>
                <link as="Link" to={path + id}>
                    <h4>
                        {street}, {number}
                    </h4>
                    <span>
                        {!!numberOfTasks && (
                            <>
                                <Icon icon="alarm" />
                                Задач: {numberOfTasks}
                            </>
                        )}
                    </span>
                    <span>{city}</span>
                    <span>mnogord</span>
                </link>
            </item>
        )
    }
)
