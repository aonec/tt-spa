function formatTime(time = null) {
  if (!time) return {}
  let timeStr = ""
  const fail = time < 0
  const days = Math.abs(time) / 1000 / 60 / 60 / 24,
    hours = (days - (days >> 0)) * 24,
    minutes = (hours - (hours >> 0)) * 60
  if (days >> 0) {
    timeStr = `${days >> 0}д ${hours >> 0}ч`
  } else if (hours >> 0) {
    timeStr = `${hours >> 0}ч ${minutes >> 0}м`
  } else {
    timeStr = `${minutes >> 0}м`
  }
  return { timeStr, fail }
}

export function createTimeline({
  creationTime = null,
  expectedCompletionTime = null,
  closingTime = null,
} = {}) {
  if (closingTime) return null
  const start = new Date(creationTime),
    deadline = new Date(expectedCompletionTime),
    current = Date.now()

  const percent = Math.abs(((current - start) / (deadline - start)) * 100)
  const color =
    percent < 60
      ? "var(--success)"
      : percent < 90
      ? "var(--warning)"
      : "var(--error)"
  const { timeStr, fail } = formatTime(deadline - current)
  return {
    style: {
      background: color,
      width: percent > 100 ? "100%" : percent + "%",
    },
    before: `(до ${new Date(deadline).toLocaleDateString()})`,
    timeStr: !fail ? timeStr : `-${timeStr}`,
    fail,
  }
}

export function createTimer({
  creationTime = null,
  expectedCompletionTime = null,
  closingTime = null,
  currentStage = null,
}) {
  if (currentStage) {
    const { expectedCompletionTime: ext } = currentStage
    return {
      stage: {
        ...formatTime(new Date(ext) - Date.now()),
        before: `(до ${new Date(ext).toLocaleDateString()})`,
      },
      text: "Время на этап:",
      icon: { icon: "timer", fill: "var(--main-100)" },
    }
  }

  const start = creationTime,
    deadline = expectedCompletionTime,
    finish = closingTime

  const diff = formatTime(new Date(deadline) - new Date(start)),
    final = formatTime(new Date(start) - new Date(finish))

  return {
    diff: { timeStr: !final.fail ? `(${diff.timeStr})` : `(-${diff.timeStr})` },
    final,
    icon: { icon: "ok", fill: "var(--success)" },
    stage: null,
    text: "Выполнено за:",
  }
}

export function createDevice(device) {
  if (!device) return null
  const { resource } = device
  const cold = "var(--cold-water)"
  const hot = "var(--hot-water)"
  const def = "var(--main-100)"
  const elect = "var(--electro)"

  switch (resource) {
    case "ColdWaterSupply":
      return { ...device, icon: "water", fill: cold }
    case "HotWaterSupply":
      return { ...device, icon: "water", fill: hot }
    case "Heat":
      return { ...device, icon: "heat", fill: def }
    case "Electricity":
      return { ...device, icon: "electro", fill: elect }
    default:
      return { ...device, icon: "device", fill: def }
  }
}

export function changeItemStage(item, i, arr, uos) {
  const { status, type, closingTime, perpetrator } = item
  const icon =
    status === "Done"
      ? "ok"
      : type === "Switch"
      ? "choice"
      : type === "Final"
      ? "finish"
      : null
  const canRevert = uos && arr[i + 1]?.status === "InProgress"
  const info = closingTime
    ? {
        name: perpetrator.name,
        time: new Date(closingTime).toLocaleString(),
      }
    : null
  return {
    ...item,
    key: item.id,
    icon,
    canRevert,
    info,
  }
}

export function createPanel(props = null) {
  if (!props) return []
  const { actions = [] } = props
  return actions.reduce((obj, act) => ({ ...obj, [act]: true }), {})
}
