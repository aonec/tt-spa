import React from "react"
import styled from "reshadow/macro"
// eslint-disable-next-line
import { Icon } from "01/components/Icon"
import { page } from "01/r_comp"

import { HeaderBlock } from "01/components/HeaderBlock"
import { useObjects } from "./useObjects"
import { api } from "../api"
import { ObjectItem } from "./ObjectItem"

export const Objects = () => {
  const { objList = [], loading } = useObjects()
  console.log(objList)

  return styled(page)(
    <>
      <HeaderBlock title="Объекты" />
      {loading && <loader as="Icon" icon="replacement" size={32} data-center />}
      {objList.map((item) => (
        <ObjectItem key={item.id} {...item} />
      ))}
    </>
  )
}
