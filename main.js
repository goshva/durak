import {LitElement, html,css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {vebcss} from '/css/vebcss.js';
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

export const state={};

export class DurakGame extends LitElement{
    static properties = {   //Реактивные свойства 
        _pos0:{type:Number},//позиции игроков
		_pos1:{type:Number},
		_pos2:{type:Number},
		_pos3:{type:Number},
		_echo:{players:null},//сообщения сервера
		_role:{type:Array},
		_myrole:'',
		_round:{type:Number}
      };
      static styles =vebcss; 
   constructor(){
        super()
        
        this.name=state.r.name;//id gemes
        this.ws=state.ws;//Websockets()
        this.players_count = state.r.players_count;
        this.deck = state.r.deck;
        this.active_suit = state.r.active_suit;
        this.attacker = state.r.attacker;
        this.defender = state.r.defender;
        this.players = state.r.players;
        this.suits =state.r.suits //['Ch', 'B', 'K', 'P']
        this.ranks =state.r.ranks //['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
        this.passes =state.r.passes;
        this.target =state.r.target ;
        this.id =state.r.id ;
        this.deck_id =state.r.deck_id;
        this.imgclick=this.imgclick.bind(this);
        this.echo=this.echo.bind(this);
        this.taks=this.taks.bind(this);
        this.rout=this.rout.bind(this);
        this.defclick=this.defclick.bind(this);
        this.cash=[ Array(6),Array(6), Array(6), Array(6)];//карты в игре
        this.cash_back={back:[],aktive:[]};
        this.back=[];//отыгравшие карты
        this.ws.onmessage=this.echo;  
	    this._role=[null,null,null,null];
        this._myrole='null';
		this._round=0;
	   this.connect();
	          
}
connect() {
	let index=this.index()
let pos0=index.findIndex((i)=>i===0);this._pos0=pos0;//настраиваем Реактивные свойства 
let pos1=index.findIndex((i)=>i===1);this._pos1=pos1;
let pos2=index.findIndex((i)=>i===2);this._pos2=pos2;
let pos3=index.findIndex((i)=>i===3);this._pos3=pos3;
let a=[pos0,pos1,pos2,pos3]	
let n=this.players_count;
	
this._role[0]=(n!==0)?this.role_play(pos0):null;
this._role[1]=(n>=2)?this.role_play(pos1):null;
this._role[2]=(n>=3)?this.role_play(pos2):null;
this._role[3]=(n>=4)?this.role_play(pos3):null;
//this._myrole=this.role_play[Number(this.target)];
this._myrole=this._role[0];

	 }





 role_play(n){
    //let n=this.target;
    let na=this.attacker;
    let np=this.players;
    let nd=this.defender;
    let a=((na[0][0]===np[n][0][0])&&(na[0][1]===np[n][0][1]))
    let b=((nd[0][0]===np[n][0][0])&&(nd[0][1]===np[n][0][1]))
if(a){  return "attacker"}
if(b){return "defender"}
else{ return "attacker2"} 
}

async task(j,k){
if(this._myrole==="attacker"){return await this.matrix_attacker(j,k)}//ту ли карту дал
if(this._myrole==="attacker2"){return await this.matrix_attacker2(j,k)}//ту ли карту дал
if(this._myrole==="defender"){return await this.matrix_defender(j,k)}//если покрыл /true/

}
//событие сокета 'взял карты '
rout(e){
    if(this._myrole==="attacker"){let k=e.players;   return this.newround(k)}
    if(this._myrole==="attacker2"){let k=e.players;return this.newround(k)}
    if(this._myrole==="defender"){let k=e.players;
for(let val of this.cash_back.back){this.players[this.target].push(val)}
 for(let val of this.cash_back.aktive){this.players[this.target].push(val)}
 this.cash_back.back=[] ;     //очистка всех временных полей того кто взял карты
 this.cash_back.aktive=[];
 this.cash=[ Array(6),Array(6), Array(6), Array(6)];           
 this._echo={};      
  this.shadowRoot.querySelectorAll('.cards_number-6').forEach((i)=>i.style.top='0px');      
        
        
        return this._round +=1}//событие взял карты
    
    }
newround(k){console.log(`return this.newround(k)`);
    for(let val of this.cash_back.back){this.players[k].push(val)}
for(let val of this.cash_back.aktive){this.players[k].push(val)}
this.cash_back.back=[] ;
this.cash_back.aktive=[];
this.cash=[ Array(6),Array(6), Array(6), Array(6)];
this._echo={};
 this.shadowRoot.querySelectorAll('.cards_number-6').forEach((i)=>i.style.top='0px');
return this._round +=1;
//очистка всех временных полей конец раунда
} //событие пусть берет   

//логика атаки
async matrix_attacker(j,k){return true}//добавить обработчик соответствия карт attacker
async matrix_attacker2(j,k){return true}//добавить обработчик соответствия карт attacker2


//логика обороны
async matrix_defender(j,k){
let my_card=this.players[this.target][k];
console.log("3:"+this.cash_back.aktive)
let a_cards=this.cash_back.aktive;

let result=a_cards.map((i,index)=>{
    let e1=(my_card[0]===i[0]);//проверяем соответствие карт
    let e2=this.ranks.indexOf(my_card[1]);
    let e3=this.ranks.indexOf(i[1]);
    let e4=(my_card[0]===this.active_suit);
    let e5=(i[0]!==this.active_suit);
    
    if((e1&&(e2>e3))||(e4&&e5)){
    let v=a_cards.indexOf(i); console.log(`v:${v}`)
    a_cards.splice(v,1);
    
    this.cash_back.back.push(i);
    ///let w=a_cards.indexOf(my_card);console.log(`w${w}`)
    //a_cards.splice(w,1);

    return 'back'}})
console.log(result);
console.log("4:"+this.cash_back.aktive)
if ((result.includes('back'))){return true;}//если все Ок промис труе отправляем сокет с данными
else {return false};
}//если нет карта не двигаетья 




//событие карта на столе
//обработчик клика attacker attacker2 разделил чтобы не запутаться
async imgclick(e){if( e.target .style.top ==='-256px')return
e.preventDefault

let d= e.target.dataset;
let  j=Number(d.play) 
let k=Number(d.pos)
let task=this.task(j,k)
if (await task===true){//если карту покрыл
    let xx=(this._myrole==='defender')  
   this.passes?passesMapping[this.passes](e.target):'';
   e.target .style.top = '-256px';
   e.target.classList.remove(`cards_number-${6}-hover`);
   e.target.style.transform = 'none';
  this.cash[j][k]=this.players[j][k];
  xx?this.cash_back.back.push(this.players[j][k]):this.cash_back.aktive.push(this.players[j][k])//ggg
  this.players[j].splice(k,1,null)
 

   this.w_m={type:"set","players":d.play,"pos":d.pos,"id":this.id,"name":this.name,"deck_id":this.deck_id,"cach":this.cash,"role":this._myrole};//отправка рендера всем
}

}

taks(){console.log(`taks()`)
let a=(this._myrole==='attacker')?0:1;

    this.w_m={type:"set","taks":`${a}`,"players":this.target,"id":this.id,"name":this.name,"deck_id":this.deck_id,"role":this._myrole};

}



//отправка рендера всем игрокам
set w_m(send){
    this.ws.send(JSON.stringify(send));
}
//обработчик сообщения сервера
async echo(e){ let message=JSON.parse(e.data) ;
(message.type==="set"&&!message.taks&&(message.id!==this.id))?this._echo=message:null;//все сообщения кроме взял
((message.type==="set")&&(Number(message.taks)===1))?this.rout(message):null;//событие взял или покрыл
((message.type==="set")&&(Number(message.taks)===0))?this.rout(message):null;
}

//обработчик клика defender
async defclick(e){if( e.target .style.top ==='-256px')return
e.preventDefault

let d= e.target.dataset;
let  j=Number(d.play) 
let k=Number(d.pos)
let task=this.task(j,k)
if (await task===true){//если карту покрыл
   this.passes?passesMapping[this.passes](e.target):'';
   e.target .style.top = '-256px';
   e.target.classList.remove(`cards_number-${6}-hover`);
   e.target.style.transform = 'none';
  this.cash[j][k]=this.players[j][k];
  this.cash_back.back.push(this.players[j][k])
  this.players[j].splice(k,1,null)
 

   this.w_m={type:"set","players":d.play,"pos":d.pos,"id":this.id,"name":this.name,"deck_id":this.deck_id,"cach":this.cash,"role":this._myrole};//отправка рендера всем
}
   
}
left(left){return html`<div  class="left">
<div class="player2_container">
  <div class="player-title">
    <h4 class="text-h4">
      <span class="player2-name">${this._pos2}</span>
    </h4>
    <h4 class="text-h4">
      <span class="player2-role">${this._role[2]}</span>
    </h4>
  </div>
  <div id="2count" class="player2CardsContainer"><div id=${this.deck_id[this._pos2]}></div>${left}</div>
</div>
</div>`}

right(right){return html`<div  class="right">
<div class="player3_container">
  <div class="player-title">
    <h4 class="text-h4">
      <span class="player3-name">${this._pos3}</span>
    </h4>
    <h4 class="text-h4">
      <span class="player3-role">${this._role[3]}</span>
    </h4>
  </div>
  <div id="3count" class="player3CardsContainer"><div  id=${this.deck_id[this._pos3]}></div>${right}</div>
</div>
</div>`}


index(){
	let s=[];let n=this.target;
for(let i=0;i<=this.players_count-1;i++){
	let index=Math.abs(i-n)
  index=s.includes(index)?3:index;
s.push(index)
}
return s;

}
my_img;//сохранить чтобы не рендерить себя до конца раунда
set foo(foo){this.my_img=foo;};
get foo(){return this.my_img;}
    
// рендер
 render(round){
	let a=(this._echo?.players!==undefined);
	console.log(this._echo?.players)
	console.log(this._round)
//for(let i=0;i<=this.players_count-1;i++){this.players[i]=this.players[i].filter((x)=>x!==null)}	 
	 
	 
 let ix=(this._role[0]==="attacker")?"ваш ход(бито)":(this._role[0]==="attacker2")?"подкидывайте карты(бито)":"вам крыться(беру)";
let span=html`<span @click=${this.taks} class="mod">${ix}</span>`;	
let n=this.players_count;	
let left=(n===4)?this.Img(this._pos2):null;
let right=(n>=3)?this.Img(this._pos3):null;
let header=this.Img(this._pos1);
let footer=!a?this.Img(this._pos0):this.foo;//сохранить чтобы не рендерить себя до конца раунда
!a?this.foo=footer:null;
let section=this.renderDeck();

return html`<div class=super>
${n===4?this.left(left):null}
 ${n>=3?this.right(right):null}
 
<div class="field">
<header  class="header">
  <div class="player1_container">
    <div id="1count" class="player1CardsContainer"><div  id=${this.deck_id[this._pos1]}></div>${header}</div>
    <h4 class="text-h4">
      <span class="player1-role">${this._role[1]}</span>
    </h4>
    <h4 class="text-h4">
      <span class="player1-name">${this._pos1}</span>
    </h4>
  </div>
</header>
<section class="content">
  <div class="deck_flex">
   ${section??html`<img src="img/card-back.png" alt="Card back" class="card_img" />`}
  </div>
  <div class="table_grid"></div>
  <div class="deck_flex"></div>
</section>
<footer  class="footer">
  <div class="player0_container">
    <h4 class="text-h4">
      <span class="text-dark player0-name">${this._pos0}</span>
    </h4>
    <h4 class="text-h4">
      <span class=" player0-role">${this._role[0]}</span>
    </h4>
    <div id="0count" class="player0CardsContainer"><div  id=${this.deck_id[this._pos0]}>${span}</div>${footer}</div>
  </div>
</footer>
</div></div>`


};

 Img(i){
let e=this._echo;

if((e?.players!==null)&&(Number(e?.players)===i)&&(e?.id!==this.id)){

//console.log(e);//рендерим только того игрока в зависимости сообщения сокета
	return this.echorender(e,i)}
else{
	
let nn=(this._myrole==="attacker");
let n=this.target; 
let pl=this.players.filter((x)=>x!==null);   
let t=pl[n] ;

let target=(pl[i]===t) 
pl[i]=pl[i].filter((x)=>x!==null)
let img=target?pl[n].map((x,i)=>{
let [symbol, rank] = [x[0],x[1]];
let suit = suitsMapping2[symbol];
let im=`/img/${suit}${rank}.png`; 
return html`<img @click=${nn?this.imgclick:this.defclick} class="card_img cards_number-6 cards_number-6-hover r" style="top:0px" data-play="${n}" data-pos="${i}" src =${im}>`})
  :pl[i].map((x,i)=>{return html`<img class="card_img cards_number-6" src="/img/card-back.png">`})


return img;
}

}
renderDeck(){
	let deck=this.deck;
    let t = deck[deck.length - 1];
    const [symbol, rank] = [t[0],t[1]];
    const suit = suitsMapping2[symbol];
    let im=`/img/${suit}${rank}.png`;

  let active_suit= html`<img class="card_img cards_number-lastCard cards_number-lastCard-hover" src=${im}></img>`;
    
    
  //console.log(deck)
  let deckCardsmap = deck.map((m,index)=> {return html`<img class="card_img deck_card" src="/img/card-back.png" style="top:${index * 2}px ;">`})

return html`${active_suit},${deckCardsmap}`

};
 echorender(e,i){
    console.log("1+:"+this.cash_back.aktive)
 let  j=Number(e.players) 
 let k=Number(e.pos)
 let p1=this.players[j]
 //console.log(this.players);
if(e.id===this.id){return}
if(i===this._pos0){return}
 else{
	console.log(this._myrole) 
   let xx=(e.role==='defender')//если мсг от кроющ

    this.cash[j][k]=this.players[j][k];
   !xx?this.cash_back.aktive.push(this.players[j][k]):this.cash_back.aktive.push(this.players[j][k])
    console.log("2+:"+this.cash_back.aktive)
    //console.log(this.cash);
     this.players[j].splice(k,1,null)   
    let a=p1.map((x,i)=>{if(x!==null) return html`<img class="card_img cards_number-6" style="top:0px;" src="/img/card-back.png">`;});
    let c=this.cash[j].map((x,i)=>{if(x!==null){
    let [sym, ra] = [x[0],x[1]];
    let suit = suitsMapping2[sym];
    let img=`/img/${suit}${ra}.png`; 
    return html`<img class="card_img cards_number-6 " style="top:-256px;transform:none;${A[i]}"  src =${img}>` }})
    
    
return html`${a}${c}`};
};




};

//customElements.define('doom-arhitekt',DurakGame );

//#python -m http.server   localhost:8000/index.html
//#python ws.py
