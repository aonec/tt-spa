export function createPanel({ currentStage = null }) {
  if (!currentStage) return null
  const { actions = [] } = currentStage
  return actions.reduce(
    (types, item) => {
      if (item.match(/email/gi))
        return { ...types, email: true, perpetrator: true, contractor: true }
      if (item.match(/document/gi)) return { ...types, document: true }
      return types
    },
    {
      email: false,
      perpetrator: false,
      contractor: false,
      document: false,
    }
  )
}
