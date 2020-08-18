import React from "react"
import styled, { css } from "reshadow/macro"
import { Loader, Icon } from "01/components"

const styles = css`
  upload {
    border: 1px solid var(--frame);
    border-radius: 4px;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 16px;
    place-self: start;
    align-items: center;
    padding: 16px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    &:hover {
      color: var(--primary-100);
      border-color: inherit;
    }
  }
`

export const UploadButton = ({
  loading = false,
  text = "Загрузить",
  onChange,
  ...props
}) => {
  return styled(styles)(
    <upload as="label" {...props}>
      {text}
      <Loader show={loading}>
        <Icon icon="upload" />
      </Loader>
      <input type="file" onChange={onChange} disabled={loading} />
    </upload>
  )
}

// export const Upload = ({ styles, ...props }) => {
//   const {
//     name = null,
//     loading = false,
//     onChange = () => {},
//     onDelete = () => {},
//     files = [],
//   } = useUpload()
//   return styled(styles)(
//     <upload_block {...props}>
//       <label>
//         <span>Загрузить файл</span>
//         <Loader show={loading}>
//           <Icon icon="upload" />
//         </Loader>
//         <input type="file" onChange={onChange} disabled={loading} />
//       </label>
//       <ul>
//         {files.map(({ name, id, url, deleted, ...p }) => {
//           console.log(p)
//           return (
//             <file as="li" key={id}>
//               <a
//                 href={!deleted ? url : null}
//                 target="_blank"
//                 rel="noreferrer noopener"
//               >
//                 {name}
//               </a>
//               {deleted ? (
//                 <Loader show={true} />
//               ) : (
//                 <del as="Icon" icon="del" onClick={() => onDelete(id)} />
//               )}
//             </file>
//           )
//         })}
//         <file as="li">{name}</file>
//       </ul>
//     </upload_block>
//   )
// }

// Upload.defaultProps = {
//   styles: css`
//     upload_block {
//       --h: var(--h-big);
//       --active: var(--primary-100);
//       display: grid;
//       grid-gap: 16px;
//       grid-template-columns: auto 1fr;
//       align-items: center;
//       font-size: 14px;
//     }

//     span {
//       margin-right: 8px;
//     }

//     label {
//       font-weight: 600;
//       height: var(--h);
//       border: 1px solid var(--frame);
//       border-radius: 4px;
//       display: inline-flex;
//       align-items: center;
//       padding: 8px 16px;
//       cursor: pointer;
//       &:hover {
//         color: var(--active);
//         border-color: initial;
//       }
//     }

//     input {
//       outline: none;
//       opacity: 0;
//       pointer-events: none;
//       user-select: none;
//       width: 0;
//       height: 0;
//       position: absolute;
//     }

//     ul,
//     file {
//       display: grid;
//       grid-auto-flow: column;
//       align-items: center;
//       justify-content: start;
//       color: var(--main-80);
//     }
//     ul {
//       grid-gap: 16px;
//     }

//     file {
//       grid-gap: 8px;
//     }

//     del {
//       &:hover {
//         color: var(--error);
//       }
//       cursor: pointer;
//     }

//     a:hover {
//       color: var(--active);
//     }
//   `,
// }
