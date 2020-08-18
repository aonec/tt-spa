export function createHeader({
  currentStage = null,
  name = null,
  closingTime = null,
  creationTime = null,
  expectedCompletionTime = null,
}) {
  return {
    title: currentStage?.name ?? name,
    name: !currentStage && name,
    timeline: { closingTime, creationTime, expectedCompletionTime },
    timer: {
      closingTime,
      creationTime,
      expectedCompletionTime,
      currentStage,
    },
  }
}
