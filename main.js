const suitsMapping = {
    '♥️': 'hearts',
    '♦️': 'diamonds',
    '♣️': 'clubs',
    '♠️': 'spades',
};

const response = {"players_count": 2, "deck": [["♠️", "J"], ["♦️", "J"], ["♣️", "9"], ["♣️", "Q"], ["♦️", "9"], ["♦️", "8"], ["♠️", "10"], ["♣️", "6"], ["♠️", "A"], ["♥️", "8"], ["♥️", "7"], ["♥️", "6"], ["♣️", "J"], ["♦️", "K"], ["♣️", "A"], ["♠️", "7"], ["♣️", "K"], ["♥️", "Q"], ["♥️", "J"], ["♣️", "7"], ["♥️", "A"], ["♦️", "10"], ["♦️", "6"], ["♠️", "9"]], "active_suit": "♠️", "attacker": [["♠️", "Q"], ["♠️", "8"], ["♦️", "7"], ["♣️", "8"], ["♠️", "6"], ["♦️", "A"]], "defender": [["♥️", "K"], ["♥️", "9"], ["♥️", "10"], ["♦️", "Q"], ["♣️", "10"], ["♠️", "K"]], "players": [[["♠️", "Q"], ["♠️", "8"], ["♦️", "7"], ["♣️", "8"], ["♠️", "6"], ["♦️", "A"]], [["♥️", "K"], ["♥️", "9"], ["♥️", "10"], ["♦️", "Q"], ["♣️", "10"], ["♠️", "K"]]], "suits": ["♥️", "♦️", "♣️", "♠️"], "ranks": ["6", "7", "8", "9", "10", "J", "Q", "K", "A"], "passes": 0}

const renderCard = (card, container, cardsNumber) => {
    const [symbol, rank] = card;
    const suit = suitsMapping[symbol];
    const image = document.createElement('img');
    image.classList.add('card_img');
    image.classList.add(`cards_number-${cardsNumber}`);
    image.classList.add(`cards_number-${cardsNumber}-hover`);
    image.src = `/img/${suit}${rank}.png`;
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

render(response);