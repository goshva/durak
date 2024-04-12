import {animate ,flyBelow, fade,none} from '@lit-labs/motion';
import {styleMap} from 'lit/directives/style-map.js'; 
import { html} from 'lit';
import {suitsMapping2,A,passesMapping}from './static.js';
import {positing}from './positing.js';
 const a = '-250';
  
 const fly = [
        [{transform:`translateY(0px)`}],
        [{transform:`translateY(-250px)`}],
        [{transform: `translateY(-250px) `}],
        [{transform: `translateY(${a}px) translateX(${a}px)`}],
             ]; 
	
	
 const logoOptions = () => ({
            keyframeOptions: {	
              duration: 1000,
			   fill: 'backwards',
            },
            in:fly[3] ,
            out:fly[2],
          });
		  
const styles=function(ww,i,ps,p){
let a=positing[ps-1].top2;
let a_trm=`translateY(${a})`;
let l_trm=ww;
let r_trm=`translateY(${a})`;
let trm=(ww?.length>10)?l_trm:a_trm;
let Left=(ww?.length>10)?A[ps]:`${!ww?A[ps-1]:ww}`
let s={transform:trm,
left:Left,
width: `57px`,}	
return s };	


	  
		  
		  

 
 export function img_render(e,i,p){
if(e.id===this.id){return}
if(i===this._pos0){return}
if(e.type==='round-taks'){return}
let ii=(i===this._pos2)||(i===this._pos3)

function sort(ww,x){
let a=this._a;
let m=[];	

let index=a.map((item,i,r)=>{if((item[0])===(x[0])&&(item[1])===(x[1]))return i}).filter((i)=>i!==undefined)[0]	
positing.forEach((pos,i,as)=>	
{if(ii&&(ww===pos.transform)){m.push(as[index].transform);return }

if(ii&&(ww===pos.left)){ m.push(as[index].transform);return}

if(!ii&&(ww===pos.transform)){ m.push(as[index].left);return}

})
return m.length!==0?m:[ww];
};

this.passes=e.passes;


let back_card=this.players[i].map((x,i)=>{if(x!==null) return html`<img class="card_img cards_number-6" style="top:0px;" src="./img/card-back.png">`;});
	
 
let ps=e.passes;

	
if((this._myrole==='attacker')||(this._myrole==='attacker2')){
	
	let wm3=this.konduktor.get_wm3();
	let wm2=this.konduktor.get_wm2();
	let wm1=this.konduktor.get_wm1();
	let y=this.cash[i];
    let action_card=y.map((x,i,a)=>{if(x!==null){
	
	let sw=(wm2.has(x))?wm1.get(wm2.get(x)):'';
	let ww;
	ww=sw?sort.call(this,sw,wm2.get(x))[0]:wm1.get(x);
	
let var_styl=styleMap(styles(ww,i,ps,p))	
    let [sym, ra] = [x[0],x[1]];
    let suit = suitsMapping2[sym];
    let img=`./img/${suit}${ra}.png`; 
    return html`<img class="card_img cards_number-6 " 
	
	style=${var_styl}
	src =${img}
	${animate(logoOptions())} >` }})
	
 return html`${back_card}${action_card}`
 }
  
if(this._myrole==='defender'){

 let wm3=this.konduktor.get_wm3();
 
 let y=this.cash[i];
    let action_card=y.map((x,i,a)=>{if(x!==null){
	let ww=(wm3.has(x))?wm3.get(x):null	
	
let var_styl=styleMap(styles(ww,i,ps,p))	
    let [sym, ra] = [x[0],x[1]];
    let suit = suitsMapping2[sym];
    let img=`./img/${suit}${ra}.png`; 
    return html`<img class="card_img cards_number-6 " 
	
	style=${var_styl}
	src =${img} 
	${animate(logoOptions())}>` }})
	
 
	
 return html`${back_card}${action_card}`
}


 
 };
