//import {html, render} from '../lit-html/lit-html.js';
import {html, render} from'https://esm.run/lit-html@1'
export let a=4;

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








class DurakGame{
    constructor(r){
        let self=this;
        self.players_count = r.players_count;
        self.deck = r.deck;
        self.active_suit = r.active_suit;
        self.attacker = r.attacker;
        self.defender = r.defender;
        self.players = r.players;
        self.suits =r.suits //['Ch', 'B', 'K', 'P']
        self.ranks =r.ranks //['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
        self.passes =r.passes;
        self.target =r.target ;
        self.id =r.id ;
        self.deck_id =r.deck_id;
}
imgclick(e){
   this.passes?passesMapping[passes](e.target):'';
   e.target .style.top = '-256px';
   e.target.classList.remove(`cards_number-${6}-hover`);
   e.target.style.transform = 'none';

}








renders(){
    let s=[];
    let n=this.target; 
    let pl=this.players;   
let t=pl[n] ;

for(let i=0;i<=this.players_count-1;i++){
let target=(pl[i]===t) 

let img=target?pl[n].map((x,i)=>{
let [symbol, rank] = [x[0],x[1]];
let suit = suitsMapping2[symbol];
let im=`/img/${suit}${rank}.png`; 
return html`<img @click=${this.imgclick} class="card_img cards_number-6 cards_number-6-hover" data-m="play:${n},nos:${i}"  src =${im}>`})
  :pl[i].map((x,i)=>{return html`<img class="card_img cards_number-6" src="/img/card-back.png">`})
  let index=Math.abs(i-n)
  index=s.includes(index)?3:index;
  s.push(index)


console.log(s)
let container= document.getElementById(`${index}count`)
container.id=this.deck_id[i]
render( html`${img}`,container)};
};
s=[];

};

const renderPlayerRoles = (players, attacker, defender,target) => {
    let s=[];
    for (let i = 0; i < players.length; i += 1) {
        let index=Math.abs(i-target)
        index=s.includes(index)?3:index;
        s.push(index)     
        
        const playerRoleTextEl = document.querySelector(`.player${index}-role`);
        let a=((attacker[0][0]===players[i][0][0])&&(attacker[0][1]===players[i][0][1]))
        let b=((defender[0][0]===players[i][0][0])&&(defender[0][1]===players[i][0][1]))
        console.log( a)
        if (a) {
            playerRoleTextEl.textContent = 'attacker';
        } else if (b){
            playerRoleTextEl.textContent = 'defender';
        }
    }
    s=[];
};

const renderPlayersNames = () => {
    for (let i = 0; i < 4; i += 1) {
        const playerNameTextEl = document.querySelector(`.player${i}-name`);
       
        playerNameTextEl.textContent = `player${i}`;
    }
};

const renderDeck = (deck) => {
    let t = deck[deck.length - 1];
    const [symbol, rank] = [t[0],t[1]];
    const suit = suitsMapping2[symbol];
    let im=`/img/${suit}${rank}.png`;


    //console.log(lastCard)
    const container = document.querySelector('.deck_flex');

  let active_suit= html`<img class="card_img cards_number-lastCard cards_number-lastCard-hover" src=${im}></img>`;
    
    
  console.log(deck)
  let deckCardsmap = deck.map((m,index)=> {return html`<img class="card_img deck_card" src="/img/card-back.png" style="top:${index * 2}px ;">`})

return render( html`${active_suit},${deckCardsmap}`,container)

};



let rendersock =async (response) => {
    let r=response;
    const  [players_count, deck, active_suit, attacker, defender, players, suits, ranks, passes,target] = [r.players_count, r.deck, r.active_suit, r.attacker, r.defender, r.players, r.suits, r.ranks, r.passes,r.target];

    // Рисуем карты игроков
   //renderPlayerCards(players, players[target],passes,target);
let du=new DurakGame(r);
du.renders();

//console.log(players[0])
    // Рисуем колоду
     //renderDeck(deck);
     renderDeck(deck);
    // Рисуем роли
     renderPlayerRoles(players, attacker, defender,target)

    // Рисуем имена игроков
     renderPlayersNames();

};

var ws;


//ws.addEventListener('message',router)
//function router(e){let data=JSON.parse(e.data);console.log(data)}




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
//await render(response);




   
