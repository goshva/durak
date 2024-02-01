import onChange from './node_modules/on-change/index.js';
import render from './view.js';


const app = () => {
    const state = {
        init: false,
        active_suit: '',
        attacker: '',
        deck: '',
        defender: '',
        passes: '',
        players: '',
        players_count: '',
        ranks: '',
        suits: '',
    };

    const watchedState = onChange(state, render(state));

    const playersNumberButtons = document.querySelectorAll('.players_number_button');
    const dialogue = document.querySelector('.players_number_dialogue');
    playersNumberButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const playersNumber = button.dataset.playersNumber;
            fetch(`${playersNumber}.json`)
                .then(response => 
                response.json()
                .then(data => {
                    const { active_suit, attacker, deck, defender, passes, players, players_count } = data;
                    watchedState.active_suit = active_suit;
                    watchedState.attacker = attacker;
                    watchedState.deck = deck;
                    watchedState.defender = defender;
                    watchedState.passes = passes;
                    watchedState.players = players;
                    watchedState.players_count = players_count;
                }))
                .then(() => {
                    dialogue.close();
                    watchedState.init = true;
                })
        })
    })
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
    app(response);

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
app();