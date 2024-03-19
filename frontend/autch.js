
 import {vebcss} from './css/autch.css.js';
 import {LitElement,html,css} from 'lit';
import {render_modalOne,render_modalTwo} from './renders.js';
import {render_modalThree} from './chat_render.js';
import{connekt} from './websocket_connect.js';
import{router_echo1} from './echo1_router.js'
export const ws_player={};
 
  
 class BordCount extends LitElement { 
 
 static properties = {
	 _UserNames:{type:Array},
	 _User:{type:String},
	 _Users:{type:Array},
	 _User_chat_active:{type:String},
	 Chat:{type:Boolean},
	 _ChatItems:{type:Array},
    _listItems:{type:Array},
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
this.input_msg=this.input_msg.bind(this);
this.send_msg=this.send_msg.bind(this);
this._Users=[1,2,3];
this._User="User";
this._User_chat_active=""
this._UserNames=[];
  };
  
 _input_msg=""; 
 ackount={name:undefined,password:undefined,index:undefined,token:undefined};  
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
async connect(){let user="btn-pw1"; this.ws= await connekt(user)
this.ws.onmessage=this.echo; 
}


 
target_user(event){this._User_chat_active=event.target.dataset.user;console.log(this._User_chat_active);}

 echo1(e){/* console.log(e.data) */;//this._ChatItems.push(JSON.parse(e.data));this.requestUpdate();
 router_echo1.call(this,e)
 }
  


async ws_plinstall(ev){
this.ws1=ws_player.ws ;this.ws1.addEventListener("message",this.echo1);
if(this.ws !==undefined){this.ws.close();}	
	
if(ev){let e=JSON.parse(ev.data);if(e.install===true && this._listItems[0]){
let u_s=e.users.map((i)=>{if(i!==e.id) return i})
	
this._UserNames=e.usernames;	
this._Users=u_s;
this._User=e.user;	
console.log(this._User)
console.log(this._UserNames)	
//let n=this._listItems[0];	
//let init=JSON.stringify({type:"init",name:n.name});	
//console.log(this._listItems)	
//this.ws1.send(init)	
}};
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
 //закрытие окон 
clickHandler(){this.akkountVar=false;
this.hideCompleted=false; this.ackount={name:'',password:'',index:''};     return null};
//закрытие чата
clickHandler_Chat(){(this.Chat===false)?this.Chat=true:this.Chat=false;};
  //стереть аккаун
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
 
 
 input_msg(e){this._input_msg +=e.target.value;console.log(this._input_msg)}
 send_msg(){let msg={type:"chat",name:this._listItems[0]?.name,id:this._User_chat_active,message:this._input_msg};
 console.log(this._User_chat_active)
 if(this.ws1){
 this.ws1.send(JSON.stringify(msg));}
 this._input_msg='';
 }
 
  //главный рендер компонента
   render(){ 
const modalThree=render_modalThree.call(this);//блок чата
const modalTwo=render_modalTwo.call(this);//блок аккаунтов
const modalOne=render_modalOne.call(this);//блок создания аккаунтов

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
 
 

 
 
 
 
 
 customElements.define('simple-greeting',BordCount );
 
 
 
 
