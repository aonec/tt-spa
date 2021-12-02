export function useMenu() {
  const user = JSON.parse(localStorage.getItem('user')) ?? {};
  const roles = JSON.parse(localStorage.getItem('roles')) ?? [];
  const { managementFirm = {}, id = '' } = user;
  return [
    {
      name: user.email,
      company: managementFirm.name,
      to: `/user/${id}`,
      icon: 'username2',
      perm: ['all'],
    },
    {
      name: 'Статистика',
      to: '/statistics/',
      icon: 'statistics',
      perm: ['all'],
      hidden: ['ManagingFirmOperator'],
    },
    {
      name: 'Журнал актов',
      to: '/actsJournal/',
      icon: 'act',
      perm: ['ManagingFirmOperator'],
    },
    {
      name: 'Задачи',
      to: '/tasks/',
      icon: 'task',
      perm: ['all'],
      hidden: ['ManagingFirmOperator'],
    },
    {
      name: 'Объекты',
      to: '/objects/',
      icon: 'object',
      perm: ['all'],
    },
    {
      name: 'Приборы',
      to: '/devices/',
      icon: 'devices',
      perm: ['all'],
      hidden: ['ManagingFirmOperator'],
    },
    {
      name: 'Профиль компании',
      to: '/settings/',
      icon: 'company',
      perm: ['ManagingFirmAdministrator'],
    },
    {
      name: 'Собственники',
      to: '/owners/',
      icon: 'key',
      perm: [],
    },
    {
      name: 'Ввод показаний',
      to: '/meters/',
      icon: 'doc',
      perm: ['ManagingFirmOperator'],
    },
    {
      name: 'Лог действий',
      to: '/log/',
      icon: 'log',
      perm: [],
    },
  ]
    .reduce((menu, { perm, ...item }) => {
      if (perm.includes('all')) menu.push(item);
      if (roles.some((role) => perm.includes(role))) menu.push(item);
      return menu;
    }, [])
    .filter((menuItem) =>
      menuItem.hidden ? !menuItem.hidden.some((e) => roles.includes(e)) : true
    );
}
