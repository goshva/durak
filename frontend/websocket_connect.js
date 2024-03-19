 export async function connekt(user) {
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
        type:"connect-user","autorisation":data.name,token:data.token,password:data.password
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
 