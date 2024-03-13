import {LitElement, html,css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {animate ,flyBelow, fade,none} from '@lit-labs/motion';
import {vebcss} from './css/vebcss.js';
import {img_render} from './img_render.js';
import {images_render} from './images_render.js';
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
	 6: (image) => {
        image.style.left = '281px';
    },
	 7: (image) => {
        image.style.left = '301px';
    },
	 8: (image) => {
        image.style.left = '351px';
    },
};
//const A=["left:-9px","left:56px","left:121px","left:186px","left:251px"];
const A=["-56px","-9px","56px","121px","186px","251px"];
//var Av=[];

export const state={};

export class DurakGame extends LitElement{
    static properties = {   //Реактивные свойства 
        _pos0:{type:Number},//позиция юзера игры this.players[this._pos0]
		_pos1:{type:Number},//позиция соответсвует this.players[this._pos1] и.тд
		_pos2:{type:Number},
		_pos3:{type:Number},
		_echo:{players:null},//сообщения сервера
		_role:{type:Array},//роли игроков,если this._pos0,соответсвует this._role[0],(this._pos1 -> this._role[1]).  
		_myrole:'',            //роль юзера
		_round:{type:Number}  //счетчик раундов
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
        this.target =state.r.target ;//позиция юзера this.players[this.target]
        this.id =state.r.id ;//ид юзера
        this.deck_id =state.r.deck_id;
        this.imgclick=this.imgclick.bind(this);
        this.echo=this.echo.bind(this);
        this.taks=this.taks.bind(this);
        this.rout=this.rout.bind(this);
        this.defclick=this.defclick.bind(this);
        this.cash=[ Array(6),Array(6), Array(6), Array(6)];//карты в игре
        this.cash_back={back:[],aktive:[]};//временный обьект для обработки карт
        this.back=[];//отыгравшие карты
        this.ws.onmessage=this.echo; //обработчик сообщений сервера 
	    this._role=[null,null,null,null];
        this._myrole='null';
		this._round=0;
	   this.connect();
	          
}
connect() {
//вычисляем индех чтобы позиция юзера игры всегда находилась внизу	
	let index=this.index();
//вычисляемые позиции игроков	
let pos0=index.findIndex((i)=>i===0);this._pos0=pos0;//настраиваем Реактивные свойства 
let pos1=index.findIndex((i)=>i===1);this._pos1=pos1;
let pos2=index.findIndex((i)=>i===2);this._pos2=pos2;
let pos3=index.findIndex((i)=>i===3);this._pos3=pos3;
let a=[pos0,pos1,pos2,pos3]	
let n=this.players_count;
//вычисляемые роли игроков
//console.log(index)	
//console.log(a)
this._role[0]=(n>=2)?this.role_play(pos0):null;
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
for(let val of this.cash_back.back){this.players[this.target].push(val.one),this.players[this.target].push(val.two)}
 for(let val of this.cash_back.aktive){this.players[this.target].push(val)}
 this.cash_back.back=[] ;     //очистка всех временных полей того кто взял карты
 this.cash_back.aktive=[];
 this.cash=[ Array(6),Array(6), Array(6), Array(6)];           
 this._echo={};      
  this.shadowRoot.querySelectorAll('.cards_number-6').forEach((i)=>i.style.top='0px');      
        
        
        return this._round +=1}//событие взял карты
    
    }
newround(k){console.log(`return this.newround(k)`);
    for(let val of this.cash_back.back){this.players[k].push(val.one),this.players[k].push(val.two)}
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
    let v=a_cards.indexOf(i);// console.log(`v:${v}`)
    a_cards.splice(v,1);
    
    this.cash_back.back.push({one:i,two:my_card});
    ///let w=a_cards.indexOf(my_card);console.log(`w${w}`)
    //a_cards.splice(w,1);
//console.log(this.cash_back.back)
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
//Av.push(e.target);
this.passes+=1;
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
 

   this.w_m={type:"set","players":d.play,"pos":d.pos,"id":this.id,"name":this.name,"deck_id":this.deck_id,"cach":this.cash,"role":this._myrole,"passes":this.passes};//отправка рендера всем
}

}

taks(){//console.log(`taks()`)
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
//Av.push(e.target);
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
  //this.cash_back.back.push(this.players[j][k])
  this.players[j].splice(k,1,null)
 

   this.w_m={type:"set","players":d.play,"pos":d.pos,"id":this.id,"name":this.name,"deck_id":this.deck_id,"cach":this.cash,"role":this._myrole,"passes":this.passes};//отправка рендера всем
}
   
}
left(left,sp){return html`<div  class="left">
<div class="player2_container">
  <div class="player-title">
    <h4 class="text-h4">
      <span class="player2-name textB">${this._pos2}</span>
    </h4>
    <h4 class="text-h4">
      <span class="player2-role textA">${this._role[2]}</span>
    </h4>
  </div>
  <div id="2count" class="player2CardsContainer">${sp}<div id=${this.deck_id[this._pos2]}>${left}</div></div>
</div>
</div>`}

