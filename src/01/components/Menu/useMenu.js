export function useMenu() {
  const user = JSON.parse(localStorage.getItem("user")) ?? {}
  const roles = JSON.parse(localStorage.getItem("roles")) ?? []
  const { managementFirm = {}, id = "" } = user
  return [
    {
      name: user.email,
      company: managementFirm.name,
      to: "/user/" + id,
      icon: "username2",
      perm: ["all"],
    },
    { name: "Выход из системы", to: "/login/", perm: ["all"] },
    { name: "Задачи", to: "/tasks/", icon: "task", perm: ["all"] },
    { name: "Объекты", to: "/objects/", icon: "object", perm: ["all"] },
    {
      name: "Собственники",
      to: "/owners/",
      icon: "key",
      // perm: ["ManagingFirmAdministrator", "ManagingFirmOperator"],
      perm: [],
    },
    {
      name: "Настройки",
      to: "/settings/",
      icon: "setting",
      perm: [],
      // perm: ["ManagingFirmAdministrator"],
    },
    {
      name: "Ввод показаний ",
      to: "/meters/",
      icon: "doc",
      perm: ["ManagingFirmOperator"],
    },
    { name: "Диагностика", to: "/monitoring/", icon: "monitoring", perm: [] },
    { name: "Лог действий", to: "/log/", icon: "log", perm: [] },
  ].reduce((menu, { perm, ...item }) => {
    if (perm.includes("all")) menu.push(item)
    if (roles.some((role) => perm.includes(role))) menu.push(item)
    return menu
  }, [])
}
