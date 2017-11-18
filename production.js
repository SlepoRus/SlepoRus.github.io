(function() {
  var html_array = document.getElementsByTagName('input'),
      progress = document.getElementsByClassName('progress-bar')[0],
      slice = [].slice,
      fields_array = slice.call(html_array),
      checkbox = fields_array.filter(function(val) {
        return val.type === "checkbox";
      }),
      input = fields_array.filter(function(val) {
        return val.type === "text";
      })[0],
      getNormalVH = function() {
        document.getElementsByClassName('b-container')[0].style['height'] = document.documentElement.clientHeight + "px";
      };
      // Заполнение input'а аналогично выставленным значениям в progressbar'e
  input.value = progress.progressBar.options.value;
  // Заполнение checkbox'es аналогично выставленным значениям в progressbar'e
  for (var i = 0; i < checkbox.length; i++) {
    var name = checkbox[i].name;

    if (progress) {
      checkbox[i].checked = !!progress.progressBar[name];
    }
  }

  getNormalVH();
  window.addEventListener('resize', getNormalVH);
  window.addEventListener('orientationchange', getNormalVH);
})()
function setValue(el, ddd) {
  var targ = document.getElementById(ddd);

  targ.progressBar.setValue(el.value);
}
function setAnimate(el, ddd) {
  var targ = document.getElementById(ddd);

  if (el.checked) {
    targ.progressBar.setAnimate(true);
  } else {
    targ.progressBar.setAnimate(false);
  }
}
function setHidden(el, ddd) {
  var targ = document.getElementById(ddd);

  if (el.checked) {
    targ.progressBar.setHidden(true);
  } else {
    targ.progressBar.setHidden(false);
  }
}
