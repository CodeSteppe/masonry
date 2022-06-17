const masonry = document.querySelector('.masonry');

let cardCount = 0;
const colHeights = [0, 0, 0, 0];

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
  card.style.position = 'fixed';
  card.style.visibility = 'hidden';
  const randomH = Math.round(Math.random() * 500) + 300;
  const src = `http://source.unsplash.com/random/400x${randomH}`;
  const img = await loadImage(src, document.createElement('img'));
  if (img) {
    card.append(img);
    document.body.appendChild(card);
    await sleep(500);
    const cardIndex = cardCount;
    const colIndex = (cardIndex + 1) % 4;
    colHeights[colIndex] += card.clientHeight;
    console.log('add card', card, cardIndex, card.clientHeight, `col ${colIndex} height`, colHeights[colIndex]);
    masonry.style.height = Math.max(...colHeights) + 10 + 'px';
    const divider1 = masonry.querySelector('.divider1');
    masonry.insertBefore(card, divider1);
    card.style.position = '';
    card.style.visibility = '';
    cardCount++;
  }
}

function loadData() {
  for (let i = 0; i < 12; i++) {
    (createCard());
  }
}

loadData();

document.addEventListener('DOMContentLoaded', (e) => {
  console.log('DOMContentLoaded');
});