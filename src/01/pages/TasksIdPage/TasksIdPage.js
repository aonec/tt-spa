import React from "react"
import styled, { use } from "reshadow/macro"

import { Icon } from "01/components/Icon"
import { Timeline } from "01/components/Timeline"
import { page, button } from "01/r_comp"
import { useTasksId } from "./useTasksId"
import { Timer } from "01/components/Timer"
import { Select } from "01/components/Select"
import { Upload } from "01/components/Upload"
import { CommentsBlock } from "01/components/Comments"
import { InfoItem } from "01/components/items"
import { LinkWrap } from "01/components/LinkWrap"

const Perpetrator = (props) => (
  <Select
    big
    labelText="Исполнитель"
    placeholder="Выберите исполнителя"
    {...props}
  />
)
const Contractor = (props) => (
  <Select
    big
    labelText="Получатель"
    placeholder="Выберите получателя письма"
    {...props}
  />
)

const TemplButton = (props) =>
  styled(button)(
    <button data-big {...props}>
      <span>Выбрать шаболон</span>
    </button>
  )

const PushButton = (props) =>
  styled(button)(
    <button data-big data-primary {...props}>
      <span>Завершить этап</span>
    </button>
  )

export const TasksIdPage = React.memo(() => {
  const {
    header = null,
    panel = null,
    selectProps = {},
    pushProps = {},
    uploadProps = {},
    info = [],
    deviceInfo = null,
  } = useTasksId()
  return styled(page, button)`
    info {
      grid-column: 1;
    }

    info + info > h2 {
      display: inline-flex;
      align-items: center;

      & Icon {
        margin-right: 8px;
      }

      & span {
        padding-left: 4px;
        color: var(--main-60);
      }
    }
  `(
    <>
      <header_block>
        {!header ? (
          <loader as="Icon" icon="replacement" data-center size={32} />
        ) : (
          <>
            <h1>{header.title}</h1>
            {header.name && <name>{header.name}</name>}
            <Timeline {...header.timeline} />
            <Timer {...header.timer} />
          </>
        )}
      </header_block>
      {panel && (
        <panel_block {...use({ ...panel })}>
          {panel.perpetrator && <Perpetrator {...selectProps.perpetrator} />}
          {panel.contractor && <Contractor {...selectProps.contractors} />}
          {panel.email && <textarea />}
          {panel.email && <TemplButton />}
          {panel.document && <Upload {...uploadProps} />}
          <PushButton {...pushProps} />
        </panel_block>
      )}
      {/* <CommentsBlock /> */}
      <info>
        <h2>Подробная информация</h2>
        {info.map(({ 0: title, 1: text, 2: url }) => (
          <InfoItem key={title} {...{ title, text, url }} />
        ))}
      </info>
      {deviceInfo && (
        <info>
          <h2>
            <LinkWrap to="/">
              <Icon {...deviceInfo.icon} />
              {deviceInfo.title.model}
              <span>({deviceInfo.title.number})</span>
            </LinkWrap>
          </h2>
          {deviceInfo.list.map(({ 0: title, 1: text }) => (
            <InfoItem key={title} {...{ title, text }} />
          ))}
        </info>
      )}
    </>
  )
})
