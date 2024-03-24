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
		  
	//const wmdeff = new WeakMap();	  
 
 export function img_render(e,i){

	
 let  j=Number(e.players); 
 let k=Number(e.pos);
 let p1=this.players[j];
 var p_p=this.players[j][k];
 var i_i=e.broken_card;
 console.log("broken_card:"+i_i)
 console.log("attach_card:"+p_p)
 let rb;
 
 function sort_card2(){this.konduktor.get_aktive().forEach((i,index,a)=>{if((i[0]===i_i[0])&&(i[1]===i_i[1])){a.splice(index,1);rb=i;}});
 rb?this.konduktor.set_back(rb,this.players[j][k]):null;}

if(e.id===this.id){return}
if(i===this._pos0){return}
if(e.type==='round-taks'){return}
 
let ps=e.passes;
let wm3=this.konduktor.get_wm3();	

wm3.set(p_p,A[ps])	 
	
   let xx=(e.role==='defender');//если мсг от кроющ
   let yy=((e.role==='attacker')||(e.role==='attacker2'));//for defender
this.passes=e.passes;

    this.cash[j].push(this.players[j][k]);
   
   yy?this.konduktor.set_aktive(this.players[j][k]):null;
   
   xx?sort_card2.call(this):null;
   
	
	
    
	
     this.players[j].splice(k,1,null)
	 
    let a=p1.map((x,i)=>{if(x!==null) return html`<img class="card_img cards_number-6" style="top:0px;" src="./img/card-back.png">`;});
	console.log("cash:this..cash[j]"+this.cash[j])
	//for attaker
if(xx){
	
	let wm2=this.konduktor.get_wm2();
	let wm1=this.konduktor.get_wm1();
	wm2.set(p_p,rb)
	let y=this.cash[j];
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
 //for defender
 let wm3=this.konduktor.get_wm3();
 let y=this.cash[j];
    let c=y.map((x,i,a)=>{if(x!==null){
	let ww=(wm3.get(x))?wm3.get(x):null	
	console.log(wm3.get(x));
	console.log(ww);	
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
