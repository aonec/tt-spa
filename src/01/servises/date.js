export const date = (str) => {
  if (!str) return null
  return {
    full: new Date(str).toLocaleString(),
    short: new Date(str).toLocaleDateString(),
    time: new Date(str).toLocaleTimeString(),
  }
}

export function formatTime(time = null) {
  if (!time) return {}
  let str = ""
  const fail = time < 0
  const days = Math.abs(time) / 1000 / 60 / 60 / 24,
    hours = (days - (days >> 0)) * 24,
    minutes = (hours - (hours >> 0)) * 60
  if (days >> 0) {
    str = `${days >> 0}д ${hours >> 0}ч`
  } else if (hours >> 0) {
    str = `${hours >> 0}ч ${minutes >> 0}м`
  } else {
    str = `${minutes >> 0}м`
  }
  return { str, fail }
}
