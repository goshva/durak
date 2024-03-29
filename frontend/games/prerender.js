export function Prerender(A){let e=this._echo;
let j=Number(e.players); 
 let k=Number(e.pos);
 let p1=this.players[j];
  var p_p=this.players[j][k];
 var i_i=e.broken_card;
 console.log("broken_card:"+i_i)
 console.log("attach_card:"+p_p)
 let rb;
function sort_card2(){this.konduktor.get_aktive().forEach((i,index,a)=>{if((i[0]===i_i[0])&&(i[1]===i_i[1])){a.splice(index,1);rb=i;}});
 rb?this.konduktor.set_back(rb,this.players[j][k]):null;}
  let xx=(e.role==='defender');//если мсг от кроющ
   let yy=((e.role==='attacker')||(e.role==='attacker2'));//for defender
   let xx_passive=((this._myrole==='attacker')||(this._myrole==='attacker2'))&& (e?.id!==this.id)
this.passes=e.passes;
   
yy&&(this._myrole==="defender")?this.konduktor.set_aktive(this.players[j][k]):null;
xx?sort_card2.call(this):null;
let ps=e.passes;
let wm3=this.konduktor.get_wm3();	
let wm2=this.konduktor.get_wm2();
wm3.set(p_p,A[ps])
if(xx){wm2.set(p_p,rb)};
if(xx&&!xx_passive){wm2.set(p_p,rb);this.konduktor.set_aktive(this.players[j][k])};
if(xx_passive&&yy){wm2.set(p_p,rb);this.konduktor.set_aktive(this.players[j][k]);
	wm3.set(rb,A[ps])}; 
this.cash[j].push(this.players[j][k]);	
 this.players[j].splice(k,1,null);	
 
 
return [p_p,rb] } 

