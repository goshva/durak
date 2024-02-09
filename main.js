//import {html, render} from '../lit-html/lit-html.js';
import {html, render} from'https://esm.run/lit-html@1';

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
const A=["left:-9px","left:56px","left:121px","left:186px","left:251px"];



export class DurakGame{
    constructor(r,ws){
        let self=this;
        self.ws=ws;//Websockets()
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
        this.imgclick=this.imgclick.bind(this);
        this.echo=this.echo.bind(this);
        this.cash=[Array(6),Array(6),Array(6),Array(6)];//карты в игре
        this.back=[];//отыгравшие карты
       self.ws.onmessage=this.echo;//слушаем сообщения сервера
}

//событие карта на столе
imgclick(e){if( e.target .style.top ==='-256px')return
    
    e.preventDefault

   this.passes?passesMapping[this.passes](e.target):'';
   e.target .style.top = '-256px';
   e.target.classList.remove(`cards_number-${6}-hover`);
   e.target.style.transform = 'none';
  let d= e.target.dataset;
   this.w_m={type:"set","players":d.play,"pos":d.pos,"id":this.id};//отправка рендера всем
   //this.players[d.play].splice(d.pos,1)
   
}
//отправка рендера всем игрокам
set w_m(send){
    this.ws.send(JSON.stringify(send));
}
//обработчик сообщения сервера
async echo(e){ let message=JSON.parse(e.data) ;
(message.type==="set")?await this.echorender(message):null }

//рендер игры 
async echorender(e){
 let  j=Number(e.players) 
 let k=Number(e.pos)
 
this.cash[j][k]=this.players[j][k];
console.log(this.cash);
 this.players[j].splice(k,1,null)
 let p1=this.players[j]
if(e.id===this.id)return
 else { console.log('render')
    let a=p1.map((x,i)=>{if(x!==null) return html`<img class="card_img cards_number-6" src="/img/card-back.png">`;});
    let c=this.cash[j].map((x,i)=>{let [sym, ra] = [x[0],x[1]];
    let suit = suitsMapping2[sym];
    let im=`/img/${suit}${ra}.png`; 
    return html`<img class="card_img cards_number-6 " style="top:-256px;transform:none;${A[i]}"  src =${im}>` })
    let b=document.getElementById(e.id);
render( html`${a}${c}`,b)};

};
    
//стартовый рендер
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
return html`<img @click=${this.imgclick} class="card_img cards_number-6 cards_number-6-hover r" data-play="${n}" data-pos="${i}" src =${im}>`})
  :pl[i].map((x,i)=>{return html`<img class="card_img cards_number-6" src="/img/card-back.png">`})
  let index=Math.abs(i-n)
  index=s.includes(index)?3:index;
  s.push(index)


//console.log(s)
let container= document.getElementById(`${index}count`)
container.id=this.deck_id[i]
render( html`${img}`,container)};
};
s=[];
};

export const renderPlayerRoles = (players, attacker, defender,target) => {
    let s=[];
    for (let i = 0; i < players.length; i += 1) {
        let index=Math.abs(i-target)
        index=s.includes(index)?3:index;
        s.push(index)     
        
        const playerRoleTextEl = document.querySelector(`.player${index}-role`);
        let a=((attacker[0][0]===players[i][0][0])&&(attacker[0][1]===players[i][0][1]))
        let b=((defender[0][0]===players[i][0][0])&&(defender[0][1]===players[i][0][1]))
        //console.log( a)
        if (a) {
            playerRoleTextEl.textContent = 'attacker';
        } else if (b){
            playerRoleTextEl.textContent = 'defender';
        }
    }
    s=[];
};

export const renderPlayersNames = () => {
    for (let i = 0; i < 4; i += 1) {
        const playerNameTextEl = document.querySelector(`.player${i}-name`);
       
        playerNameTextEl.textContent = `player${i}`;
    }
};

export const renderDeck = (deck) => {
    let t = deck[deck.length - 1];
    const [symbol, rank] = [t[0],t[1]];
    const suit = suitsMapping2[symbol];
    let im=`/img/${suit}${rank}.png`;


    //console.log(lastCard)
    const container = document.querySelector('.deck_flex');

  let active_suit= html`<img class="card_img cards_number-lastCard cards_number-lastCard-hover" src=${im}></img>`;
    
    
  //console.log(deck)
  let deckCardsmap = deck.map((m,index)=> {return html`<img class="card_img deck_card" src="/img/card-back.png" style="top:${index * 2}px ;">`})

return render( html`${active_suit},${deckCardsmap}`,container)

};
