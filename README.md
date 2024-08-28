# test-ea-mediacube

## Тех. задание
Серверная часть сделана с помощью Firebase.
Хостинг проекта: https://test-ea-mediacube.web.app/

По заданию сделано все, кроме темной темы, но на нее по таймингу уже нет времени(.
Сделать ее несложно, я бы задал цвета css-переменными, и по кнопке переключал бы ее в body-классе.
Возможно ещё сохранял бы выбранный цвет в локалсторадже.

В идеале добавить бы авторизацию, это тоже можно сделать через firebase, я это делал в своем пет-проекте, но пока что на проде у меня старая версия (там много чего доделывать).

Также нетрудно было бы прикрутить typesctipt, но опять же время.

Из библиотек можно было еще добавить https://www.npmjs.com/package/scroll-lock, тогда при добавлении задач, он не будет "смещать" их из-за появившегося скроллбара, а оставит такой же ширины.

Потрачено было около 15-17 часов. Много времени ушло на новую библиотеку draggable, которой раньше не пользовался.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
