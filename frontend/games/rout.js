

//надо сделать на 4 игроков?

export function Rout(e){
    if(e.type==="round-count"){return this.newround(k)}//не настроено
    if(e.type==="round-end"){return this.newround(k)}//не настроено
    if(e.type==="round-taks"){

this.konduktor.clearAll();
        this.deck =e.deck ;
        this.players = e.players;
        this.static_role =e.roles 
        this.back =e.deck_back;
		this.cash=e.cach;
        this.passes=0;
		let aa=this.players.map((i)=>{if (i.length===0){return false}})
let new_count=aa.includes(false);if(new_count){this.new_count=true};
console.log(new_count)
 
  this.shadowRoot.querySelectorAll('.cards_number-6').forEach((i)=>{i.style.top='0px';i.removeAttribute("style")});      
        
        
      //this._round +=1 ;
	  this._echo=e;
	  this._round +=1 ;
if(this.players_count===2){	  
if(e.bito===true && this.players_count===2){this._role.reverse();
if(this._myrole==="defender"){this._myrole="attacker"}
else{this._myrole="defender"}
console.log(this._myrole)
}}
if(this.players_count===3){
let m_role=this._myrole;
let m_d=this._myrole==="defender";
let m_a=this._myrole==="attacker";
let m_a2=this._myrole==="attacker2";	
if(e.bito===true ){this._role.forEach((i,index,A)=>{if(m_d&&i==="defender" )
{this._myrole="attacker";A[index]="attacker"}
if(m_d&&i==="attacker" ){A[index]="attacker2"}
if(m_d&&i==="attacker2" ){A[index]="defender"}

if(m_a&&i==="attacker" ){this._myrole="attacker2";A[index]="attacker2"}
if(m_a&&i==="defender" ){A[index]="attacker"}
if(m_a&&i==="attacker2" ){A[index]="defender"}

if(m_a2&&i==="attacker2" ){this._myrole="defender";A[index]="defender"}
if(m_a2&&i==="defender" ){A[index]="attacker"}
if(m_a2&&i==="attacker" ){A[index]="attacker2"}

})

console.log(this._myrole)
}if(e.bito===false ){this._role.forEach((i,index,A)=>{if(m_d&&i==="defender" )
{A[index]="defender"}
if(m_d&&i==="attacker" ){A[index]="attacker2"}
if(m_d&&i==="attacker2" ){A[index]="attacker"}

if(m_a&&i==="attacker" ){A[index]="attacker2";this._myrole="attacker2";}
if(m_a&&i==="attacker2" ){A[index]="attacker"}
if(m_a&&i==="attacker2" ){A[index]="attacker"}

if(m_a2&&i==="attacker2" ){A[index]="attacker";this._myrole="attacker";}
if(m_a2&&i==="attacker" ){A[index]="attacker2"}
if(m_a2&&i==="attacker2" ){A[index]="attacker"}


})

console.log(this._myrole)
}}		  
	  
	  
	  }
    
    }