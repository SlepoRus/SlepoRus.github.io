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

    if (currentCount > 1000) {
      imgText.innerHTML = 'Толиков'
      if(currentCount === 1001) {
        img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV_y5SAK5p6eqisAAf4ory1UYVOV-cAnidMA&s";
        createPromo('НАХУЯ ТЫ НА ЭТО КЛИКАЕШЬ?')
      }
    } else if (currentCount > 500) {
      imgText.innerHTML = "хомяков"
      if(currentCount === 501) {
        img.src = "https://flomaster.top/o/uploads/posts/2023-11/1700486746_flomaster-top-p-milii-multyashnii-khomyak-narisovannie-akr-2.jpg";
        createPromo('БЛЯ НЕ ТА ИГРА')
      }
    } else if (currentCount > 100) {
      imgText.innerHTML = "пицц с салями"
      if(currentCount === 101) {
        img.src = 'https://pizzatorg.ru/wa-data/public/shop/products/25/00/25/images/31/31.400@2x.jpg';
        createPromo('ДА ТЫ НАХУЯРИЛ НА ПИЦЦУ')
      }
    } else if (currentCount > 50) {
      imgText.innerHTML = "докторских колбас"
      if(currentCount === 51) {
        img.src = 'https://kmpp.ru/upload/iblock/c0d/c0d114c1348a6ddf2b78b8e48618f81b.jpg';
        createPromo('ДА ТЫ ДОКТОРСКИХ КОЛБАС КОРОЛЬ')
      }
    } else if (currentCount > 25) {
      imgText.innerHTML = "сарделек"
      if(currentCount === 26) {
        img.src = 'https://images.techinsider.ru/upload/img_cache/382/3826e54acea11aeb55b9f62451da21f6_ce_1154x769x63x0.jpeg';
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
