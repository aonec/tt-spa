import React, { useContext } from 'react'
import { Loader, Icon } from '01/components'
import { convertDate } from '01/_api/utils/convertDate'
import { Button } from '01/_components/Button'
import { NodeContext } from '../index'
import {
    Task,
    StageName,
    TaskName,
    TaskRow,
    TasksWrap,
    TasksTitle,
} from '../../../tt-components/Events'

const buttonHandler = () => {
    console.log('buttonHandler')
}

export const Events = ({ title = '' }) => {
    const { tasks, loading = false } = useContext(NodeContext)

    const Tasks = (tasks || []).map((task, index) => {
        const { currentStage, perpetrator, id } = task
        return (
            <Task key={id} href={`/tasks/${id}`}>
                <StageName>{currentStage.name}</StageName>
                <TaskName>{`Причина: ${task.name}`}</TaskName>
                <TaskRow>
                    <Icon icon="timer" style={{ marginRight: '8px' }} />
                    {`${convertDate(currentStage.startingTime)} - ${convertDate(
                        currentStage.expectedCompletionTime
                    )}`}
                </TaskRow>
                <TaskRow>
                    <Icon icon="username2" style={{ marginRight: '8px' }} />
                    {perpetrator.name}
                </TaskRow>
            </Task>
        )
    })
    if (Tasks.length > 0) {
        return (
            <TasksWrap>
                <Loader show={loading} size="32">
                    <TasksTitle>{title}</TasksTitle>
                    {Tasks}
                    <Button onClick={buttonHandler}>
                        Все задачи с объектом
                    </Button>
                </Loader>
            </TasksWrap>
        )
    }

    return (
        <TasksWrap>
            <Loader show={loading} size="32">
                <TasksTitle>{title}</TasksTitle>
                <Task>
                    <StageName>Нет задач </StageName>
                    <TaskName>задачи Узла завершены</TaskName>
                    {/* <TaskRow>
            <Icon icon="username2" style={{ marginRight: '8px' }} />
            Можете просмотреть все задачи
          </TaskRow> */}
                </Task>
            </Loader>
        </TasksWrap>
    )
}

export default Events
