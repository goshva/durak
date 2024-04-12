import {html} from 'lit';



export function render_left(left,sp,span_u2){return html`<div  class="left">

<div id="2count" class="player2CardsContainer">${left}</div>
  <div class="player-title">
    <h4 class="text-h4">
	${sp}
	${span_u2}
      <span class="player2-name textB">${this._pos2}</span>
    </h4>
    <h4 class="text-h4">
      <span class="player2-role textA">${this._role[2]}</span>
    </h4>
  </div>
  

</div>`}
