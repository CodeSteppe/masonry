// DOM
const masonry = document.querySelector('.masonry');
const divider1 = masonry.querySelector('.divider1');

// variables
let cardCount = 0;
let colHeights = [0, 0, 0, 0];
let pageSize = 12;
let lastCard;
let observer;

// functions
function loadData() {
  for (let i = 0; i < pageSize; i++) {
    createCard(i);
  }
}

loadData();

async function loadImage() {
  const img = document.createElement('img');
  const randomHeight = Math.round(Math.random() * 500) + 300;
  const src = `http://source.unsplash.com/random/400x${randomHeight}`;
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function createCard(i) {
  const card = document.createElement('div');
  card.classList.add('card');
  // hide at first
  card.style.position = 'fixed';
  card.style.top = 0;
  card.style.left = 0;
  card.style.visibility = 'hidden';

  const img = await loadImage();
  if (img) {
    card.append(img);
    document.body.appendChild(card);
    const cardIndex = cardCount;
    const colIndex = (cardIndex + 1) % 4;
    const cardHeight = card.clientHeight;
    colHeights[colIndex] += cardHeight;
    setMasonryHeight();
    masonry.insertBefore(card, divider1);

    // show card
    card.style.position = '';
    card.style.visibility = '';
    card.classList.add('show');
    cardCount++;

    // load more when last card shows
    if (i === pageSize - 1) {
      observe(card);
    }
  }
}

function observe(card) {
  if (!observer) {
    observer = new IntersectionObserver(entries => {
      if (entries.length === 1 && entries[0].isIntersecting === true) {
        loadData();
        observer.unobserve(entries[0].target);
      }
    });
  }
  observer.observe(card);
}

function setMasonryHeight() {
  masonry.style.height = Math.max(...colHeights) + 10 + 'px';
}

// handle window resize
function resetHeight() {
  colHeights = [0, 0, 0, 0];
  document.querySelectorAll('.card').forEach((card, index) => {
    const cardHeight = card.clientHeight;
    const colIndex = (index + 1) % 4;
    colHeights[colIndex] += cardHeight;
  });
  setMasonryHeight();
}

window.addEventListener('resize', resetHeight);