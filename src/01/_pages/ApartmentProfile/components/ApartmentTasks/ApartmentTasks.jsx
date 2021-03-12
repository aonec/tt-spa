import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '01/components/Icon'
import { Button } from '../Button'
import { convertDate } from '../../../../_api/utils/convertDate'

export const ApartmentTasks = styled.div`
    padding: 0 16px;
    display: flex;
    flex-direction: column;
`

export const ApartmentTasksTitle = styled.h2`
    padding-bottom: 24px;
    margin: 0;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
`
export const ApartmentTask = styled.a`
    padding: 0;
    padding-top: 32px;
    margin: 0;
    &:first-of-type {
        padding: 0;
    }
`
export const ApartmentTaskTitle = styled.h3`
    font-size: 14px;
    line-height: 16px;
`

const ApartmentTaskState = styled.div`
    padding: 0;
    padding-top: 8px;
    margin: 0;
    display: flex;
    font-size: 12px;
    line-height: 16px;
    color: ${(props) => props.color};
`

export const ApartmentTaskDate = styled.p`
    padding: 0;
    padding-top: 8px;
    margin: 0;
    display: flex;
    font-size: 12px;
    line-height: 16px;
    color: rgba(39, 47, 90, 0.6);
`

export const Tasks = (props) => {
    const tasksArr = Object.values(props.tasksList)

    const buttonHandler = () => {}
    // const TasksList = tasksArr.map((value, index) => {
    // const TasksList = tasksArr.filter((item, index) => [0, 4, 8].includes(index)).map((task, ind) => {
    const TasksList = tasksArr.map((task, ind) => {
        const {
            id,
            creationTime,
            closingTime,
            expectedCompletionTime,
            name,
            currentStage,
        } = task
        const begin = convertDate(creationTime)
        const end = convertDate(closingTime || expectedCompletionTime)

        let status
        let icon
        let color

        if (currentStage.status === 'InProgress') {
            status = 'В работе'
            icon = 'replacement'
            color = '#E2B104'
        } else {
            status = 'Выполнено'
            icon = 'ok'
            color = '#17b45a'
        }

        const taskHandler = () => {
            console.log('taskHandler')
        }

        return (
            <Link to={`/Tasks/${id}`}>
                <ApartmentTask key={ind} onClick={taskHandler}>
                    <ApartmentTaskTitle>{name}</ApartmentTaskTitle>
                    <ApartmentTaskState color={color}>
                        <Icon icon={icon} />
                        {status}
                    </ApartmentTaskState>
                    <ApartmentTaskDate>
                        <Icon icon="calendar" />
                        {`${begin} - ${end}`}
                    </ApartmentTaskDate>
                </ApartmentTask>
            </Link>
        )
    })

    return (
        <ApartmentTasks>
            <ApartmentTasksTitle>Задачи с объектом</ApartmentTasksTitle>
            {TasksList}
            <Button onClick={buttonHandler}>Все задачи с объектом</Button>
        </ApartmentTasks>
    )
}
