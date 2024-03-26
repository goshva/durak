import {animate ,flyBelow, fade,none} from '@lit-labs/motion';
import {styleMap} from 'lit/directives/style-map.js'; 
import { html} from 'lit';
import {suitsMapping2,A,passesMapping}from './static.js';
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
		  

 
 export function img_render(e,i,p_p,rb){

	

if(e.id===this.id){return}
if(i===this._pos0){return}
if(e.type==='round-taks'){return}
 

	
   let xx=(e.role==='defender');//если мсг от кроющ
   let yy=((e.role==='attacker')||(e.role==='attacker2'));//for defender
this.passes=e.passes;


	let a=this.players[i].map((x,i)=>{if(x!==null) return html`<img class="card_img cards_number-6" style="top:0px;" src="./img/card-back.png">`;});
	

let ps=e.passes;	
if(xx){
	console.log(this.cash[i])
	let wm2=this.konduktor.get_wm2();
	let wm1=this.konduktor.get_wm1();
	wm2.set(p_p,rb)
	let y=this.cash[i];
    let c=y.map((x,i,a)=>{if(x!==null){
	
	let ww=(wm2.has(x))?wm1.get(wm2.get(x)):i;
	console.log(ww);	
    let [sym, ra] = [x[0],x[1]];
    let suit = suitsMapping2[sym];
    let img=`./img/${suit}${ra}.png`; 
    return html`<img class="card_img cards_number-6 " 
	
	style="transform:translateY(-250px);
	left:${!ww?A[(i===x.length-1)?ps:(ps===1)?ps:i]:ww};"
	src =${img}
	${animate(logoOptions())} >` }})
	
 return html`${a}${c}`
 }
  
if(yy){
console.log(this.cash[i])	
 //for defender
 let wm3=this.konduktor.get_wm3();
 
 let y=this.cash[i];
    let c=y.map((x,i,a)=>{if(x!==null){
	let ww=(wm3.get(x))?wm3.get(x):null	
	//console.log(wm3.get(x));
	//console.log(ww);	
    let [sym, ra] = [x[0],x[1]];
    let suit = suitsMapping2[sym];
    let img=`./img/${suit}${ra}.png`; 
    return html`<img class="card_img cards_number-6 " 
	
	style="transform:translateY(-250px);
	left:${!ww?A[(i===x.length-1)?ps:(ps===1)?ps:i]:ww};"
	src =${img} 
	${animate(logoOptions())}>` }})
	
 
	
 return html`${a}${c}`
}
 
 };
