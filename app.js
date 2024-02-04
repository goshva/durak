//import {a} from '/main.js';

//let response = {"players_count": 2, "deck": [["♠️", "J"], ["♦️", "J"], ["♣️", "9"], ["♣️", "Q"], ["♦️", "9"], ["♦️", "8"], ["♠️", "10"], ["♣️", "6"], ["♠️", "A"], ["♥️", "8"], ["♥️", "7"], ["♥️", "6"], ["♣️", "J"], ["♦️", "K"], ["♣️", "A"], ["♠️", "7"], ["♣️", "K"], ["♥️", "Q"], ["♥️", "J"], ["♣️", "7"], ["♥️", "A"], ["♦️", "10"], ["♦️", "6"], ["♠️", "9"]], "active_suit": "♠️", "attacker": [["♠️", "Q"], ["♠️", "8"], ["♦️", "7"], ["♣️", "8"], ["♠️", "6"], ["♦️", "A"]], "defender": [["♥️", "K"], ["♥️", "9"], ["♥️", "10"], ["♦️", "Q"], ["♣️", "10"], ["♠️", "K"]], "players": [[["♠️", "Q"], ["♠️", "8"], ["♦️", "7"], ["♣️", "8"], ["♠️", "6"], ["♦️", "A"]], [["♥️", "K"], ["♥️", "9"], ["♥️", "10"], ["♦️", "Q"], ["♣️", "10"], ["♠️", "K"]], [["♠️", "J"], ["♦️", "J"], ["♣️", "9"], ["♣️", "Q"], ["♦️", "9"], ["♦️", "8"]], [["♥️", "J"], ["♣️", "7"], ["♥️", "A"], ["♦️", "10"], ["♦️", "6"], ["♠️", "9"]]], "suits": ["♥️", "♦️", "♣️", "♠️"], "ranks": ["6", "7", "8", "9", "10", "J", "Q", "K", "A"], "passes": 1}
//let response={ "players_count": 3, "deck": [ [ "B", "Q" ], [ "P", "6" ], [ "K", "10" ], [ "K", "8" ], [ "Ch", "J" ], [ "P", "10" ], [ "P", "K" ], [ "Ch", "Q" ], [ "Ch", "7" ], [ "B", "6" ], [ "K", "K" ], [ "P", "J" ], [ "Ch", "9" ], [ "B", "K" ], [ "Ch", "8" ], [ "K", "6" ], [ "B", "8" ], [ "P", "9" ] ], "active_suit": "K", "attacker": [ [ "B", "9" ], [ "K", "7" ], [ "B", "A" ], [ "B", "7" ], [ "B", "10" ], [ "P", "Q" ] ], "defender": [ [ "B", "J" ], [ "K", "Q" ], [ "Ch", "10" ], [ "K", "J" ], [ "K", "A" ], [ "P", "A" ] ], "players": [ [ [ "Ch", "6" ], [ "Ch", "A" ], [ "Ch", "K" ], [ "K", "9" ], [ "P", "8" ], [ "P", "7" ] ], [ [ "B", "9" ], [ "K", "7" ], [ "B", "A" ], [ "B", "7" ], [ "B", "10" ], [ "P", "Q" ] ], [ [ "B", "J" ], [ "K", "Q" ], [ "Ch", "10" ], [ "K", "J" ], [ "K", "A" ], [ "P", "A" ] ] ], "suits": [ "Ch", "B", "K", "P" ], "ranks": [ "6", "7", "8", "9", "10", "J", "Q", "K", "A" ], "passes": 0 }

const suitsMapping = {
    "♥️": "hearts",
    "♦️": "diamonds",
    "♣️": "clubs",
    "♠️": "spades",
};

