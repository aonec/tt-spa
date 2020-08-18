export const useTransformTime = (date, closingTime) => {
  if (!date) return {}
  const time = closingTime
    ? new Date(date) - new Date(closingTime)
    : new Date(date) - Date.now()
  const days = Math.abs(time) / 1000 / 60 / 60 / 24
  const hours = (days - (days >> 0)) * 24
  const minutes = (hours - (hours >> 0)) * 60

  const expired = time < 0
  let timeString = ""

  if (days >> 0) {
    timeString = `${days >> 0}д ${hours >> 0}ч`
  } else if (hours >> 0) {
    timeString = `${hours >> 0}ч ${minutes >> 0}м`
  } else {
    timeString = `${minutes >> 0}м`
  }
  return { timeString, expired }
}
