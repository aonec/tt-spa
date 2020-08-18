import React from "react"
import styled, { use } from "reshadow/macro"
import { useHistory, useParams } from "react-router-dom"

import { Loader } from "01/components/Loader"
import { information } from "01/r_comp"

export const Changes = ({ list = [], loading = true, ...props }) => {
    const { push } = useHistory()
    console.log(list);

    const params = useParams()
    console.log(params)
    console.log(params[1])

    const test = [
        "Активен",
        "01.09.2017",
        "01.09.2017",
        "01.09.2023",
        "Электричество",
        "Туалет",
        "14",
        "Есть",
        "ИЦ НК",
        "Маяк НК",
    ]
    console.log(test)
    return styled(information)`
    Loader {
      justify-self: center;
    }
  `(
        <information {...props}>
            <h2>Информация</h2>
            {/* <ul>
                <li>
                    16.08.2020 20:48
                </li>
                <li>
                    16.08.2020 20:48
                </li>
            </ul> */}
            
            <info_list>
                {list.map(({ title, value, url }, index) => (
                    <info_item
                        key={title}
                        {...use({ url })}
                        onClick={url ? push(url) : null}
                    >
                        <span>{title}</span>
                        <span>{test[index]}</span>
                    </info_item>
                ))}
            </info_list>
        </information>
    )
}



// export const Changes = ({ list = [], loading = true, ...props }) => {
//     const { push } = useHistory()
//     console.log(list);

//     const params = useParams()
//     console.log(params)
//     console.log(params[1])

//     const test = [
//         "Активен",
//         "01.09.2017",
//         "01.09.2017",
//         "01.09.2023",
//         "Электричество",
//         "Туалет",
//         "14",
//         "Есть",
//         "ИЦ НК",
//         "Маяк НК",
//     ]
//     console.log(test)
//     return styled(information)`
//     Loader {
//       justify-self: center;
//     }
//   `(
//         <information {...props}>
//             <h2>Информация</h2>
//             <info_list>
//                 {list.map(({ title, value, url }, index) => (
//                     <info_item
//                         key={title}
//                         {...use({ url })}
//                         onClick={url ? push(url) : null}
//                     >
//                         <span>{title}</span>
//                         <span>{test[index]}</span>
//                     </info_item>
//                 ))}
//             </info_list>
//         </information>
//     )
// }