right(right,sp){return html`<div  class="right">
<div class="player3_container">
  <div class="player-title">
    <h4 class="text-h4">
      <span class="player3-name textB">${this._pos3}</span>
    </h4>
    <h4 class="text-h4">
      <span class="player3-role textA">${this._role[3]}</span>
    </h4>
  </div>
  <div id="3count" class="player3CardsContainer">${sp}<div  id=${this.deck_id[this._pos3]}>${right}</div></div>
</div>
</div>`}

//вычисляем индех чтобы позиция юзера игры всегда находилась внизу
index(){
	let s=[];let n=this.target;
for(let i=0;i<=this.players_count-1;i++){
	let index=Math.abs(i-n)
  index=s.includes(index)?this.players_count-1:index;
s.push(index);

}
return s;

}
my_img;//сохранить чтобы не рендерить себя до конца раунда
set foo(foo){this.my_img=foo;};
get foo(){return this.my_img;}
    
// рендер
 render(round){
/* (Av.length!==0)?Av.forEach((e)=>{e.style.top='0px'}):null;Av=[]; */	 
	 let self=this;
	let a=(this._echo?.players!==undefined);
	//console.log(this._echo?.players)
	//console.log(this._round)
	//console.log(this._role)
	//console.log(this._pos1)
//for(let i=0;i<=this.players_count-1;i++){this.players[i]=this.players[i].filter((x)=>x!==null)}
let span_1=html`<span class="mod mod1">я хожу</span>`;
let span_2=html`<span class="mod mod1">я кроюсь</span>`;	 
function span_atr(x){let a=(x==="attacker")?span_1:(x==="defender")?span_2:null;return a};	 
	 
 let ix_text=(this._role[0]==="attacker")?"ваш ход":(this._role[0]==="attacker2")?"подкидывай карты":"вам крыться";
 let iy_text=(this._role[0]==="attacker")?"бито":(this._role[0]==="attacker2")?"бито":"беру";
let span_0=html`<span @click=${this.taks} class="mod">${a?iy_text:ix_text}</span>`;
	
let n=this.players_count;	
let left=(n>=3)?this.Img(this._pos2):null;
let right=(n===4)?this.Img(this._pos3):null;
let header=this.Img(this._pos1);
let footer=!a?this.Img(this._pos0):this.foo;//сохранить чтобы не рендерить себя до конца раунда
!a?this.foo=footer:null;
//let footer=this.Img(this._pos0)
let section=this.renderDeck();

return html`<div class=super>
${n>=3?this.left(left,span_atr(this._role[2])):null}
 ${n===4?this.right(right,span_atr(this._role[3])):null}
 
<div class="field">
<header  class="header">
<div class="player1_container">
<div id="1count" class="player1CardsContainer">${span_atr.call(this,this._role[1])}<div  id=${this.deck_id[this._pos1]}>${header}</div></div>
<h4 class="text-h4">
<span class="player1-role textA">${this._role[1]}</span>
</h4>
<h4 class="text-h4">
<span class="player1-name textB">${this._pos1}</span>
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
<span class="text-dark player0-name textB">${this._pos0}</span>
</h4>
<h4 class="text-h4">
<span class=" player0-role textA">${this._role[0]}</span>
</h4>
<div id="0count" class="player0CardsContainer">${span_0}<div  id=${this.deck_id[this._pos0]}>${footer}</div></div>
</div>
</footer>
</div></div>`


};

 Img(i){
return images_render.call(this,i);	 
	 
}
renderDeck(){
	let deck=this.deck;
    let t = deck[deck.length - 1];
    const [symbol, rank] = [t[0],t[1]];
    const suit = suitsMapping2[symbol];
    let im=`./img/${suit}${rank}.png`;

  let active_suit= html`<img class="card_img cards_number-lastCard cards_number-lastCard-hover" src=${im}></img>`;
    
    
  //console.log(deck)
  let deckCardsmap = deck.map((m,index)=> {return html`<img class="card_img deck_card" src="./img/card-back.png" style="top:${index * 2}px ;">`})

return html`${active_suit},${deckCardsmap}`

};
 echorender(e,i){ 
	return img_render.call(this,e,i);
	
};




};

//customElements.define('doom-arhitekt',DurakGame );

//#python -m http.server   localhost:8000/index.html
//#python ws.py