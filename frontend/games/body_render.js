export function Render(html,styleMap){
	let [p_0,p_1,p_2,p_3]=[this._pos0,this._pos1,this._pos2,this._pos3]; 
 
	let a=(this.passes===0);
	let eho=(this._echo?.type==="round-taks");
const styles=function(a,b,c){let s= {transform:`rotatez(${a}deg) translateY(${b}px) translateX(${c}px)`,
	backgroundColor:'#673AB7',width:'fit-content'};
	return s };	
const styl=function(a,b,c){let s= {transform:`rotatez(${a}deg) rotatex(${1}deg) translateY(${b}px) translateX(${c}px)`};
	return s };		
	
let span_1=html`<span class="mod mod1" style=${styleMap(styl(359,51,67))} >я хожу</span>`;
let span_2=html`<span class="mod mod1" style=${styleMap(styl(359,51,67))}>я кроюсь</span>`;
let span_u0=html`<span class="mod1" style=${styleMap(styles(0,51,67))}>${this.usernames[p_0]}</span>`;
let span_u1=html`<span class="mod1" style=${styleMap(styles(0,26,67))}>${this.usernames[p_1]}</span>`;
let span_u2=html`<span class="mod1" style=${styleMap(styles(0,52,73))}>${this.usernames[p_2]}</span>`;
let span_u3=html`<span class="mod1" style=${styleMap(styles(0,52,67))}>${this.usernames[p_3]}</span>`;
	 
function span_atr(x){let a=(x==="attacker")?span_1:(x==="defender")?span_2:null;return a};	 
	 
 let ix_text=(this._role[0]==="attacker")?"ваш ход":(this._role[0]==="attacker2")?"подкидывай карты":"вам крыться";
 let iy_text=(this._role[0]==="attacker")?"бито":(this._role[0]==="attacker2")?"бито":"беру";
let span_0=html`<span @click=${this.taks} class="mod" style="bottom:32px;left: 104%;position: relative;">${!a?iy_text:ix_text}</span>`;
let[p_p,rb]=this._echo?.type&&!eho?this.prerender():[null,null];	
let n=this.players_count;	
let left=(n>=3)?this.Img(this._pos2):null;
let right=(n===4)?this.Img(this._pos3):null;
let header=this.Img(this._pos1);
let footer=a||eho?this.Img(this._pos0):this.foo;//сохранить чтобы не рендерить себя до конца раунда
a||eho?this.foo=footer:null;

let section=this.renderDeck();
let b_ack=this.b_ack;//когда кончиться колода отобразить козыря

const body= html`<div class=super>
${n>=3?this.left(left,span_atr(this._role[2]),span_u2):null}
 ${n===4?this.right(right,span_atr(this._role[3]),span_u3):null}
 
<div class="field">
<header  class="header">
<div class="player1_container">
<div id="1count" class="player1CardsContainer"><div  id=${this.deck_id[this._pos1]}>${header}</div></div>
<h4 class="text-h4"style="top: -69px;
    position: relative;">
${span_atr.call(this,this._role[1])}
${span_u1}
<span class="player1-role textA">${this._role[1]}</span>
</h4>
<h4 class="text-h4">
<span class="player1-name textB">${this._pos1}</span>
</h4>
</div>
</header>
<section class="content">
<div class="deck_flex">
${section??b_ack}
</div>
<div class="table_grid"></div>
<div class="deck_flex"></div>
</section>
<footer  class="footer">
<div class="player0_container">
<h4 class="text-h4">
${span_u0}
<span class="text-dark player0-name textB">${this._pos0}</span>
</h4>
<h4 class="text-h4">
<span class=" player0-role textA">${this._role[0]}</span>
</h4>${span_0}
<div id="0count" class="player0CardsContainer"><div  id=${this.deck_id[this._pos0]}>${footer}</div></div>
</div>
</footer>
</div></div>`

return body;
};
