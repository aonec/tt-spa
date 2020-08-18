import React from 'react'
import styled from 'reshadow/macro'
import { useParams } from 'react-router-dom'
import { Tabs } from './components/Tabs'

export const DeviceProfile = () => {
  const params = useParams()
  return styled()(
    <div>
      <h1>Информация о ОДПУ</h1>
      <h2>id прибора: {params[1]}</h2>
      <p>Компонент обновляется</p>
      <Tabs />
    </div>
  )
}

// import React from 'react'
// import styled from 'reshadow/macro'
// import { useParams } from 'react-router-dom'
// import { Tabs } from './components/Tabs'

// export const DeviceProfile = () => {
//   const params = useParams()
//   console.log(params[1])
//   return styled()(
//     <div>
//       Профиль прибора ОДПУ
//       {/* <Tabs /> */}
//       <h2>id прибора: {params[1]}</h2>
//       <p>Компонент обновляется</p>
//     </div>
//   )
// }