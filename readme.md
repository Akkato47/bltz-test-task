## Инструкция по запуску

### Шаг 1

Клонирование репозитория:

```bash
git clone https://github.com/Akkato47/bltz-test-task.git
cd bltz-test-task
```

### Шаг 2

Описание виртуального окружения по шаблоны:
[example.env](./example.env)

### Шаг 3

Запуск приложения в контейнере:

```bash
docker compose up --build
```

---

_Важно_: чтобы приложение могло вносить данные, необходимо:

1. Перейти в настройки доступа Google Таблицы.
2. Добавить сервисный аккаунт с правами редактирования (например: example-service@project-id.iam.gserviceaccount.com).
