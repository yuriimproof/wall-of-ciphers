# Настройка проекта "Стена шифров"

## 1. Установка зависимостей

```bash
npm install
```

## 2. Настройка Supabase

### 2.1. Создание проекта

1. Перейдите на [https://supabase.com](https://supabase.com)
2. Создайте новый проект или используйте существующий
3. Дождитесь завершения создания проекта

### 2.2. Создание базы данных

1. Откройте SQL Editor в вашем проекте Supabase
2. Скопируйте содержимое файла `supabase-schema.sql`
3. Вставьте в SQL Editor и выполните запрос
4. Убедитесь, что таблица `messages` создана успешно

### 2.3. Получение учетных данных

1. Перейдите в Settings → API вашего проекта
2. Найдите следующие значения:
   - **Project URL** (например: `https://xxxxx.supabase.co`)
   - **anon public key** (длинный JWT токен)

## 3. Настройка переменных окружения

1. Скопируйте файл `.env.local.example` в `.env.local`:
```bash
cp .env.local.example .env.local
```

2. Откройте `.env.local` и заполните переменные:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Запуск проекта

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 5. Деплой на Vercel

### 5.1. Подготовка

1. Убедитесь, что проект загружен в GitHub
2. Перейдите на [vercel.com](https://vercel.com)
3. Нажмите "New Project"

### 5.2. Импорт проекта

1. Выберите ваш GitHub репозиторий
2. Настройте Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 5.3. Деплой

1. Нажмите "Deploy"
2. Дождитесь завершения сборки
3. Ваш проект будет доступен по адресу `https://your-project.vercel.app`

## 6. Тестирование

После запуска проверьте:

- ✅ Главная страница загружается
- ✅ Можно создать зашифрованное послание
- ✅ Можно расшифровать случайное послание
- ✅ Стена шифров отображает все сообщения
- ✅ Можно открыть конкретное сообщение по ссылке

## Troubleshooting

### Ошибка подключения к Supabase

Проверьте:
- Правильность URL и ключа в `.env.local`
- Что таблица `messages` существует
- Что RLS политики настроены корректно

### Не работает расшифровка

Проверьте:
- Что в базе есть сообщения
- Консоль браузера на наличие ошибок
- Что Server Actions выполняются успешно

## Дополнительные ресурсы

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
