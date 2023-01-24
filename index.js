let food = {};
food.title = [
  `Каша на завтрак`,
  `Хачапури`,
  `Крабовый салат`,
  `Макарошки с тефтелями`,
  `Куриный суп`,
  `Медовик`
];

food.price = [
  0,
  300,
  100,
  450,
  100,
  0
];

let card = document.querySelectorAll('.card');
let selected = [];

let cardscontainer = document.querySelector(`.food-container`)
for (let i = 0; i < food.title.length; i++) {
  cardscontainer.innerHTML += 
    `<div class="card">
      <img src="assets/foods/${i+1}.jpeg">
      <div class="card-body">
          <span class="food-title">${food.title[i]}</span>
          <span class="food-price">${food.price[i]}</span>
      </div>
    </div>`;
  card = document.querySelectorAll('.card');
  if (food.price[i] === 0) {
    card[i].querySelector('.food-price').textContent = `-`;
    card[i].classList.add('card-not-available');
  }
}

for (let node of card)
  if (node.querySelector('.food-price').textContent !== '-')
    node.addEventListener('click', cardClick);

function cardClick(evt) {
  if (!this.classList.contains('card-active')) {
    this.classList.add('card-active');
    selected.push(this.cloneNode(true));
  }
  else {
    this.classList.remove('card-active');
    selected.splice(selected.findIndex((element) => element.textContent == this.textContent), 1);
  }
  sum = 0
  document.querySelector('.sidebar-list').innerHTML = ``;
  for (let elem of selected) {
    sum += Number(elem.querySelector('.food-price').textContent);
    document.querySelector('.sidebar-list').innerHTML += `<li>${elem.querySelector('.food-title').textContent} - ${elem.querySelector('.food-price').textContent}</li>`
  }
  document.querySelector('.sidebar-total').textContent = `Итого: ${sum}`;
}

let searched = [];
document.querySelector('.search-input').addEventListener('input', function () {
  cardscontainer.innerHTML = ``;
  if (this.value != ``) {
    searched = [];
    for (let elem of card)
      if (elem.querySelector('.food-title').textContent.toLowerCase().indexOf(this.value.toLowerCase()) == 0 || elem.querySelector('.food-price').textContent.toLowerCase().indexOf(this.value.toLowerCase()) == 0)
        searched.push(elem.cloneNode(true));
    for (let elem of searched) 
      cardscontainer.innerHTML += elem.outerHTML;
  }
  else
    for (let elem of card) 
      cardscontainer.innerHTML += elem.outerHTML;
  
  for (let node of cardscontainer.querySelectorAll('.card')) {
    if (node.querySelector('.food-price').textContent !== '-')
      node.addEventListener('click', cardClick);
    if (isSelected(node))
      node.classList.add('card-active');
    else
      node.classList.remove('card-active');
    }
});

function isSelected(node) {
  for (let elem of selected) {
    if (elem.textContent == node.textContent)
      return true;
  }
  return false;
}

document.querySelector('.cart-button').addEventListener('click', function () {
  document.querySelector('.sidebar').classList.toggle('hidden');
});

document.querySelector('.order-button').addEventListener('click', function () {
  cardscontainer.outerHTML = `<div class='container-fluid text-center'><h2>Благодарим вас за заказ!</h2><br/><h3>Курьер уже спешит к вам</h3><div></div>`
  document.querySelector('.sidebar').classList.add('hidden');
  document.querySelector('.cart-button').disabled = true;
  document.querySelector('.search-input').disabled = true;
  document.querySelector('.search-button').disabled = true;
  document.querySelector('.container-fluid').style.margin = `25vh 0`;
  document.querySelector('.container-fluid').querySelector('h3').style.textDecoration = 'underline';
  document.querySelector('.container-fluid').querySelector('h3').style.fontStyle = 'italic';
});