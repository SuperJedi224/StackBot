(function(){
function process(m,u){
if(m.indexOf("@")!=-1&&m.indexOf("@SuperJedi224")==-1)return "";
if(m.indexOf("!")==-1)return "";
var k=/!([A-Za-z])$/g.exec(m);
k=(k||[""])[1];
if(k=="time"){
t=(new Date()).valueOf();
u=60*1000;
v=24*60*u;
v=Math.floor((v-t%v)/u);
return "UTC Time "+t+", "+v+" minutes until UTC midnight";
}
return "";
}

function getUser(el){
while(el.className.indexOf("monologue")<0)el=el.parentNode;
return (el.getElementsByClassName("username")[0]||{}).innerHTML;
}

function post(t,u){
document.getElementById('input').value="(AUTOMATED RESPONSE)"+(u?" @"+u+" ":"")+t;document.getElementById('sayit-button').click()
}


var f=function(){
var a,b,c,k,t,u,v,z;
b=0;
k=null;
z=Array.prototype.slice.call(document.getElementsByClassName('message'),0);
for(a of z){
 c=parseInt(a.id.split("-")[1]);
 b=Math.max(c,b);
 if(b==c)k=a;
}
z=k.getElementsByClassName("content")[0]
if(z){
var user=getUser(z)||"";
var text=process(z.innerHTML,user);
if(text!="")post(text,user);
}
setTimeout(f,900)};f();})()