import * as u from "_utils"

const titles = ["Причина задачи", "Номер задачи", "Дата создания", "Адрес"]

export const useInfoHeader = (values = [], type = "", id = "") =>
  titles.map((title, i) => {
    if (u.check("дата", title)) {
    }
    if (i === 3 && type === "IndividualDeviceCheck") {
    }
    return [title, values[i]]
  })
