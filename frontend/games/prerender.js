export function Prerender(A){
	
let e=this._echo;
this.passes=e.passes;
let xx=(e.role==='defender');//если мсг от кроющ
let a_a=((e.role==='attacker')||(e.role==='attacker2'));//for defender	
let j=Number(e.players);
let k=Number(e.pos);
var p_p=this.players[j][k];
var i_i=e.broken_card;
let ii=(j===this._pos2)||(j===this._pos3)
let rb;
function sort_card2(){this.konduktor.get_aktive().forEach((i,index,a)=>
{if((i[0]===i_i[0])&&(i[1]===i_i[1])){a.splice(index,1);rb=i;}});
 rb?this.konduktor.set_back(rb,this.players[j][k],this.passes-1):null;
    }; 
let wm3=this.konduktor.get_wm3();	
let wm2=this.konduktor.get_wm2(); 
let wm4=this.konduktor.get_wm4(); 
 
if(this._myrole==="defender"){
 this.konduktor.set_aktive(this.players[j][k])	 
 let ps=e.passes;
 let wm4=this.konduktor.get_wm4();
 ii && p_p?wm3.set(p_p,A[ps-1].transform):null;
 !ii && p_p?wm3.set(p_p,A[ps-1].left):null;
 ii && p_p?wm4.set(p_p,A[ps-1].left):null;//FOR defender	 
	};
	
if(this._myrole==="attacker2" || this._myrole==="attacker"){
 let ps=e.passes;	
 xx?sort_card2.call(this):null;
 
 if(e.role==='defender'){wm2.set(p_p,rb);}
 if(a_a){this._a.push(p_p);
 let lft=!ii?A[ps-1].left:A[ps-1].transform;
this.konduktor.attach(p_p,lft);

 } 
 
	};
	
this.cash[j].push(this.players[j][k]);	
this.players[j].splice(k,1,null); 
//console.log(this.konduktor.get_back())
//console.log(this._a);
return [p_p,rb] } 

