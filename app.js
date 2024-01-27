let response = {"players_count": 2, "deck": [["♠️", "J"], ["♦️", "J"], ["♣️", "9"], ["♣️", "Q"], ["♦️", "9"], ["♦️", "8"], ["♠️", "10"], ["♣️", "6"], ["♠️", "A"], ["♥️", "8"], ["♥️", "7"], ["♥️", "6"], ["♣️", "J"], ["♦️", "K"], ["♣️", "A"], ["♠️", "7"], ["♣️", "K"], ["♥️", "Q"], ["♥️", "J"], ["♣️", "7"], ["♥️", "A"], ["♦️", "10"], ["♦️", "6"], ["♠️", "9"]], "active_suit": "♠️", "attacker": [["♠️", "Q"], ["♠️", "8"], ["♦️", "7"], ["♣️", "8"], ["♠️", "6"], ["♦️", "A"]], "defender": [["♥️", "K"], ["♥️", "9"], ["♥️", "10"], ["♦️", "Q"], ["♣️", "10"], ["♠️", "K"]], "players": [[["♠️", "Q"], ["♠️", "8"], ["♦️", "7"], ["♣️", "8"], ["♠️", "6"], ["♦️", "A"]], [["♥️", "K"], ["♥️", "9"], ["♥️", "10"], ["♦️", "Q"], ["♣️", "10"], ["♠️", "K"]], [["♠️", "J"], ["♦️", "J"], ["♣️", "9"], ["♣️", "Q"], ["♦️", "9"], ["♦️", "8"]], [["♥️", "J"], ["♣️", "7"], ["♥️", "A"], ["♦️", "10"], ["♦️", "6"], ["♠️", "9"]]], "suits": ["♥️", "♦️", "♣️", "♠️"], "ranks": ["6", "7", "8", "9", "10", "J", "Q", "K", "A"], "passes": 1}

const suitsMapping = {
    "♥️": 'hearts',
    "♦️": 'diamonds',
    "♣️": 'clubs',
    "♠️": 'spades',
};

const passesMapping = {
    1: (image) => {
        image.style.left = '-9px';
    },
    2: (image) => {
        image.style.left = '56px';
    },
    3: (image) => {
        image.style.left = '121px';
    },
    4: (image) => {
        image.style.left = '186px';
    },
    5: (image) => {
        image.style.left = '251px';
    },
};

const renderCard = (card, container, cardsNumber, passes) => {
    const [symbol, rank] = card;
    const suit = suitsMapping[symbol];
    const image = document.createElement('img');
    image.classList.add('card_img');
    image.classList.add(`cards_number-${cardsNumber}`);
    image.classList.add(`cards_number-${cardsNumber}-hover`);
    image.src = `/img/${suit}${rank}.png`;
    // Карты кладутся на стол в зависимости от их количества, если я правильно понимаю
    // что pass это те карты которые сейчас в игре???
    image.addEventListener('click', () => {
        passesMapping[passes](image);
        image.style.top = '-256px';
        image.classList.remove(`cards_number-${cardsNumber}-hover`);
        image.style.transform = 'none';
    });
    container.appendChild(image);
};

const renderBackCard = (container, className) => {
    const image = document.createElement('img');
    image.classList.add('card_img');
    image.classList.add(className);
    image.src = '/img/card-back.png';
    container.appendChild(image);
};

const renderCards = (player, container, current, passes) => {
    const cardsNumber = player.length;
    current ? player.forEach((card) => renderCard(card, container, cardsNumber, passes)) :
        player.forEach(() => renderBackCard(container, `cards_number-${cardsNumber}`));
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

const renderPlayersNames = () => {
    for (let i = 0; i < 4; i += 1) {
        const playerNameTextEl = document.querySelector(`.player${i}-name`);
        console.log(playerNameTextEl)
        playerNameTextEl.textContent = `player${i}`;
    }
};

const renderDeck = (deck) => {
    const lastCard = deck[deck.length - 1];
    const container = document.querySelector('.deck_flex');
    renderCard(lastCard, container, 'lastCard');
    deck.forEach(() => renderBackCard(container, 'deck_card'));
    const deckCards = document.querySelectorAll('.deck_card');
    let i = 0;
    deckCards.forEach((image) => {
        image.style.top = `${i * 2}px`;
        i += 1;
    });
};

const renderPlayerCards = (players, currentPlayer, passes) => {
    let i = 0;
    players.forEach((player) => {
        const playerCardsDiv = document.querySelector(`.player${i}CardsContainer`);
        i += 1;
        console.log(i)
        player === currentPlayer ? renderCards(player, playerCardsDiv, true, passes) :
        renderCards(player, playerCardsDiv, false, passes)
    })

}

const render = (response) => {
    const { players_count, deck, active_suit, attacker, defender, players, suits, ranks, passes } = response;

    // Рисуем карты игроков
    renderPlayerCards(players, players[0], passes);

    // Рисуем колоду
    renderDeck(deck);

    // Рисуем роли
    renderPlayerRoles(players, attacker, defender)

    // Рисуем имена игроков
    renderPlayersNames();

};

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
render(response);