## Code requirements

### Наименование веток и коммитов
1. Наименование веток - `R2-1318-add-incpectors-to-object`
2. Наименование коммитов `[R2-1318]: add modal to main page`

### Файловая структура
- my_service
  - my_service.model.ts
  - my_service.relations.ts
  - my_service.types.ts
  - my_service.container.ts
  - index.ts
  - view
    - component_1
      - inner_component_1
      - inner_component_2
      - component_1.tsx
      - component_1.types.ts
      - component_1.styled.ts

### Что такое container
Контейнер связывает локальную модель сервиса с ее view.
Таким образом внутри контейнера может быть использована только локальная модель сервиса.
Если нужны данные с другой модели, то реэкспортим внутри локальной модели.
