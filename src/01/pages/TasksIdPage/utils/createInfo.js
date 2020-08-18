import { date } from "01/servises/date"

const info = [
  ["Причина задачи", ""],
  ["Номер задачи", "id"],
  ["Дата создания", "creationTime", "fullTime"],
  ["Адресс", "address", "housingStockId"],
  ["Комментарий к квартире", ""],
  ["Теги к квартире", ""],
  ["Собственник 1", ""],
  ["Статус собственника", ""],
  ["Юридическое состояние", ""],
  ["Номер ЛС собственника 1", ""],
  ["Контактный номер телефона", ""],
]

export function createInfo(data) {
  return info
    .map(({ 0: title, 1: value, 2: props }) => {
      switch (props) {
        case "fullTime":
          return [title, date(data[value]).full]
        case "housingStockId":
          return [title, data[value], `/object/${data[props]}`]
        default:
          return [title, data[value]]
      }
    })
    .filter((item) => item[1])
}
