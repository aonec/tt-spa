import { FC } from 'react';
import { Bootstrap } from './Bootstrap';
import { useRoutes as useRouter } from 'react-router-dom';
import { useUnit } from 'effector-react';
import 'dayjs/locale/ru';
import 'css/index.scss';
import 'css/styles.css';
import { useRoutes } from './router/router';
import { currentUserService } from 'services/currentUser/currentUserService';

const { outputs } = currentUserService;

export const App: FC = () => {
  const roles = useUnit(outputs.$currentUserRoles);

  const routes = useRoutes(roles);

  const router = useRouter(routes);

  // hello world

  return <Bootstrap>{router}</Bootstrap>;
};
