const masonry = document.querySelector('.masonry');

let cardCount = 0;
let colHeights = [0, 0, 0, 0];
let lastCard;
let observer;

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

function observe(card) {
  if (!observer) {
    observer = new IntersectionObserver(entries => {
      if (entries.length === 1 && entries[0].isIntersecting === true) {
        console.log('load more', entries);
        loadData();
        observer.unobserve(entries[0].target);
      }
    });
  }
  observer.observe(card);
}

async function createCard(i) {
  const card = document.createElement('div');
  card.classList.add('card');
  // hide first
  card.style.position = 'fixed';
  card.style.top = 0;
  card.style.left = 0;
  card.style.visibility = 'hidden';
  const randomH = Math.round(Math.random() * 500) + 300;
  const src = `http://source.unsplash.com/random/400x${randomH}`;
  const img = await loadImage(src, document.createElement('img'));
  if (img) {
    card.append(img);
    document.body.appendChild(card);
    // make sure card renders properly
    await sleep(200);
    const cardIndex = cardCount;
    const colIndex = (cardIndex + 1) % 4;
    const cardHeight = card.clientHeight;
    colHeights[colIndex] += cardHeight;
    setHeight();
    const divider1 = masonry.querySelector('.divider1');
    masonry.insertBefore(card, divider1);
    card.style.position = '';
    card.style.visibility = '';
    card.classList.add('show');
    cardCount++;
    if (i === 9) {
      observe(card);
    }
  }
}

function setHeight() {
  masonry.style.height = Math.max(...colHeights) + 10 + 'px';
}

// load data
function loadData() {
  for (let i = 0; i < 10; i++) {
    createCard(i);
  }
}

loadData();

// handle window resize
function resetHeight() {
  colHeights = [0, 0, 0, 0];
  document.querySelectorAll('.card').forEach((card, index) => {
    const cardHeight = card.clientHeight;
    const colIndex = (index + 1) % 4;
    colHeights[colIndex] += cardHeight;
  });
  setHeight();
}

window.addEventListener('resize', resetHeight);