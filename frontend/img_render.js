import {animate ,flyBelow, fade,none} from '@lit-labs/motion'; 
 import { html} from 'lit';

 const suitsMapping2 = {       
    'Ch': "hearts",
    'B': "diamonds",
    'K': "clubs",
    'P': "spades",
};
const A=["-56px","-9px","56px","121px","186px","251px"]; 
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
	 console.log("cash:this.target"+this.cash[this.target])	 
    console.log("1+aktive:"+this.cash_back.aktive)
	console.log("1+back:"+this.cash_back.back)
	
 let  j=Number(e.players); 
 let k=Number(e.pos);
 let p1=this.players[j];
 var p_p=this.players[j][k];
 var i_i=e.broken_card;
 console.log("broken_card:"+i_i)
 console.log("attach_card:"+p_p)
 let rb;
 //пушим пары карт
 function sort_card(){this.cash_back.aktive.forEach((i,index,a)=>{if((i[0]===i_i[0])&&(i[1]===i_i[1])){a.splice(index,1);rb=i;}});
 rb?this.cash_back.back.push({one:rb,two:this.players[j][k]}):null;}

if(e.id===this.id){return}
if(i===this._pos0){return}
if(e.type==='round-taks'){return}
 
let ps=e.passes;	
this.Wm3.set(p_p,A[ps]);//for defender	 
	//console.log(this._myrole) 
   let xx=(e.role==='defender');//если мсг от кроющ
   let yy=((e.role==='attacker')||(e.role==='attacker2'));//for defender
this.passes=e.passes;

    this.cash[j].push(this.players[j][k]);
   yy?this.cash_back.aktive.push(this.players[j][k]):null;//пушим пары карт//for defender
   xx?sort_card.call(this):null;
    console.log("2+aktive:"+this.cash_back.aktive)
	
	//console.log(this.Wm1.get(rb));
    
	console.log("11+back:"+this.cash_back.back)
     this.players[j].splice(k,1,null)   
    let a=p1.map((x,i)=>{if(x!==null) return html`<img class="card_img cards_number-6" style="top:0px;" src="./img/card-back.png">`;});
	console.log("cash:this..cash[j]"+this.cash[j])
	//for attaker
if(xx){
	this.Wm2.set(p_p,rb);
	
	let y=this.cash[j];
    let c=y.map((x,i,a)=>{if(x!==null){
	//console.log(x)	
	//let ww=(x===p_p)?this.Wm1.get(rb):i;
	let ww=(this.Wm2.has(x))?this.Wm1.get(this.Wm2.get(x)):i;
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
 let y=this.cash[j];
    let c=y.map((x,i,a)=>{if(x!==null){
	let ww=(this.Wm3.get(x))?this.Wm3.get(x):null	
	console.log(this.Wm3.get(x));
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
