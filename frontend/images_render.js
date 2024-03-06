import {html} from 'lit';
const suitsMapping2 = {
    'Ch': "hearts",
    'B': "diamonds",
    'K': "clubs",
    'P': "spades",
};

export function images_render(i){let e=this._echo;

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
let im=`./img/${suit}${rank}.png`; 
return html`<img @click=${nn?this.imgclick:this.defclick} class="card_img cards_number-6 cards_number-6-hover r" style="top:0px" data-play="${n}" data-pos="${i}" src =${im}>`})
  :pl[i].map((x,i)=>{return html`<img class="card_img cards_number-6" src="./img/card-back.png">`})


return img;}}