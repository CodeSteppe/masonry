const masonry = document.querySelector('.masonry');

function loadData() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = 'http://source.unsplash.com/random';
    const title = document.createElement('h2');
    title.textContent = 'Title Goes Here';
    const content = document.createElement('p');
    content.textContent = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quod et deleniti nobis quasi ad, adipisci perferendis totam, ducimus incidunt dolore aut, quae quaerat architecto quisquam repudiandae amet nostrum quidem?';
    card.append(img);
    card.append(title);
    card.append(content);
    masonry.append(card);
  }
}