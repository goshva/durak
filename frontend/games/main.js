import {LitElement, html,css} from 'lit';
//import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
//import {animate ,flyBelow, fade,none} from '@lit-labs/motion';
import {vebcss} from '../css/vebcss.js';
import {img_render} from './img_render.js';
import {images_render} from './images_render.js';
import {render_deck} from './render_deck.js';
import {render_right} from './render_right.js';
import {render_left} from './render_left.js';
import {suitsMapping2,A,passesMapping}from './static.js';
import {Konduktor}from './konduktor.js';
import {Rout}from './rout.js';
import {Prerender}from './prerender.js';
import {Render}from './body_render.js';
//import {Render2}from './test.render.js';
//import {vebcss4} from '../css/vebcss4.js';
export const state={};

export class DurakGame extends LitElement{
    static properties = {   //Реактивные свойства 
        _pos0:{type:Number},//позиция юзера игры this.players[this._pos0]
		_pos1:{type:Number},//позиция соответсвует this.players[this._pos1] и.тд
		_pos2:{type:Number},
		_pos3:{type:Number},
		_echo:{},//сообщения сервера
		_role:{type:Array},//роли игроков,если this._pos0,соответсвует this._role[0],(this._pos1 -> this._role[1]).  
		_myrole:'',            //роль юзера
		_round:{type:Number}  //счетчик раундов
      };
      static styles =vebcss;
//static styles =vebcss4;	  
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
		this.static_role=state.r.pl_roles;
		this.usernames=state.r.usernames;
        this.imgclick=this.imgclick.bind(this);
        this.echo=this.echo.bind(this);
        this.taks=this.taks.bind(this);
        this.rout=this.rout.bind(this);
        this.defclick=this.defclick.bind(this);
        this.cash=[[],[],[],[]];//карты в игре
        this.ws.onmessage=this.echo; //обработчик сообщений сервера 
	    this._role=[];
        this._myrole='null';
		this._round=0;
		
	   this.connect();
	  
	          
}
konduktor=new Konduktor();
b_ack;
new_count=false;

connect(e) {
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
this._role[0]=(n>=2)?this.static_role[pos0]:null;
this._role[1]=(n>=2)?this.static_role[pos1]:null;
this._role[2]=(n>=3)?this.static_role[pos2]:null;
this._role[3]=(n>=4)?this.static_role[pos3]:null;
//this._myrole=this.role_play[Number(this.target)];
this._role=this._role.filter((w) => w!==null);
this._myrole=this._role[0];
if(this.players_count===2 && e){this._role.reverse()}
console.log(this.usernames)
let data=JSON.stringify({"install":true,users:this.deck_id,user:this.id,usernames:this.usernames})
window.postMessage(data );

this.b_ack= html`<img src=./img/${suitsMapping2[this?.deck[0][0]]}${this?.deck[0][1]}.png alt="Card back" class="card_img" style="opacity: 0.5;" />`

	 }


async task(j,k){
if(this._myrole==="attacker"){return await this.matrix_attacker(j,k)}//ту ли карту дал
if(this._myrole==="attacker2"){return await this.matrix_attacker(j,k)}//ту ли карту дал
if(this._myrole==="defender"){return await this.matrix_defender(j,k)}//если покрыл /true/

}
//событие сокета 'взял карты или покрыл '
//на 3    надо сделать на 4 игроков?
rout(e){
 Rout.call(this,e);  
   
    }


//логика атаки
async matrix_attacker(j,k){
let a_cards=this.konduktor.get_aktive();
let b_cards=this.konduktor.get_back().map((i)=>{return[i.one,i.two]}).flat();
let a_b=a_cards.concat(b_cards);
console.log(a_b)	
let my_card=this.players[j][k];	
let result=a_b.map((i,index)=>{let e1=(my_card[1]===i[1]);if(e1){return true}})
let p_i=this.passes===0;	
let r_a=result.includes(true);

if (r_a||p_i){return true;}//если все Ок промис труе отправляем сокет с данными
else if(!r_a){return false};	}//добавить обработчик соответствия карт attacker
async matrix_attacker2(j,k){return true}//добавить обработчик соответствия карт attacker2


//логика обороны
async matrix_defender(j,k){
let my_card=this.players[j][k];


let a_cards=this.konduktor.get_aktive();

let result=a_cards.map((i,index)=>{
    let e1=(my_card[0]===i[0]);//проверяем соответствие карт
    let e2=this.ranks.indexOf(my_card[1]);
    let e3=this.ranks.indexOf(i[1]);
    let e4=(my_card[0]===this.active_suit);
    let e5=(i[0]!==this.active_suit);
    
    if((e1&&(e2>e3))||(e4&&e5)){
    let v=a_cards.indexOf(i);// console.log(`v:${v}`)
    a_cards.splice(v,1);
    
    
	this.konduktor.set_back(i,my_card)
 
    return 'back'}})
console.log(result);

if ((result.includes('back'))){return true;}//если все Ок промис труе отправляем сокет с данными
else {return false};
}//если нет карта не двигаетья 




