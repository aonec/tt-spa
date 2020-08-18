const url = "tasks"

export const tasks = {
  all: { method: "get", url },
  id: (id) => ({ method: "get", url: `${url}/${id}` }),
  stage: (id, type) => ({method: 'post', url: `${url}/${id}/${type}`}),
  createComment: (tId, cId) => ({method: 'post'})
}
