(function(){
var t;
var bot_user="SJ-9000";
function process(m,user){
if(m.indexOf("@")!=-1&&m.indexOf("@"+bot_user)==-1)return "";
if(m.indexOf("!")==-1)return "";
var k=/!([A-Za-z0-9_]+)/g.exec(m);
k=(k||[""])[1];
if(k=="time"){
t=(new Date()).valueOf();
u=60*1000;
v=24*60*u;
v=Math.floor((v-t%v)/u);
post("UTC Time "+t+", "+v+" minutes until UTC midnight",user);
t=1200;
}
if(k.indexOf("irreg_")==0){
console.log(k);
var i=k.substring(6);
var j=("000"+i).slice(-4);
var url="http://irregularwebcomic.net/comics/irreg"+j+".jpg";
post("http://irregularwebcomic.net/"+k+".html",user);
setTimeout(function(){postRaw(url)},900)
t=1400;
return;
}
return "";
}

function getUser(el){
while(el.className.indexOf("monologue")<0)el=el.parentNode;
return (el.getElementsByClassName("username")[0]||{}).innerHTML;
}

function post(t,u){
 postRaw("(AUTOMATED RESPONSE)"+(u?" @"+u+" ":"")+t)
}

function postRaw(t){
 document.getElementById('input').value=t;document.getElementById('sayit-button').click()
}

var f=function(){
t=400;
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
process(z.innerHTML,user);
}
setTimeout(f,t)};f();setTimeout(_=>post("Bot Loaded."),100);})()