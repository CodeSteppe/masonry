const masonry = document.querySelector('.masonry');

async function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function loadImage(src, element) {
  return new Promise((resolve, reject) => {
    element.onload = () => resolve(element);
    element.onerror = reject;
    element.src = src;
  });
}

async function createCard() {
  const card = document.createElement('div');
  card.classList.add('card');
  const randomH = Math.round(Math.random() * 800) + 200;
  const src = `http://source.unsplash.com/random/400x${randomH}`;
  const img = await loadImage(src, document.createElement('img'));
  if (img) {
    card.append(img);
    const divider1 = masonry.querySelector('.divider1');
    masonry.insertBefore(card, divider1);
    await sleep(500);
    const cardIndex = masonry.querySelectorAll('.card').length - 1;
    const cardBottom = card.offsetTop + card.offsetHeight;
    return {
      card,
      cardIndex,
      cardBottom
    }
  }
}

function loadData() {
  const tasks = [];
  for (let i = 0; i < 12; i++) {
    tasks.push(createCard());
  }
  // const currentHeight = masonry.clientHeight;
  // masonry.style.height = (currentHeight + 3000) + 'px';
  Promise.all(tasks)
    .then((result) => {
      const bottoms = result.map(r => r.cardBottom);
      const maxBottom = Math.max(...bottoms);
      console.log('all card rendered', result);
      masonry.style.height = Math.ceil(maxBottom) + 30 + 'px';
    });
}

loadData();

document.addEventListener('DOMContentLoaded', (e) => {
  console.log('DOMContentLoaded');
});