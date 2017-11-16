### Progress Circle Bar
Getting started
Для создание прогресс бара достаточно создать блочный элемент с классом progress-bar
```html
<div class="progress-bar"></div>
```
Для установки параметров по умолчанию нужно указать data - поля
```html
<div class="progress-bar" data-value="100" data-hidden="true"></div>
```
Для ручной установки:
```js
// Либо id элемента
var a = new ProgressCircleBar('#circle',options);
// Либо сам элемент
var el = document.getElementById('#circle');
var a = new ProgressCircleBar(el,options);
```
где options необязательный параметр.
### Структура
Для вызова используются методы
```js
var a = new ProgressCircleBar('#circle');

a.setValue(10) //установили значение на 10
a.setAnimate(true) //установили флаг анимирования
a.setHidden(true) //спрятали элемент
```
Так же можно указать настройки на пряму, сами options в себя включают
```js
  options = {
    width: Number(options.width) || 160, //Ширина блока
    height: Number(options.height) || 160, //Высота блока
    animate: !!options.animate || false, //Флаг анимации
    hidden: !!options.hidden || false, //Флаг видимости
    lineWidth: options.lineWidth || '10', //Ширина линии круга
    backgroundColor: options.backgroundColor || "#ddd", //Задний цвет круга
    frontColor: options.frontColor || "#ffcc00", // Передний цвет круга
    radius: Number(options.radius) || 70, //Радиус круга
    fpsAnimation: Number(options.fpsAnimation) || 25, // FPS анимации
    value: Number(options.value) || 0.0 // процент прогресса
  }
```
