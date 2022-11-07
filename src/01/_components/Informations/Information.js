import { Loader } from '01/components/Loader';

export const Information = ({ list = [], loading = true, ...props }) => {
  return (
    <information {...props}>
      <h2>Общая информация</h2>
      <Loader show={loading} size="32">
        <info_list>
          {list.map(({ title, value, url }) => (
            <info_item key={title}>
              <span>{title}</span>
              <span>{value}</span>
            </info_item>
          ))}
        </info_list>
      </Loader>
    </information>
  );
};
