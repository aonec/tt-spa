import React from "react"
import styled, { css } from "reshadow/macro"

import { useUpload } from "components"
import { PushButton } from "./PushButton"

export const UploadDocument = ({ styles }) => {
  const { uploadButton, uploadList, filesIds } = useUpload({ big: true })

  return styled(styles)(
    <div>
      {uploadButton}
      {uploadList}
      <PushButton disabled={!filesIds} data={{ documentsIds: filesIds }} />
    </div>
  )
}

UploadDocument.defaultProps = {
  styles: css`
    div {
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-gap: 8px;
      align-items: center;
    }
  `,
}
