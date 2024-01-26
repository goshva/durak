const suitsMapping = {
    "♥": 'hearts',
    "♦": 'diamonds',
    "♣": 'clubs',
    "♠️": 'spades',
};

let response ={}

const renderCard = (card, container, cardsNumber) => {
    const [symbol, rank] = card;
    const suit = suitsMapping[symbol];
    const image = document.createElement('img');
    image.classList.add('card_img');
    image.classList.add(`cards_number-${cardsNumber}`);
    image.classList.add(`cards_number-${cardsNumber}-hover`);
    image.src = `/img/${suit}${rank}.png`;
    console.log(image.src)
    container.appendChild(image);
};

const renderBackCard = (container, cardsNumber) => {
    const image = document.createElement('img');
    image.classList.add('card_img');
    image.classList.add(`cards_number-${cardsNumber}`);
    image.src = '/img/card-back.png';
    container.appendChild(image);
};

const renderCards = (player, container, current) => {
    const cardsNumber = player.length;
    current ? player.forEach((card) => renderCard(card, container, cardsNumber)) :
        player.forEach(() => renderBackCard(container, cardsNumber));
}

const renderPlayerRoles = (players, attacker, defender) => {
    for (let i = 0; i < players.length; i += 1) {
        const playerRoleTextEl = document.querySelector(`.player${i}-role`);
        if (JSON.stringify(players[i]) === JSON.stringify(attacker)) {
            playerRoleTextEl.textContent = 'attacker';
        } else if (JSON.stringify(players[i]) === JSON.stringify(defender)) {
            playerRoleTextEl.textContent = 'defender';
        }
    }
};

const renderPlayerName = (players) => {
    for (let i = 0; i < players.length; i += 1) {
        const playerNameTextEl = document.querySelector(`.player${i}-name`);
        playerNameTextEl.textContent = `player${i}`;
    }
};

const renderDeck = (deck) => {
    const lastCard = deck[deck.length - 1];
    const container = document.querySelector('.deck_flex');
    renderCard(lastCard, container, 'lastCard');
};

const renderActiveSuit = (activeSuit) => {
    const activeSuitTextEl = document.querySelector('.active_suit-text');
    activeSuitTextEl.textContent = `Active Suit: ${activeSuit}`;
};

const render = (response) => {
    const { players_count, deck, active_suit, attacker, defender, players, suits, ranks, passes } = response;

    // Рисуем карты текущего игрока
    const player0 = players[0];
    const player1 = players[1];
    const player0CardsDiv = document.querySelector('.cards_container');
    renderCards(player0, player0CardsDiv, true)
    const player1CardsDiv = document.querySelector('.player1CardsContainer');
    renderCards(player1, player1CardsDiv, false)

    // Рисуем колоду
    renderDeck(deck);

    // Рисуем роли
    renderPlayerRoles(players, attacker, defender)

    // Рисуем имена игроков
    renderPlayerName(players);

    // Рисуем козырь
    renderActiveSuit(active_suit);
}

function connect() {
  var ws = new WebSocket('ws://localhost:8765');
  ws.onopen = function() {
    // subscribe to some channels
    ws.send(JSON.stringify({
        "type": "hi"
    }));
  };

  ws.onmessage = function(e) {
    console.log('Message:', e.data);
    response = JSON.parse(e.data);
    render(response);

  };

  ws.onclose = function(e) {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    setTimeout(function() {
      connect();
    }, 1000);
  };

  ws.onerror = function(err) {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    ws.close();
  };
}

connect();