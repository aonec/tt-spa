import React from "react"

import styled, { use } from "reshadow/macro"

import { input } from "01/r_comp"

export const Filter = ({ inputs = [] }) => {
  return styled()`
    filter {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns:
        minmax(200px, 1fr)
        minmax(200px, 1fr)
        minmax(100px, 0.5fr)
        minmax(100px, 0.5fr);
      grid-gap: 16px;
    }
  `(<filter as="div">{inputs.map((input) => input)}</filter>)
}

// const fields = [
//   { placeholder: "Введите город", name: "City" },
//   { placeholder: "Введите назавние улицы", name: "Street" },
//   { placeholder: "Дом", name: "HousingStockNumber" },
//   { placeholder: "Кв.", name: "ApartmentNumber" },
// ]

// const initialState = {
//   City: { value: "Нижнекамск" },
//   Street: { value: "" },
//   HousingStockNumber: { value: "" },
//   ApartmentNumber: { value: "" },
// }

// export const Filter = ({ getParams = () => {} }) => {
//   const [params, setParams] = React.useState(initialState)

//   const handleChange = (e) => {
//     const value = e.target.value
//     const name = e.target.name
//     setParams({ ...params, [name]: { value, valid: !!value, invalid: !value } })
//   }
//   const resetValid = () => {
//     const resetObj = Object.entries(params).reduce(
//       (res, { 0: name, 1: p }) => ({ ...res, [name]: { value: p.value } }),
//       {}
//     )
//     setParams(resetObj)
//   }
//   React.useEffect(() => {
//     const timer = setTimeout(() => {
//       if (
//         Object.values(params)
//           .filter((i, idx) => idx !== 3)
//           .every((i) => i.value)
//       ) {
//         const currentParams = Object.entries(params).reduce(
//           (params, { 0: name, 1: { value } }) => ({
//             ...params,
//             [name]: value,
//           }),
//           {}
//         )

//         getParams(currentParams)
//         resetValid()
//       }
//     }, 300)
//     return () => clearTimeout(timer)
//     // eslint-disable-next-line
//   }, [
//     params.ApartmentNumber.value,
//     params.HousingStockNumber.value,
//     params.Street.value,
//     params.City.value,
//   ])

//   return styled(input)`
//     filter {
//       grid-column: 1 /-1;
//       display: grid;
//       grid-template-columns:
//         minmax(200px, 1fr)
//         minmax(200px, 1fr)
//         minmax(100px, 0.5fr)
//         minmax(100px, 0.5fr);
//       grid-gap: 16px;
//     }
//   `(
//     <filter as="div">
//       {fields.map((inp, i) => (
//         <input_frame
//           key={i}
//           {...use({
//             valid: i !== 3 ? params[inp.name].valid : null,
//             invalid: i !== 3 ? params[inp.name].invalid : null,
//           })}
//         >
//           <input
//             {...inp}
//             value={params[inp.name].value}
//             onChange={handleChange}
//           />
//         </input_frame>
//       ))}
//     </filter>
//   )
// }

// function getParams(obj) {
//   let res = {}
//   for (let key in obj) {
//     res = { ...res, key: key.value }
//   }
//   return res
// }
