import {html} from 'lit';
import {suitsMapping2}from './static.js';


export function render_deck(){
	let deck=this.deck;
    let t = deck[0];
    const [symbol, rank] = [t[0],t[1]];
    const suit = suitsMapping2[symbol];
    let im=`./img/${suit}${rank}.png`;

  let active_suit= html`<img class="card_img cards_number-lastCard cards_number-lastCard-hover" src=${im}></img>`;
    
    
  //console.log(deck)
  let deckCardsmap = deck.map((m,index)=> {return html`<img class="card_img deck_card" src="./img/card-back.png" style="top:${index * 2}px ;">`});
  deckCardsmap.pop()

return html`${active_suit},${deckCardsmap}`

};