import React from "react"
import { useSelectFetch } from "01/hooks/useSelectFetch"
import { useUpload } from "01/components/Upload"

export const usePanel = ({ data }, dispatch) => {
  const actions = data?.currentStage?.actions ?? []

  const [nextPerpetratorId, setNextPerpetratorId] = React.useState(null)
  const [contractorsIds, setContractorsIds] = React.useState([])
  const [nextStageId, setNextStageId] = React.useState(null)
  const [documentsIds, setDocumentsIds] = React.useState([])
  const [message, setMessage] = React.useState("")

  // selects
  const perpetrator = useSelectFetch(
    { url: "ManagingFirmUsers", params: { permissions: "TasksExecute" } },
    {
      ...createProps("Исполнитель", "Выберите исполнителя"),
      getSelectData: (id) => setNextPerpetratorId(id[0]),
    }
  )

  const contractors = useSelectFetch(
    { url: "Contractors" },
    { ...createProps("Получатель", "Выберите получателя") }
  )
  //------------

  // upload
  const upload = useUpload((ids) => setDocumentsIds(ids))
  //-----------

  const isType = (type) => actions.some((item) => item.match(type))

  function createPushData() {
    if (isType(/email/gi))
      return { emailNotify: { message, contractorsIds }, nextPerpetratorId }
    if (isType(/document/gi)) return { documentsIds }
  }

  console.log(actions)
  function isDiabedBtn() {
    if (isType(/email/gi)) return !nextPerpetratorId
    if (isType(/document/gi)) return !documentsIds.length
  }

  return {
    showPanel: data?.currentStage,
    wrapper: { email: isType(/email/gi), document: isType(/document/gi) },
    perpetrator,
    contractors,
    upload,
    textarea: {
      value: message,
      onChange: (e) => {
        setMessage(e.target.value)
      },
    },
    pushButton: {
      disabled: isDiabedBtn(),
      onClick: () =>
        dispatch({
          type: "push_stage",
          payload: createPushData(),
        }),
    },
  }
}

function createProps(labelText, placeholder, ...props) {
  return { labelText, placeholder, big: true, ...props }
}

// memo exemple
// const memoNodes = React.useMemo(
//   () => createNodes(data?.currentStage?.actions, nodes),
//   data?.currentStage?.actions ? data.currentStage.action : []
// )
