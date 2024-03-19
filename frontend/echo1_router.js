


export function router_echo1(e){
	let m={type:"chat",name:"username",id:"8khh55855eee",message:`aaa,Облачные VDS
Легкое, масштабируемое решение. От размещения сайта до  IT-инфраструктуры крупной компании.
от 198 ₽мес,Выбрать тарифКонфигурация: CPU 2 Core, 1 GB RAM, 10 GB NVMe, IPv6, без опции резервного копирования, при оплате за годcloud aaaat ,ttff, fb, bb`};
let data=JSON.parse(e.data);	
let type=data.type;
console.log(type);	
if(type==="chat"){	
	
this._ChatItems.push(data);this.requestUpdate();

}else
this._ChatItems.push(m);this.requestUpdate();

}