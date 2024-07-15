(function() {
  const sosiska = document.getElementById('sosiska');
  const count = document.getElementById('count');
  const img = document.getElementById('img');
  const imgText = document.getElementById('img-text');
  const wow = document.getElementById('wow');
  const ads = document.getElementById('ads');

  const adsText = [
    'Со слов директора "бля буду скоро ИПО" - планируется выход монет на биржу',
    'Сегодня сосиски - завтра яхты',
    'Кликай как на мать родную, будешь богат',
    'Похвастайся перед друзьями своими сосисками',
    'Только сегодня - к сосикам картошка бесплатно',
    'Кликай на сосиски - дрочи пиписки (С) Директор фирмы',
    'Для вас - сосиски, для нас бабки с рекламы',
  ]

  function setAds() {
    const idx = Math.round(Math.random()*(adsText.length - 1));

    ads.innerHTML = adsText[idx];
  }

  setAds();

  setInterval(() => {
    setAds();
  }, 10000)

  function createPromo(text) {
    wow.innerHTML = `
      <marquee>${text}</marquee>
    `
  }

  function eventDo() {
    sosiska.classList.remove('active')

    count.innerHTML = Number(count.innerHTML) + 1;

    const currentCount = Number(count.innerHTML);

    if (currentCount > 18) {
      img.src = "https://static.wikia.nocookie.net/modistalker/images/f/f3/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%9F%D0%A2-0.jpg/revision/latest?cb=20190520194052&path-prefix=ru";
      imgText.innerHTML = 'Толиков'
      if(currentCount === 19) {
        createPromo('НАХУЯ ТЫ НА ЭТО КЛИКАЕШЬ?')
      }
    } else if (currentCount > 15) {
      img.src = "https://flomaster.top/o/uploads/posts/2023-11/1700486746_flomaster-top-p-milii-multyashnii-khomyak-narisovannie-akr-2.jpg";
      imgText.innerHTML = "хомяков"
      if(currentCount === 16) {
        createPromo('БЛЯ НЕ ТА ИГРА')
      }
    } else if (currentCount > 12) {
      img.src = 'https://pizzatorg.ru/wa-data/public/shop/products/25/00/25/images/31/31.400@2x.jpg';
      imgText.innerHTML = "пицц с салями"
      if(currentCount === 13) {
        createPromo('ДА ТЫ НАХУЯРИЛ НА ПИЦЦУ')
      }
    } else if (currentCount > 8) {
      img.src = 'https://kmpp.ru/upload/iblock/c0d/c0d114c1348a6ddf2b78b8e48618f81b.jpg';
      imgText.innerHTML = "докторских колбас"
      if(currentCount === 9) {
        createPromo('ДА ТЫ ДОКТОРСКИХ КОЛБАС КОРОЛЬ')
      }
    } else if (currentCount > 3) {
      img.src = 'https://images.techinsider.ru/upload/img_cache/382/3826e54acea11aeb55b9f62451da21f6_ce_1154x769x63x0.jpeg';
      imgText.innerHTML = "сарделек"
      if(currentCount === 4) {
        createPromo('ДА ТЫ САРДЕЛЬНЫЙ МАГНАТ')
      }
    }
  }

  sosiska.addEventListener('touchstart', () => {
    sosiska.classList.add('active');
  });
  sosiska.addEventListener('mousedown', () => {
    sosiska.classList.add('active');
  });
  sosiska.addEventListener('mouseup', eventDo);
})()
