const masonry = document.querySelector('.masonry');

function loadData() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    const randomH = Math.round(Math.random() * 800) + 200;
    img.src = `http://source.unsplash.com/random/400x${randomH}`;
    const title = document.createElement('h2');
    title.textContent = 'Title Goes Here' + i;
    const content = document.createElement('p');
    content.textContent = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quod et deleniti nobis quasi ad, adipisci perferendis totam, ducimus incidunt dolore aut, quae quaerat architecto quisquam repudiandae amet nostrum quidem?';
    card.append(img);
    card.append(title);
    card.append(content);
    const divider1 = masonry.querySelector('.divider1');
    if (divider1) {
      masonry.insertBefore(card, divider1);
    } else {
      masonry.append(card);
    }
  }
  const currentHeight = masonry.clientHeight;
  masonry.style.height = (currentHeight + 3000) + 'px';
}

loadData();