const suitsMapping2 = {
    'Ch': "hearts",
    'B': "diamonds",
    'K': "clubs",
    'P': "spades",
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

const playerCardsDiv0 = document.querySelector(`.player0CardsContainer`);

const renderCard =async (card, container, cardsNumber,passes ) => {
 
   const [symbol, rank] = [card[0],card[1]];
   //const [symbol, rank] =["♦️", "8"]
    //console.log(symbol,rank)
    const suit = suitsMapping2[symbol];
    //console.log(suit)
    const image = document.createElement('img');
    image.classList.add('card_img');
    image.classList.add(`cards_number-${cardsNumber}`);
    image.classList.add(`cards_number-${cardsNumber}-hover`);
    image.src = `/img/${suit}${rank}.png`;
    // Карты кладутся на стол в зависимости от их количества, если я правильно понимаю
    // что pass это те карты которые сейчас в игре???
    image.addEventListener('click', () => {
        passes?passesMapping[passes](image):'';
        image.style.top = '-256px';
        image.classList.remove(`cards_number-${cardsNumber}-hover`);
        image.style.transform = 'none';
    });
    container?container.appendChild(image):null;
};

const renderBackCard = (container, className) => {
    const image = document.createElement('img');
    image.classList.add('card_img');
    image.classList.add(className);
    image.src = '/img/card-back.png';
    container?container.appendChild(image):null;
};

const renderCards =async(player, container, current, passes) => {
    const cardsNumber = player.length;
    current ?await player.forEach((card) =>  renderCard(card, container, cardsNumber, passes)) :
    await player.forEach(() =>  renderBackCard(container, `cards_number-${cardsNumber}`));
}

const renderPlayerRoles = (players, attacker, defender) => {
    for (let i = 0; i < players.length; i += 1) {
        const playerRoleTextEl = document.querySelector(`.player${i}-role`);
        let a=((attacker[0][0]===players[i][0][0])&&(attacker[0][1]===players[i][0][1]))
        let b=((defender[0][0]===players[i][0][0])&&(defender[0][1]===players[i][0][1]))
        console.log( a)
        if (a) {
            playerRoleTextEl.textContent = 'attacker';
        } else if (b){
            playerRoleTextEl.textContent = 'defender';
        }
    }
};

const renderPlayersNames = () => {
    for (let i = 0; i < 4; i += 1) {
        const playerNameTextEl = document.querySelector(`.player${i}-name`);
       
        playerNameTextEl.textContent = `player${i}`;
    }
};

const renderDeck = (deck) => {
    const lastCard = deck[deck.length - 1];
    //console.log(lastCard)
    const container = document.querySelector('.deck_flex');
    renderCard(lastCard, container, 'lastCard');
    deck.forEach(() => renderBackCard(container, 'deck_card'));
    const deckCards = document.querySelectorAll('.deck_card');
    //let i = 0;
    deckCards.forEach((image,index) => {
        image.style.top = `${index * 2}px`;
       // i += 1;
    });
};

const renderPlayerCards =async (players, currentPlayer, passes) => {
    //let i = 0;
    players.forEach((player,index) => {
        const playerCardsDiv = document.querySelector(`.player${index}CardsContainer`);
       
       // i += 1;
        //console.log(i)
        player === currentPlayer ? renderCards(player, playerCardsDiv, true, passes) :
        renderCards(player, playerCardsDiv, false, passes)
    })

}

const render =async (response) => {
    let r=response;
    const  [players_count, deck, active_suit, attacker, defender, players, suits, ranks, passes,target] = [r.players_count, r.deck, r.active_suit, r.attacker, r.defender, r.players, r.suits, r.ranks, r.passes,r.target];

    // Рисуем карты игроков
  await renderPlayerCards(players, players[target],passes);
//console.log(players[0])
    // Рисуем колоду
     renderDeck(deck);

    // Рисуем роли
     renderPlayerRoles(players, attacker, defender)

    // Рисуем имена игроков
     renderPlayersNames();

};

var ws;


//ws.addEventListener('message',router)
//function router(e){let data=JSON.parse(e.data);console.log(data)}




const start_game=document.getElementById('start_game')
start_game.addEventListener('click',function(e){ws.send(JSON.stringify({
    type: "start"
}))})


var id_prosses=null;
console.log(id_prosses);

//console.log(start_game)
async function connect() {
  ws = new WebSocket('ws://localhost:8765');
  ws.onopen = function() {
    
    // subscribe to some channels
    ws.send(JSON.stringify({
        type: "hi"
    }));
  };


  ws.onmessage = async function(e) {
    //console.log('Message:', e.data);
 let response = JSON.parse(e.data);
 //console.log(response)
    if((response.id&&id_prosses===null)){id_prosses=response.id; console.log(response);}
    
    if(!response.id&&id_prosses){
       // console.log(response)
    
    await render(response);}
    
  };

  ws.onclose = function(e) {
    id_prosses=null;
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

await connect();
//await render(response);
