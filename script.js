const symbols = ['🍕', '🍔', '🍟', '🌮', '🍕', '🍔', '🍟', '🌮'];
let firstCard = null;
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const gameBoard = document.getElementById('gameBoard');
  const shuffled = shuffle([...symbols]);

  shuffled.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.innerHTML = '❓';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped')) return;

  this.classList.add('flipped');
  this.innerHTML = this.dataset.symbol;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  if (this.dataset.symbol === firstCard.dataset.symbol) {
    this.classList.add('matched');
    firstCard.classList.add('matched');
    firstCard = null;
  } else {
    lockBoard = true;
    setTimeout(() => {
      this.classList.remove('flipped');
      firstCard.classList.remove('flipped');
      this.innerHTML = '❓';
      firstCard.innerHTML = '❓';
      firstCard = null;
      lockBoard = false;
    }, 1000);
  }
}

createBoard();
