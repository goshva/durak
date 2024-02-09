import {DurakGame,renderDeck,renderPlayerRoles,renderPlayersNames} from '/main.js';

let ws;

let rendersock =async (response) => {
    let r=response;
    const  [players_count, deck, active_suit, attacker, defender, players, suits, ranks, passes,target] = [r.players_count, r.deck, r.active_suit, r.attacker, r.defender, r.players, r.suits, r.ranks, r.passes,r.target];

    // Рисуем карты игроков
   //renderPlayerCards(players, players[target],passes,target);
let du=new DurakGame(r,ws);

du.renders();

renderDeck(deck);
    // Рисуем роли
 renderPlayerRoles(players, attacker, defender,target)

    // Рисуем имена игроков
 renderPlayersNames();


};
 

const start_game=document.getElementById('start_game')
start_game.addEventListener('click',function(e){ws.send(JSON.stringify({
    type: "start"
}));this.setAttribute('disabled',true)})


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
 //console.log(response.deck_id)
    if((response.id&&id_prosses===null)){id_prosses=response.id; console.log(response);}
    
    if((response?.deck_id)&&id_prosses){
     console.log(response.deck_id)
     start_game .setAttribute('disabled',true)
    await rendersock(response);}
    
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
