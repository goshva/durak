const suitsMapping = {
    "♥": 'hearts',
    "♦": 'diamonds',
    "♣": 'clubs',
    "♠️": 'spades',
};

const passesMapping = {
    0: (image) => {
        image.style.left = '-29px';
    },
    1: (image) => {
        image.style.left = '31px';
    },
    2: (image) => {
        image.style.left = '91px';
    },
    3: (image) => {
        image.style.left = '151px';
    },
    4: (image) => {
        image.style.left = '211px';
    },
    5: (image) => {
        image.style.left = '271px';
    },
};

const dealingCardsMapping = {
    0: (image, i) => {
        setTimeout(() => {
            sound('dealing_deck');
            image.style.transform = 'translate(420px, 200px)';
        }, i * 200);
        setTimeout(() => {
            image.parentNode.removeChild(image);
        }, i * 200 + 200); 
    },
    1: (image, i) => {
        setTimeout(() => {
            sound('dealing_deck');
            image.style.transform = 'translate(420px, -200px)';
        }, i * 200);
        setTimeout(() => {
            image.parentNode.removeChild(image);
        }, i * 200 + 200); 
    }
};

function sound(sound){
    var snd = new Audio(`./sounds/${sound}.mp3`)
    snd.play()
}

const dealingCardsWith2Players = (attacker, defender, players) => {
    const attackerNumber = players.findIndex((player) => JSON.stringify(player) === JSON.stringify(attacker));
    const defenderNumber = players.findIndex((player) => JSON.stringify(player) === JSON.stringify(defender));3
    let attackerCards = 4;
    let defenderCards = 4;
    let i = 0;
    while (attackerCards < 6 && defenderCards < 6) {
        if (attackerCards < 6) {
            const lastCardInDeck = document.querySelector(`.deck_card_number_${i}`);
            dealingCardsMapping[attackerNumber](lastCardInDeck, i);
            attackerCards += 1;
            i += 1;
        }
        if (defenderCards < 6) {
            const lastCardInDeck = document.querySelector(`.deck_card_number_${i}`);
            dealingCardsMapping[defenderNumber](lastCardInDeck, i);
            defenderCards += 1;
            i += 1
        }
    }
};

const dealingCards = (players_count, players, attacker, defender, deck) => {
    switch (players_count) {
        case 2:
            dealingCardsWith2Players(attacker, defender, players, deck);

    }
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
        sound('card_to_the_table');
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
    passes = 0;
    current ? player.forEach((card) => {
        renderCard(card, container, cardsNumber, passes);
        passes += 1;
    }) :
        player.forEach(() => renderBackCard(container, `cards_number-${cardsNumber}`));
};

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

const renderPlayersNames = (players_count) => {
    for (let i = 0; i < players_count; i += 1) {
        const playerNameTextEl = document.querySelector(`.player${i}-name`);
        playerNameTextEl.textContent = `player${i}`;
    }
};

const renderDeck = (deck) => {
    const lastCard = deck[deck.length - 1];
    const container = document.querySelector('.deck_flex');
    renderCard(lastCard, container, 'lastCard');
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
        i += 1;
        player === currentPlayer ? renderCards(player, playerCardsDiv, true, passes) :
        renderCards(player, playerCardsDiv, false, passes);
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