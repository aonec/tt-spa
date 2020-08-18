export const api = {
  URL: `/tasks/`,
  getState(id) {
    return { url: this.URL + id }
  },
  getUsers() {
    return { url: "ManagingFirmUsers", params: { Permissions: "TasksExecute" } }
  },
  getContractors() {
    return { url: "Contractors" }
  },
  moveStage(id, move, data) {
    return { url: `${this.URL + id}/${move}stage`, method: "post", data }
  },
}
