

export class Konduktor{
	#Wm1;
	#Wm2;
	#Wm3;
	back;
	aktive;
	
constructor(){
this.back=[];

this.aktive=[];

this.#Wm1 = new Map();

this.#Wm2 = new Map();

this.#Wm3 = new Map(); 
	
this.broken_card=this.broken_card.bind(this);
this.set_back=this.set_back.bind(this);
this.attach=this.attach.bind(this);
this.deff=this.deff.bind(this);
this.clearAll=this.clearAll.bind(this);
this.get_aktive=this.get_aktive.bind(this);
this.get_back=this.get_back.bind(this);
this.set_aktive=this.set_aktive.bind(this);
[this.get_wm1,this.get_wm2,this.get_wm3]=[this.get_wm1.bind(this),this.get_wm2.bind(this),this.get_wm3.bind(this)];		
}
broken_card(){console.log('this..broken_card');return(this.back[this.back.length-1])?.one;}//битая карта

atack_card(){console.log('this.atack_card');return(this.back[this.back.length-1])?.two;}//atak карта

set_back(i,my_card){this.back.push({one:i,two:my_card})}


attach(u,lft){this.#Wm1.set(u,lft);this.aktive.push(u);console.log(u)} 

deff(){return this.#Wm3.get(this.broken_card())} 

get_aktive(){return this.aktive}

get_back(){return this.back}

set_aktive(u){this.aktive.push(u)}

get_wm2(){return this.#Wm2}

get_wm3(){return this.#Wm3}

get_wm1(){return this.#Wm1}

clearAll(){
this.#Wm1.clear();
this.#Wm2.clear();
this.#Wm3.clear();
this.back=[];
this.aktive=[]; 
}

}