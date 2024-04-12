import {html} from 'lit';


export function render_right(right,sp,span_u3){return html`<div  class="right">

 <div id="3count" class="player3CardsContainer">${right}</div>
  <div class="player-title">
    <h4 class="text-h4">
	${sp}
	${span_u3}
      <span class="player3-name textB">${this._pos3}</span>
    </h4>
    <h4 class="text-h4">
      <span class="player3-role textA">${this._role[3]}</span>
    </h4>
  </div>
 

</div>`}
