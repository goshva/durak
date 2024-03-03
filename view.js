import handleCard from "./cardStyles.js";

const suitsMapping = {
    "♥": 'hearts',
    "♦": 'diamonds',
    "♣": 'clubs',
    "♠️": 'spades',
};


const dealingCardsMapping = {
    0: 'translate(420px, 200px)',
    1: 'translate(420px, -200px)',
};

function sound(sound){
    var snd = new Audio(`./sounds/${sound}.mp3`)
    snd.play()
}

const dealingCardsWith2Players = (attacker, defender, players) => {
    const attackerNumber = players.findIndex((player) => JSON.stringify(player) === JSON.stringify(attacker));
    const defenderNumber = players.findIndex((player) => JSON.stringify(player) === JSON.stringify(defender));
    const order = [attackerNumber, defenderNumber];
    let i = 0;
    while (players[0].length < 6 && players[1].length < 6) {
        order.map((number) => {
            if (players[number] < 6) {
                const lastCardInDeck = document.querySelector(`.deck_card_number_${i}`);
                setTimeout(() => {
                    sound('dealing_deck');
                    lastCardInDeck.style.transform = dealingCardsMapping[number]
                }, i * 200);
                setTimeout(() => {
                    lastCardInDeck.parentNode.removeChild(lastCardInDeck);
                }, i * 200 + 200); 
                dealingCardsMapping[attackerNumber](lastCardInDeck, i);
                players[number] += 1;
                i += 1
            }
        })
    }
};

const dealingCards = (players_count, players, attacker, defender, deck) => {
    switch (players_count) {
        case 2:
            dealingCardsWith2Players(attacker, defender, players, deck);

    }
};


const renderCard = (card, container, cardsNumber, passes, index, players) => {
    const [symbol, rank] = card;
    const suit = suitsMapping[symbol];
    const image = document.createElement('img');
    const div = document.createElement('div');
    div.classList.add('grid-item');
    image.classList.add('card_img');
    image.classList.add('player-cards');
    image.classList.add(`cards_number-hover`);
    image.src = `/img/${suit}${rank}.png`;
    // Карты кладутся на стол в зависимости от их количества, если я правильно понимаю
    // что pass это те карты которые сейчас в игре???
    

    image.addEventListener('click', () => handleCard(image, passes, index), {once: true});
    div.appendChild(image);
    container.appendChild(div);
};

const renderBackCard = (container, className) => {
    const div = document.createElement('div');
    div.classList.add('grid-item');
    const image = document.createElement('img');
    image.classList.add('card_img');
    image.classList.add('card_back');
    image.classList.add(className);
    image.src = '/img/card-back.png';
    div.appendChild(image)
    container.appendChild(div);
};

const renderCards = (players, player, container, current, passes, index) => {
    const cardsNumber = player.length;
    passes = 0;
    current ? player.forEach((card) => {
        renderCard(card, container, cardsNumber, passes, index, players);
        passes += 1;
    }) : player.forEach(() => renderBackCard(container, 'player-cards'));
};

const renderPlayerRoles = (players, attacker, defender) => {
    const defenderIcon = new Image();
    defenderIcon.classList.add('icon');
    defenderIcon.src = './img/defender-icon.svg';
    const attackerIcon = new Image();
    attackerIcon.src = './img/attacker-icon.svg';
    attackerIcon.classList.add('icon')
    for (let i = 0; i < players.length; i += 1) {
        const playerRoleTextEl = document.querySelector(`.player${i}-role`);
        if (JSON.stringify(players[i]) === JSON.stringify(attacker)) {
            playerRoleTextEl.appendChild(attackerIcon)
        } else if (JSON.stringify(players[i]) === JSON.stringify(defender)) {
            playerRoleTextEl.appendChild(defenderIcon);
        }
    }
};

const renderPlayersNames = (players_count) => {
    for (let i = 0; i < players_count; i += 1) {
        const playerNameTextEl = document.querySelector(`.player${i}-name`);
        playerNameTextEl.textContent = `player${i}`;
    }
};

const renderLastCard = (card, container) => {
    const [symbol, rank] = card;
    const suit = suitsMapping[symbol];
    const image = document.createElement('img');
    image.classList.add('card_img');
    image.classList.add('lastCard');
    image.src = `/img/${suit}${rank}.png`;
    container.appendChild(image);
};


const renderDeck = (deck) => {
    const lastCard = deck[deck.length - 1];
    const container = document.querySelector('.deck_flex');
    renderLastCard(lastCard, container);
    deck.forEach(() => renderBackCard(container, 'deck_card'));
    const deckCards = document.querySelectorAll('.deck_card');
    let i = -25;
    let j = deck.length - 1;
    deckCards.forEach((image) => {
        image.style.top = `${i * 2}px`;
        image.classList.add(`deck_card_number_${j}`);
        j -= 1;
        i += 1;
    });
};

const renderPlayerCards = (players, currentPlayer, passes) => {
    let i = 0;
    players.forEach((player) => {
        const playerCardsDiv = document.querySelector(`.player${i}CardsContainer`);
        player === currentPlayer ? renderCards(players, player, playerCardsDiv, true, passes, i) :
        renderCards(players, player, playerCardsDiv, false, passes, i);
        i += 1;
    });
    
};

const runApp = (players, passes, attacker, defender, deck, players_count) => {
    renderDeck(deck);
    renderPlayerRoles(players, attacker, defender)
    renderPlayersNames(players_count);
    renderPlayerCards(players, players[0], passes);
};

export default (state) => (path, value) => {
    const { init, attacker, deck, defender, passes, players, players_count } = state;
    if (init) {
        switch (path) {
            case 'init':
                runApp(players, passes, attacker, defender, deck, players_count);
                break;
            case 'deck':
                renderDeck(value);
                break;
            case 'players':
                renderPlayerCards(value, value[0], passes);
                break;
            case 'attacker':
                renderPlayerRoles(players, attacker, defender);
                break;
            case 'defender':
                renderPlayerRoles(players, attacker, defender);
                break;
            case 'passes':
                renderPlayerCards(value, value[0], passes);
                break;
            case 'round':
                dealingCards(players_count, players, attacker, defender);
                break;
            default:
                break;
        }
    }
}