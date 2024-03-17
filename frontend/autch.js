
 import {vebcss} from './css/autch.css.js';
 import {LitElement,html,css} from 'lit';

export const ws_player={};
 
  
 class BordCount extends LitElement { 
 
 static properties = {
	 Chat:{type:Boolean},
	 _ChatItems:{tipe:Array},
    _listItems:{tipe:Array},
    hideCompleted:{type:Boolean},
	akkountVar:{type:Boolean}
  };
  static styles =vebcss; 

  constructor() {
	  super()
	this.akkountVar=false;
this.hideCompleted=false;	
this._listItems=this.action;
this._ChatItems=[1];
this.Chat=false;
window.addEventListener("message",(event)=>this.ws_plinstall.call(this,event))//если вкл игру отключить порт/5

this.connect();
this.echo=this.echo.bind(this);
this.echo1=this.echo1.bind(this);  
  }
 ws;//порт/5
 ws1;//порты игры

echo(me){let e=JSON.parse(me.data)
//{"type": "autorisation", "token": "5chdRAe7ZUfSevp0"}
if(e.type=="autorisation" && e.token){let l_i=localStorage.getItem(e.index)
let x=JSON.parse(l_i);x.token=e.token;let y=JSON.stringify(x);
console.log(e.index)
console.log(x)
//localStorage.removeItem(e.index)
localStorage.setItem(e.index,y);	
}


 ;}



 
  
 ackount={name:undefined,password:undefined,index:undefined,token:undefined}; 
  
  echo1(e){console.log(e.data);this._ChatItems.push(JSON.parse(e.data));this.requestUpdate();}
  
async connect(){let user="btn-pw1"; this.ws= await connekt(user)
this.ws.onmessage=this.echo; 
}

async ws_plinstall(ev){this.ws1=ws_player.ws ;this.ws1.addEventListener("message",this.echo1);
if(this.ws !==undefined){this.ws.close();}
 }  
  
  
get action(){let arr=[];  for(let i=1;i<=3;i++){
	
	var xx=localStorage.getItem('btn-pw'+i);
	
	var x=arr.push(JSON.parse(xx));
}return arr;};

get target(){return this.ackount};

get Storage(){let t=this._listItems;for(let item=0; item<=t.length-1;item++){if(t[item]!==null){let x=JSON.stringify(t[item]);  localStorage.setItem('btn-pw'+(item+1),x);this.clickHandler()}else    return 0}};

 
set target(val){var xx=localStorage.getItem(val);
	
var x=JSON.parse(xx)??null;this.ackount.token=x?.token;    this.ackount.index=val;  this.ackount.name=x?.name;this.ackount.password=x?.password;if(this.ackount.name){return}else this.hideCompleted=true;this.akkountVar=false };

  
  sset(e){  this.akkountVar=true,this.target=e.target.dataset.npw};
  
  ackount_set(){this.hideCompleted=true;};
  
clickHandler(){this.akkountVar=false;
this.hideCompleted=false; this.ackount={name:'',password:'',index:''};     return null};

clickHandler_Chat(){(this.Chat===false)?this.Chat=true:this.Chat=false;};
  
 clearone(e){let cw=this.target.index;
localStorage.removeItem(cw);let k=this._listItems.findIndex(i=> i?.index===cw);console.log(k)
this._listItems[k]=null;        return this.clickHandler() }; 
  
 in_pwd(e){
  
 
   
  this.ackount.password=e.target.value;
  };
 
 in_user(e){
  
 
   
  this.ackount.name=e.target.value;
  };
  
  
 
 ch(){let t=this._listItems;   if(this.ackount.name){for(let item=0; item<=t.length-1;item++){if(t[item]===null){this.ackount.index='btn-pw'+(item+1);   t[item]= this.ackount; return this.Storage}  }
	 
 //this._listItems
 
 } }
 
 account_install(e){
if(this.target.token===undefined){	 
let data={type:"init-user",user:this.target.name,password:this.target.password,index:this.target.index}	 
	 this.ws.send(JSON.stringify(data));
}
	 
	 
 }
 
  
   render(){
	 
const modalOne = this.hideCompleted?html`
 
	
<div class="col-sm-3" style="display:inline;"><i @click=${this.clickHandler} id="stop" style="display:flex;">+</i>	


<div class="form"><form  action='/loginHome', method='POST'><label for="username">you username</label><input @input=${this.in_user} type='text' name='username' class='form-control form hform' placeholder='Name' required autofocus><input @input=${this.in_pwd} type='password' name='password' class='form-control form hform' placeholder='Password' required><div style="display:flex;"><input class='form bform' type='reset' value='RESET'><input @click=${this.ch} class='form bform' type='button' value='SAVE'></div></form></div></div>`:null;

const modalTwo = this.akkountVar?html`<div class="col-sm-3" style="display:inline;"><i @click=${this.clickHandler} id="stop" style="display:flex;">+</i>	

<h1>login with this account</h1>
<div class="form"><form  action='/loginHome', method='POST'><label for="username">you username</label><input  type='text' name='username' class='form-control form hform' placeholder='Name' required autofocus value=${this.target.name}><input  type='password' name='password' class='form-control form hform' placeholder='Password' required value=${this.target.password}><div style="display:flex;"><input
@click=${this.account_install}
 class='form bform' type='button' value='ENTER'><input @click=${this.clearone} class='form bform' type='button' data-id='${'e.target.id'}' data-npw=${this.target.index} value='CLEAR'></div></form></div>
</div>`:null;

let chat_content=this._ChatItems.map((value)=>
{return html`
    <li ><h3>messege from</h3>
    <span class='u'>one</span>
    <span class='u'>content</span></li>
`})

const modalThree =this.Chat? html`<div class="col-sm-3" style="display:inline;"><i @click=${this.clickHandler_Chat} id="stop" style="display:flex;">+</i>	
<h1>THE CHAT</h1>
<ul class="chat">${chat_content}</ul>
<div class="form"><div><label for="username">Send message</label><input  type='text' name='username' class='form-control form hform' placeholder='Name' required autofocus><div style="display:flex;"><input class='form bform' type='submit' value='SEND'><input @click=${undefined} class='form bform' type='button' data-id='${'e.target.id'}' data-npw=${this.target.index} value='CLEAR'></div></div></div>
</div>`:null;






let xor=(this.hideCompleted||this.akkountVar||this.Chat);

    const items = this._listItems;
	const t=this;

let array_id=['bx','cx','dx'];
const todos =!xor?html`${
items.map(function(item,index){ return item? html`
            <div class='mod'
                id=${array_id[index]} data-npw=${'btn-pw'+(index+1)} @click=${t.sset}
               >${item?.name}
</div>`:null}
)}`:null

let account_set=!xor?html`<div class='mod' id="ax" @click=${t.ackount_set}>another account</div>`:null
let chat=!xor?html`<div class='mod' id="uux" @click=${this.clickHandler_Chat}>The Chat${this._ChatItems.length}</div>`:null
 
 return html`${modalThree}${modalTwo}${modalOne}${account_set}${todos}${chat}${this._ChatItems[-1]?.pos}`;
 
   }
 
 
 
 }
 
 
/*  let o={
    "name": "  q",
    "password": "",
	"token":""
    "index": "btn-pw2"
} */
 
 async function disconnect(ws) {
 this.ws!==undefined?this.ws.close():null;
 }
 
 
 async function connekt(user) {
 let ws = new WebSocket(`ws://localhost:8765/5`);
 
 
 
 var xx=user?localStorage.getItem(`${user}`):undefined;
	
	var data=xx?JSON.parse(xx):undefined;
	//var data=xx?xx:undefined;

 ws.onopen=async function open(e) {
	 
	ws.send(JSON.stringify({
        "type": "hi",
    })); 
	 
	 

    if (data){
		
		
		
    ws.send(JSON.stringify({
        type:"connect-user","autorisation":data.name,token:data.password
    }));


    }
	
	 if (data===undefined){
    ws.send(JSON.stringify({
        type:"connect-user","autorisation":null
    }));


    }
	
	
	ws.onerror= async function error(err) {
    console.error('Socket encountered error: ', err.message, 'Closing socket');
    ws.close();
};
	
    
  };
  return ws;
 
 }
 
 
 
 
 
 
 customElements.define('simple-greeting',BordCount );
 
 
 
 
