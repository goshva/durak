import {DurakGame,renderDeck,renderPlayerRoles,renderPlayersNames} from '/main.js';

let ws;

var id_prosses;
console.log(id_prosses);

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
const start_game2=document.getElementById('start_game2')
start_game2.addEventListener('click',async function(e){ws===undefined?await connect(2,e):null;})//каждая игра идет на своем path

const start_game3=document.getElementById('start_game3')
start_game3.addEventListener('click',async function(e){ws===undefined?await connect(3,e):null})
const start_game4=document.getElementById('start_game4')
start_game4.addEventListener('click',async function(e){ws===undefined?await connect(4,e):null;})
const stop_game=document.getElementById('stop_game')
stop_game.addEventListener('click',async function(e){
  if(window.confirm("Вы действительно хотите выйти?"))
  {ws!==undefined?ws.close():null;}return 0})

//игра начнеться когда все игроки ткнут соотв-ю кнопку



//console.log(start_game)
async function connect(path,e) {
 let prBar=document.querySelector(".progress-bar")
  e.target.style.backgroundColor='green';
  e.target.textContent='player wait';
  prBar.classList.add('itarget')

ws = new WebSocket(`ws://localhost:8765/${path}`);

 ws.onopen=async function open(e) {

    // subscribe to some channels
    ws.send(JSON.stringify({
        "type": "hi",
    }));


    sent(path)
    
  };


  ws.onmessage= async function message (e) {
    //console.log('Message:', e.data);
 let response = JSON.parse(e.data);
 //console.log(response)
 //console.log(response.deck_id)
    if((response.id&&!id_prosses)){id_prosses=response.id;console.log(id_prosses);
      //sent(path)

    }
    
    if((response?.deck_id)&&id_prosses){
     console.log(response.deck_id)
    await rendersock(response);}
    if(response.connect){let n=Number(response.connect);let buttons=[start_game2,start_game3,start_game4]
    buttons.forEach((i,index)=>{if(index===(n-2)){i.textContent=`PLAYERS${n}`;i.style.color='#3bff67';prBar.classList.remove('itarget')}i.setAttribute('disabled',true)})
    }
    
  };

  ws.onclose= async function close(e) {
    id_prosses=null;
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);

    setTimeout(function() {

      connect();
    }, 1000);
  };

 ws.onerror= async function error(err) {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    ws.close();
};

 function sent(path){ws.send(JSON.stringify({
  type: "start",n:`${path}`
}))}

}



//await connect(2)



