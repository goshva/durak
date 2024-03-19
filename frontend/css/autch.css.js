import {css} from 'lit';
export const vebcss=css`

 :host {
   display: flex;
 // align-items: center;
  justify-content: space-between;
 border-radius: 8px;
 padding: 8px;
 overflow: hidden;
 border: 4px solid #002071;
 background:#f3b22161 ;
 position:fixed;
 max-width: 490px;
 top:8%;
 right:0;
 flex-direction: column;
 }
 :host .mod{background-color: #9e9e9ebf;
   max-width: 150px;
    min-width:50px;
	margin-top: 14px;
   text-align: center;
  border-radius: 15px;
 	padding: 4px;}
  simple-greeting div:hover{background-color:#27b09abf;padding: 5px;}
 i.stop {
    line-height: 1.5;
    justify-content: center;
    display: inline-flex;
    background-color: rgb(34 219 255);
    font-size: 40px;
    transform: rotate(0.36turn);
    width: 60px;
    border-radius: 50%;
    font-weight: bold;color: #ff5200;}


.col-sm-2{
display:none;
position:fixed;
background-color:#f47836db;
z-index:2;	
font-size: 1.1em;
width: -webkit-fill-available;
top:0;
overflow-y: scroll;
height:95%;


} 
.col-sm-3{margin:0 auto}
 
 
 /* значек выключения меню + */
#stop {
	line-height: 1.5;
    justify-content: center;
    display: inline-flex;
    background-color:rgb(34 219 255) ;
    font-size: 40px;
    transform: rotate(0.36turn);
    width: 60px;
    border-radius: 50%;
	font-weight: bold;
}

#stop:hover {
background-color:rgb(34 319 255) ;	
color:red;
 transform: rotate(0.16turn);	
}
.form{
	
	display:flex;
    margin: 0 auto;
 max-width : 400px;
    padding: 1em;
    border: 2px solid #e91e22;
    border-radius: 1em;
	justify-content: space-around;
}

.i_cons{line-height: 1.5;
    display: inline-flex;
    background-color: rgb(34 219 255);
    font-size: 10px;
    width: 54px;
    border-radius: 50%;
    font-weight: bold;
    height: 54px;
    margin-left: 5px;
    align-items: center;
    justify-content: space-evenly;}
	
.i_cons span {/* font-size: medium; */}	
.icons{display: flex;
    left: 30%;
    position: relative;
    top: -46px;}

.chat{

    margin: 0 auto;
    max-width: 400px;
    padding: 1em;
    border: 2px solid #e91e22;
    border-radius: 1em;
    justify-content: space-around;
   	
overflow: auto;
height:200px;
}

.chat li{
	display: flex;
margin: 0 auto;
    font: 1em sans-serif;
    max-width: 300px;
    box-sizing: border-box;
    border: 1px solid #999;
    min-height: 41px;
    width: -webkit-fill-available;
    margin-top: 15px;
flex-wrap: wrap;	
}
 .chat li h3{
    font-size: small;
    margin-top: 1px;
}
.chat li span{
    font-size: medium;
    margin-top: 1px;
	margin-left: 10px;
}
.chat li span.u{
   color: black;
    background-color: #00f3ff;
    padding: 10px;
    width: fit-content;
    font-size: 20px;
    font-weight: bold;
    overflow: auto;
    max-height: 100px;
}


   .form div + div {
        margin-top: 1em;
    }

label {
    display: inline-block;
 //width : 90px;
    text-align: left;
}

input {
    font: 1em sans-serif;
    max-width: 300px;
    box-sizing: border-box;
    border: 1px solid #999;
	    min-height: 60px;
}

    input:focus, textarea:focus {
        border-color: #000;
    }

textarea {
    vertical-align: top;
    height: 5em;
}

.hform:hover{background-color:rgb(34 319 255) ;	
color:red;}
.bform:hover{background-color:rgb(34 319 255) ;	
color:red;}

.menu1{position: fixed;
  right: 0;
  top: 2px;
  max-width: 200px;
  border: 1px #aaaaaa solid;
  border-radius: 10px;
  background-color: #ffffcc;
  padding: 12px;
  color: #000000;
  font-size: 14px;
  z-index: 1;}
  
 


.hform{background-color: #4131e3;
    text-align: center;}
	
	
	
	`
