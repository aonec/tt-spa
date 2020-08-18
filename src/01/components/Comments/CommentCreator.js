import React from "react"
import styled from "reshadow/macro"
import { Icon } from "01/components/Icon"

export const CommentCreator = () => {
  return styled()(
    <comment_creator>
      <ava>
        <Icon icon="username2" />
      </ava>
      <textarea />
      <row>
        <button data-primary>
          <span>Сохранить</span>
        </button>
        <button>
          <span>Отмена</span>
        </button>
      </row>
    </comment_creator>
  )
}
