import {html} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';




export function render_modalOne(){

const modalOne = this.hideCompleted?html`
 
	
<div class="col-sm-3" style="display:inline;"><i @click=${this.clickHandler} id="stop" style="display:flex;">+</i>	


<div class="form"><form  action='/loginHome', method='POST'><label for="username">you username</label><input @input=${this.in_user} type='text' name='username' class='form-control form hform' placeholder='Name' required autofocus><input @input=${this.in_pwd} type='password' name='password' class='form-control form hform' placeholder='Password' required><div style="display:flex;"><input class='form bform' type='reset' value='RESET'><input @click=${this.ch} class='form bform' type='button' value='SAVE'></div></form></div></div>`:null;
return modalOne}





export function render_modalTwo(){
let p_p=this.autch_message?html`<p class='form bform'>${this.autch_message}</p>`:null;	
	
	
const modalTwo = this.akkountVar?html`<div class="col-sm-3" style="display:inline;"><i @click=${this.clickHandler} id="stop" style="display:flex;">+</i>	

<h1>login with this account</h1>${p_p}
<div class="form"><form  action='/loginHome', method='POST'><label for="username">you username</label><input  type='text' name='username' class='form-control form hform' placeholder='Name' required autofocus value=${this.target.name}><input  type='password' name='password' class='form-control form hform' placeholder='Password' required value=${this.target.password}><div style="display:flex;"><input
@click=${this.account_install}
 class='form bform' type='button' value='ENTER'><input @click=${this.clearone} class='form bform' type='button' data-id='${'e.target.id'}' data-npw=${this.target.index} value='CLEAR'></div></form></div>
</div>`:null;
return modalTwo
}



 
