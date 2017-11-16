(function(f) {
  if(typeof exports==="object"&&typeof module!=="undefined") {
    module.exports=f()
  }
  var g;
  if (typeof window !== "undefined") {
      g = window;
  } else if (typeof global !== "undefined") {
      g = global;
  } else if (typeof self !== "undefined") {
      g = self;
  } else {
      g = this;
  }

  g.ProgressCircleBar = f();
})(function() {
  var elements,
      //Константы
      DEGREE_TO_PERCENT = 360/100,
      MAX_PERCENT = 100,
      FOURTH_PERCENT = 90,
      HALF_CIRCLE = 180,
      FULL_CIRCLE = 360,
      HALF_RADIAN = Math.PI/HALF_CIRCLE,
      THREE_QUARTES_CIRCLE = 270,
      STARTING_ANGLE = Math.PI/HALF_CIRCLE * THREE_QUARTES_CIRCLE;
      //Конструктор прогресс-бара
  function ProgressCircleBar(el, options) {
      var canvas =  this.getCanvas(),
          context = canvas.getContext('2d'),
          el = this.convertor(el);

      el.appendChild(canvas);

      this.options = options = this.setOptions(options || {});

      canvas.width = options.width;
      canvas.height = options.height;
      this.element = el;
      this.canvas = canvas;
      this.context = context;
  }

  ProgressCircleBar.prototype = {

    // Настройки прогресс-бара
    options: {},
    // Элемент, в который входит прогресс-бар
    element: {},
    // canvas для анимации прогресс-бара
    canvas: {},
    // canvas.getContext('2d') -> взятие 2d представление canvas'а
    context: {},
    //Установка текущего значения прогресс бара.
    setValue: function(val) {
      var results,
          context = this.context,
          options = this.options,
          value = Number(val) || 0,
          canvas = this.canvas,
          posX = canvas.width / 2,
          posY = canvas.height / 2,
          procent = DEGREE_TO_PERCENT * value;

      context.clearRect( 0, 0, canvas.width, canvas.height );

      context.beginPath();
      context.arc(posX, posY, options.radius, STARTING_ANGLE, HALF_RADIAN * (THREE_QUARTES_CIRCLE + FULL_CIRCLE));
      context.strokeStyle = options.backgroundColor;
      context.lineWidth = options.lineWidth;
      context.stroke();

      context.beginPath();
      context.strokeStyle = options.frontColor;
      context.lineWidth = options.lineWidth;
      context.arc(posX, posY, options.radius, STARTING_ANGLE, HALF_RADIAN * (THREE_QUARTES_CIRCLE + procent));
      context.stroke();

      if (value > MAX_PERCENT) value = MAX_PERCENT;
      options.value = value;
    },
    //Метод для сокрытия прогресс бара
    hide: function(status) {
      var el = this.element;

      el.style.display = "none";
    },
    //Метод для отображения прогресс бара
    show: function(status) {
      var el = this.element;

      el.style.display = "block";
    },
    //Анимации прогресс бара. Крутится по часовой.
    animation: function() {
      var me = this,
          options = me.options,
          value = options.value,
          fps = this.options.fpsAnimation;
      interval = setInterval(function() {
         value = options.value + 1;

         if (value > MAX_PERCENT) {
           me.setValue(0);
         } else {
           me.setValue(value);
         }

         !options.animate && clearInterval(interval);
       }, fps);
    },
    // Метод проверки пришедшего элемента. Если приходит строка, пытаемся найти в DOM этот элемент.
    convertor: function(el) {
      if (!el) {
        throw('Element expected');
      } else {
         if (typeof el === "string" && document) {
            el = this.getDOMObject(el);
         } else if (typeof el !== "object") {
            throw('Wrong format of element. Object or string required')
         }
      }

      return el;
    },
    //Попытка получить из DOM элемент
    getDOMObject: function(el) {
      el = (document.querySelector && document.querySelector(el)) || document.getElementById(el) || document.getElementsByClassName(el);
      if (!el) {
        throw('No elements found. Single results expected');
      } else if (el.length > 1) {
        throw('Multiply results found. Single results expected');
      }

      return el;
    },
    //Проверка на canvas
    getCanvas: function() {
      var canvas = document.createElement('canvas');
      if (!canvas.getContext) {
          throw('No canvas support found.');
      } else {
        return canvas;
      }
    },
    //Установка настроек прогресс бара
    setOptions: function(options) {
      return {
        width: options.width || 160,
        height: options.height || 160,
        animate: options.animate || false,
        hidden: options.hidden || false,
        lineWidth: options.lineWidth || '10',
        backgroundColor: options.backgroundColor || "#ddd",
        frontColor: options.frontColor || "#ffcc00",
        radius: options.radius || 70,
        fpsAnimation: options.fpsAnimation || 25,
        value: 0.0
      }
    },
    //Включение анимации
    setAnimate: function(status) {
      status && this.animation();
      this.options.animate = status;
    },
    //Спрятать элемент
    setHidden: function(status) {
      status ? this.hide() : this.show();
      this.options.hidden = status;

    }
  }

  //Автоматическая инициализация уже созданных в DOM прогресс-баров
  if (typeof document !== "undefined") {

    elements = document.querySelectorAll('.progress-bar');
    elements && elements.forEach(function(el) {
      el.progressBar = new ProgressCircleBar(el);
      el.progressBar.setValue(el.dataset.value);
      el.progressBar.setAnimate(el.dataset.animated);
      el.progressBar.setHidden(el.dataset.hidden);
    })
  }

  return ProgressCircleBar;
});
