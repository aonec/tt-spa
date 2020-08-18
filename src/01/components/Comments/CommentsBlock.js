import React from "react"
import styled from "reshadow/macro"

// import { Icon } from "01/components/Icon"
// import { button } from "01/r_comp"
import styles from "./styles"

export const CommentsBlock = ({ url, comments, hidden, canBeCreate }) => {
  return styled(styles)(
    <comment_block>
      <h2>Комментарии</h2>
    </comment_block>
  )
}

// export const CommentsBlock = ({
//   showBlock = true,
//   title = "Комментарии",
//   ...props
// }) => {
//   if (!showBlock) return null
//   return styled(commentStyle())(
//     <comments_block {...props}>
//       <h2>{title}</h2>
//       <CommentItem />
//       <CommentEditor />
//     </comments_block>
//   )
// }

// const CommentItem = () => {
//   return styled(commentStyle(), button)(
//     <comment_item>
//       <ava>
//         <Icon icon="username2" />
//       </ava>
//       <row>
//         <name>name</name>
//         <time>time</time>
//         <edit as="Icon" icon="edit" />
//         <del as="Icon" icon="del" />
//       </row>
//       <textarea readOnly />
//       <row>
//         <button data-primary>
//           <span>Сохранить</span>
//         </button>
//         <button>
//           <span>Отмена</span>
//         </button>
//       </row>
//     </comment_item>
//   )
// }

// const CommentEditor = () => {
//   return styled(commentStyle(), button)(
//     <comment_editor>
//       <ava>
//         <Icon icon="username2" />
//       </ava>
//       <textarea />
//       <row>
//         <button data-primary>
//           <span>Сохранить</span>
//         </button>
//         <button>
//           <span>Отмена</span>
//         </button>
//       </row>
//     </comment_editor>
//   )
// }

// function commentStyle() {
//   return css`
//     comments_block {
//       display: grid;
//       grid-gap: 16px;
//       padding: 8px;
//     }

//     ava {
//       display: grid;
//       place-content: center;
//       width: 32px;
//       height: 32px;
//       background: var(--frame);
//       border-radius: 50%;
//       grid-row: 1 / span 2;
//     }

//     row {
//       display: flex;
//       grid-column: 2;
//       & > button + button {
//         margin-left: 8px;
//       }
//     }

//     comment_item,
//     comment_editor {
//       display: grid;
//       grid-template-columns: 32px 1fr;
//       grid-auto-rows: minmax(16px, auto);
//       grid-column-gap: 16px;
//       grid-row-gap: 8px;
//       color: var(--main-80);
//     }

//     name,
//     time {
//       margin-right: 16px;
//     }

//     name {
//       color: var(--main-60);
//     }

//     time {
//       color: var(--main-32);
//     }

//     edit,
//     del {
//       cursor: pointer;
//     }

//     edit {
//       margin: 0 8px 0 auto;
//       &:hover {
//         color: var(--primary-100);
//       }
//     }

//     del:hover {
//       color: var(--error);
//     }

//     textarea:read-only {
//       /* border: none; */
//     }
//   `
// }
