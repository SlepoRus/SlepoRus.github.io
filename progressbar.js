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
      STARTING_ANGLE = Math.PI/HALF_CIRCLE * THREE_QUARTES_CIRCLE,
      PROGRESS_CLASS_NAME_WITH_DOT = '.progress-bar',
      PROGRESS_CLASS_NAME = 'progress-bar';


  //Что то вроде приватных методов класса
  //Установка настроек прогресс бара
  function setOptions(options) {
      return {
        width: Number(options.width) || 160,
        height: Number(options.height) || 160,
        animate: !!options.animate || false,
        hidden: !!options.hidden || false,
        lineWidth: options.lineWidth || '10',
        backgroundColor: options.backgroundColor || "#ddd",
        frontColor: options.frontColor || "#ffcc00",
        radius: Number(options.radius) || 70,
        fpsAnimation: Number(options.fpsAnimation) || 25,
        value: Number(options.value) || 0.0
      }
  }
  //Попытка получить из DOM элемент
  function getDOMObject(el) {
      el = (document.querySelector && document.querySelector(el)) || document.getElementById(el) || document.getElementsByClassName(el);
      if (!el) {
        throw('No elements found. Single results expected');
      } else if (el.length > 1) {
        throw('Multiply results found. Single results expected');
      }

      return el;
  }
  //Проверка на canvas
  function getCanvas() {
      var canvas = document.createElement('canvas');

      if (!canvas.getContext) {
          throw('No canvas support found.');
      } else {
        return canvas;
      }
  }
  // Метод проверки пришедшего элемента. Если приходит строка, пытаемся найти в DOM этот элемент.
  function convertor(el) {
      if (!document) {
        throw('document is undefined');
      }
      if (!el) {
        throw('Element expected');
      } else {
         if (typeof el === "string") {
            el = getDOMObject(el);
         } else if (typeof el !== "object") {
            throw('Wrong format of element. Object or string required')
         }
      }

      return el;
  }
  //Конструктор прогресс-бара
  function ProgressCircleBar(el, options) {
      var canvas, context, el;

      try {
        canvas =  getCanvas(),
        context = canvas.getContext('2d'),
        el = convertor(el);
      }
      catch(e) {
        throw('Error on init - ' + e)
      }

      el.appendChild(canvas);
      // Настройки прогресс-бара
      this.options = options = setOptions(options || {});
      canvas.width = options.width;
      canvas.height = options.height;
      // Элемент, в который входит прогресс-бар
      this.element = el;
      // canvas для анимации прогресс-бара
      this.canvas = canvas;
      //Установка текущего значения прогресс бара.
      this.context = context;
  }

  ProgressCircleBar.prototype = {

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
    //Включение анимации
    setAnimate: function(status) {
      var me = this,
          animation = function() {
            var options = me.options,
                value = options.value,
                fps = me.options.fpsAnimation,
                interval = setInterval(function() {
                   value = options.value + 1;
                   if (value > MAX_PERCENT) {
                     me.setValue(0);
                   } else {
                     me.setValue(value);
                   }

                   !options.animate && clearInterval(interval);
                 }, fps);
           };

      status && animation();
      this.options.animate = !!status;
    },
    //Спрятать элемент
    setHidden: function(status) {
      var el = this.element;

      status ? el.style.display = "none" : el.style.display = "block";
      this.options.hidden = !!status;
    }
  }

  //Автоматическая инициализация уже созданных в DOM прогресс-баров

  elements = document.querySelectorAll ? document.querySelectorAll(PROGRESS_CLASS_NAME_WITH_DOT) : document.getElementsByClassName(PROGRESS_CLASS_NAME);
  for (var i = 0; i<elements.length; i++) {
    var el = elements[i];

    el.progressBar = new ProgressCircleBar(el);
    el.progressBar.setValue(el.getAttribute('data-value'));
    el.progressBar.setAnimate(el.getAttribute('data-animate'));
    el.progressBar.setHidden(el.getAttribute('data-hidden'));
  }

  return ProgressCircleBar;
});
