import {animate ,flyBelow, fade,none} from '@lit-labs/motion'; 
 import { html} from 'lit';

 const suitsMapping2 = {       
    'Ch': "hearts",
    'B': "diamonds",
    'K': "clubs",
    'P': "spades",
};
const A=["-56px","-9px","56px","121px","186px","251px"]; 
  const a = '-250px';
      const fly = [
        [{transform:`translateY(0px)`}],
        [{transform:`translateY(-250px)`}],
        [{transform: `translateY(-250px) `}],
        [{transform: `translateY(${a}) translateX(${a})`}],
      ]; 
	
	
	const logoOptions = () => ({
            keyframeOptions: {	
              duration: 500,
			   fill: 'backwards',
            },
            //in:fly[3] ,
            //out:fly[1],
          });
 
 export function img_render(e,i){
	 	 
    console.log("1+:"+this.cash_back.aktive)
	
 let  j=Number(e.players) 
 let k=Number(e.pos)
 let p1=this.players[j]
 //пушим пары карт
 function sort_card(){let rb;this.cash_back.aktive.forEach((i,index,a)=>{a.splice(index,1);rb=i});
this.cash_back.back.push({one:rb,two:this.players[j][k]}) };
console.log(this.cash_back.back)
if(e.id===this.id){return}
if(i===this._pos0){return}
 else{
	//console.log(this._myrole) 
   let xx=(e.role==='defender')//если мсг от кроющ
this.passes=e.passes;
let ps=e.passes;
    this.cash[j][k]=this.players[j][k];
   !xx?this.cash_back.aktive.push(this.players[j][k]):sort_card.call(this)//пушим пары карт
    console.log("2+:"+this.cash_back.aktive)
    console.log(this.cash_back.aktive);
	console.log(this.cash_back.back);
     this.players[j].splice(k,1,null)   
    let a=p1.map((x,i)=>{if(x!==null) return html`<img class="card_img cards_number-6" style="top:0px;" src="./img/card-back.png">`;});
	 
    let c=this.cash[j].map((x,i)=>{if(x!==null){
    let [sym, ra] = [x[0],x[1]];
    let suit = suitsMapping2[sym];
    let img=`./img/${suit}${ra}.png`; 
    return html`<img class="card_img cards_number-6 " 
	${animate(logoOptions(i))}
	style="transform:translateY(-250px);left:${A[(i===x.length-1)?ps:(ps===1)?ps:i]};"
	src =${img}>` }})
	/* let schet=0;  
	 let csc=this.cash_back.aktive.map((x,i)=>{if(x!==null){
		schet+=1; 
    let [sym, ra] = [x[0],x[1]];
    let suit = suitsMapping2[sym];
    let img=`./img/${suit}${ra}.png`; 
    return html`<img class="card_img cards_number-6 " 
	${animate(logoOptions(i))}
	style="transform:translateY(-240px);left:${A[i+schet]};"
	src =${img}>` }})
	
	let sort_c=[];
	
	 this.cash_back.back.forEach((x,i)=>{if(x!==null){
    let [sym, ra,sym1, ra1] = [x.one[0],x.one[1],x.two[0],x.two[1]];
    let suit = suitsMapping2[sym];
	let suit1 = suitsMapping2[sym1];
    let img=`./img/${suit}${ra}.png`;
    let img1=`./img/${suit1}${ra1}.png`;	
    let a_img= html`<img class="card_img cards_number-6 " 
	${animate(logoOptions(i))}
	style="transform:translateY(-250px);left:${A[i+schet]};"
	src =${img}>` 
	
let b_img= html`<img class="card_img cards_number-6 " 
	${animate(logoOptions(i))}
	style="transform:translateY(-280px);left:${A[i+schet]};"
	src =${img1}>` 
	
	sort_c.push(a_img);sort_c.push(b_img);
	
	}})*/
	
	
	
	
	
 //style="transform:translate(${A[ps]},-250px)"
 //${A[ps+1===i?ps:i]}   
return html`${a}${c}`};
};