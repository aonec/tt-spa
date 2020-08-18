import React from "react"
import styled, { css } from "reshadow/macro"

import { Icon } from "components"

export const Empty = ({ styles, text, ...props }) => {
  return styled(styles)(
    <div {...props}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="16" fill="#F3F5F6" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.8201 8.32609C15.2294 7.83374 15.7033 7.3916 16.2334 7.01418C16.7494 6.64686 16.4749 6.01504 15.9464 6.00007C14.9996 5.97325 14.0329 6.08159 13.0711 6.33932C7.7364 7.76874 4.57057 13.2521 5.99999 18.5868C7.42941 23.9214 12.9128 27.0873 18.2474 25.6578C18.3658 25.6261 18.4832 25.5924 18.5994 25.5567C20.1592 25.0779 21.5237 24.2469 22.6263 23.1746C22.7565 23.048 22.883 22.9181 23.0058 22.7849L23.0152 22.7747C23.5995 22.1392 24.0983 21.4316 24.5001 20.6719C24.7473 20.2046 24.4447 19.6027 23.7593 19.9221C23.3682 20.1043 22.9559 20.2551 22.5248 20.3706C18.5238 21.4427 14.4112 19.0683 13.3392 15.0673C12.7848 12.9985 13.152 10.8998 14.189 9.20712C14.3741 8.9049 14.5807 8.61562 14.8071 8.34175L14.8201 8.32609ZM22.0133 21.5057C21.9864 21.5103 21.9596 21.5147 21.9328 21.5191C21.8465 21.5331 21.7603 21.5457 21.6741 21.5569C21.5937 21.5674 21.5134 21.5768 21.4331 21.5849L21.3831 21.5898C17.3261 21.978 13.4632 19.3938 12.3732 15.3261C12.3026 15.0626 12.2452 14.7986 12.2006 14.5349C11.8186 12.2782 12.3731 10.0421 13.6105 8.26535C13.6502 8.20843 13.6905 8.15199 13.7316 8.09602C13.8293 7.96273 13.931 7.83219 14.0364 7.70461C14.4247 7.235 14.3323 7.06159 13.5007 7.26168C13.4469 7.27463 13.39 7.28914 13.3299 7.30524C13.3055 7.31177 13.2812 7.31838 13.257 7.32509C13.1719 7.34864 13.0875 7.37334 13.0036 7.39916C8.40056 8.81732 5.70886 13.6365 6.96592 18.3279C8.25239 23.1291 13.1874 25.9784 17.9886 24.6919C18.2079 24.6332 18.423 24.5668 18.6339 24.4932C19.8607 24.0651 20.9429 23.3918 21.8395 22.5438C21.8654 22.5192 21.8912 22.4946 21.9168 22.4697C21.9927 22.3962 22.0672 22.3214 22.1404 22.2454C22.1843 22.1997 22.2277 22.1536 22.2707 22.1071C22.4697 21.8911 22.4455 21.4314 22.0133 21.5057ZM22.9037 11.343C22.931 11.2457 23.069 11.2457 23.0963 11.343L23.6424 13.2884C23.6518 13.322 23.6781 13.3482 23.7117 13.3576L25.6571 13.9038C25.7543 13.9311 25.7543 14.069 25.6571 14.0963L23.7117 14.6425C23.6781 14.6519 23.6518 14.6782 23.6424 14.7117L23.0963 16.6571C23.069 16.7544 22.931 16.7544 22.9037 16.6571L22.3576 14.7117C22.3481 14.6782 22.3219 14.6519 22.2883 14.6425L20.3429 14.0963C20.2456 14.069 20.2456 13.9311 20.3429 13.9038L22.2883 13.3576C22.3219 13.3482 22.3481 13.322 22.3576 13.2884L22.9037 11.343ZM17.9037 9.34301C17.931 9.24572 18.069 9.24572 18.0963 9.34301L18.4232 10.5076C18.4326 10.5412 18.4589 10.5674 18.4925 10.5768L19.6571 10.9038C19.7543 10.9311 19.7543 11.069 19.6571 11.0963L18.4925 11.4233C18.4589 11.4327 18.4326 11.459 18.4232 11.4925L18.0963 12.6571C18.069 12.7544 17.931 12.7544 17.9037 12.6571L17.5768 11.4925C17.5673 11.459 17.5411 11.4327 17.5075 11.4233L16.3429 11.0963C16.2456 11.069 16.2456 10.9311 16.3429 10.9038L17.5075 10.5768C17.5411 10.5674 17.5673 10.5412 17.5768 10.5076L17.9037 9.34301Z"
          fill="#272F5A"
          fillOpacity="0.6"
        />
      </svg>
      <span>{text}</span>
    </div>
  )
}

Empty.defaultProps = {
  styles: css`
    div {
      display: flex;
      align-items: center;
    }
    span {
      margin-left: 1em;
    }
  `,
}