//событие карта на столе
//обработчик клика attacker attacker2 images_render.js
async imgclick(e){
let pss=this.passes;	
let xx=(this._myrole==='attacker2' && !this.new_count)	
if( e.target .style.top ==='-256px')return
if(xx&& pss===0 )return
e.preventDefault
//Av.push(e.target);


let d= e.target.dataset;
let  j=Number(d.play) 
let k=Number(d.pos)
//console.log(e)

let task=this.task(j,k)
if (await task===true){
	this.passes+=1;
   this.passes?passesMapping[this.passes](e.target):'';
   e.target .style.top = '-256px';
   e.target.classList.remove(`cards_number-${6}-hover`);
   e.target.style.transform = 'none';
   e.target.style.zIndex = -1;
   //let ypy= e.target.getBoundingClientRect();
   //console.log(ypy)
   let u=this.players[j][k];
let lft=e.target.style.left;

this.konduktor.attach(u,lft);  

this.cash[j].push(this.players[j][k]);
//console.log(this.cash[j])
 
this.players[j].splice(k,1,null)
 
 

   this.w_m={type:"set","players":d.play,"pos":d.pos,"id":this.id,"name":this.name,"deck_id":this.deck_id,"role":this._myrole,"passes":this.passes,"roles":this._role};//отправка рендера всем
}

}

taks(){let a_cards=this.konduktor.get_aktive().length===0;
let passes=this.passes!==0;
let bool=(this._myrole==='attacker' || this._myrole==='attacker2' )?a_cards&&passes:!a_cards&&passes;
console.log(bool);
if(bool){
if(this.players_count===2){

let a=(this._myrole==='attacker')?this.target:this._pos1;

this.w_m={type:"set","taks":`${a}`,"players":this.target,"id":this.id,"name":this.name,"deck_id":this.deck_id,"role":this._myrole,"roles":this._role};}
else{
let a=(this._myrole==='attacker' || this._myrole==='attacker2' )?this.target:1;//this.sorted_pos();

this.w_m={type:"set","taks":`${a}`,"players":this.target,"id":this.id,"name":this.name,"deck_id":this.deck_id,"role":this._myrole,"roles":this._role};}

}return 0;
 };




//отправка рендера всем игрокам
set w_m(send){
    this.ws.send(JSON.stringify(send));
}
//обработчик сообщения сервера
async echo(e){ let message=JSON.parse(e.data) ;
(message.type==="set"&&!message.taks&&(message.id!==this.id))?this._echo=message:null;//все сообщения кроме взял карты
((message.type==="set")&&(Number(message.taks)===1))?this.rout(message):null;//событие взял или покрыл
((message.type==="set")&&(Number(message.taks)===0))?this.rout(message):null;
(message.type==="round-taks")?this.rout(message):null;
}

//обработчик клика defender images_render.js
async defclick(e){if( e.target .style.top ==='-256px')return
e.preventDefault

let d= e.target.dataset;
let  j=Number(d.play) 
let k=Number(d.pos)


let task=this.task(j,k)
if (await task===true){//если карту покрыл

let broken_card=this.konduktor.broken_card();

   this.passes?passesMapping[this.passes](e.target):'';
   e.target .style.top = '-256px';
   e.target.classList.remove(`cards_number-${6}-hover`);
   e.target.style.transform = 'none';
 let wm3=this.konduktor.get_wm3();  
   e.target.style.left=wm3.get(broken_card);
    //let ypy= e.target.getBoundingClientRect();
   //console.log(ypy)
   
this.konduktor.deff()  
   
  this.cash[j].push(this.players[j][k]);
  
  this.players[j].splice(k,1,null)
 

   this.w_m={type:"set","players":d.play,"pos":d.pos,"id":this.id,"name":this.name,"deck_id":this.deck_id,"role":this._myrole,"passes":this.passes,broken_card:broken_card,"roles":this._role};//отправка рендера всем
}
   
}

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



left(left,sp,span_u2){return render_left.call(this,left,sp,span_u2)};//render left deck

right(right,sp,span_u3){return render_right.call(this,right,sp,span_u3)};//render right deck

renderDeck(){return render_deck.call(this,null)};//render deck deck


my_img;//сохранить чтобы не рендерить себя до конца раунда
set foo(foo){this.my_img=foo;};
get foo(){return this.my_img;}
    



 Img(i){
return images_render.call(this,i);	 
	 
}

 echorender(e,i){ 
	return img_render.call(this,e,i);
	
};


prerender(){return Prerender.call(this,A) } //настраиваем данные перед рендером

// рендер for Render
 render(round){
	 const body=Render.call(this,html,styleMap);
	return html`${body}`;
};

};

//customElements.define('doom-arhitekt',DurakGame );

//#python -m http.server   localhost:8000/index.html
//#python ws.py
