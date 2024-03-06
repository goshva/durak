Инструкция для разработки в Windows с WSL.

Для установки WSL прочтите.

https://learn.microsoft.com/ru-ru/windows/wsl/install

Если не установлен Python установить.

https://www.python.org/downloads/

 Активировать venv например  python -m venv <directory>.
в VS Code все устанавливаеться с соответствующими подсказками.

Зайти в папку проекта в cmd или power shell.

Установить пакеты.

pip install asyncio

pip install websockets

python -m pip install motor

pip install beanie


Установить бесплатный Mongo Compas на комп.по инструкциям в ссылке.
https://www.mongodb.com/docs/compass/master/install
Будет установлена б.д с графическим интерфейсом на 500 мб
(mongodb://localhost:27017)

Далее в командной строке своего проекта запускаете:

python ws.py

Далее откройте еще один терминал и в командной строке своего проекта запускаете:

python -m http.server 

Это запустит локальный сервер работает на порту: localhost:8000 
Откройте в браузере одну или несколько вкладок.

 localhost:8000/index.html
 
 нажать на кнопку Play2 или Play3 или Play4  на другой вкладке тоже Play2 (3,4)
запуститься игра.
Одновременно можно запустить несколько игр. 
 
Разработка фронтенд.
frontend
Установить Node.js

https://nodejs.org/en/download/


Установить Lit

https://lit.dev/learn/#filter=tutorial

Скачать стартовый проект :
https://github.com/lit/lit-element-starter-js/archive/main.zip

Распоковать и положить в папку нашего проекта
У меня выглядит вот так:

C:\Users\User\nginx-1.23.3\durack\durak\lit-element-starter-js-main\lit-element-starter-js-main

Установить зависимости в cmd:

C:\Users\User\nginx-1.23.3\durack\durak\lit-element-starter-js-main\lit-element-starter-js-main

npm install

или npm i
   
  запустить девсервер:
  
   npm run serve
 Доступен по адресу:  
   
    Local:    http://localhost:8000/
    
  Network:  http://172.20.144.1:8000/
  
  Далее создать папку под названием frontend в
  
  lit-element-starter-js-main\lit-element-starter-js-main
  
  и перенести все фронтенд файлы туда .
