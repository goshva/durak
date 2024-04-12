import {html} from 'lit';
import {suitsMapping2}from './static.js';

export function images_render(i,p){let e=this._echo;

if((e?.type==="set")&&(e?.id!==this.id)&&(i !==this.target)){

	
	return this.echorender(e,i,p)}
else{
	
	
let nn=(this._myrole==="attacker"||this._myrole==="attacker2");
let n=this.target; 
let pl=this.players.filter((x)=>x!==null);   
let t=pl[n] ;

let target=(pl[i]===t) 
pl[i]=pl[i].filter((x)=>x!==null)
let img=target?pl[n].map((x,i)=>{
let [symbol, rank] = [x[0],x[1]];
let suit = suitsMapping2[symbol];
let im=`./img/${suit}${rank}.png`; 
return html`<img @click=${nn?this.imgclick:this.defclick} class="card_img cards_number-6 cards_number-6-hover r"  data-play="${n}" data-pos="${i}" src =${im}>`})
  :pl[i].map((x,i)=>{return html`<img class="card_img cards_number-6" src="./img/card-back.png">`})


return img;}}
