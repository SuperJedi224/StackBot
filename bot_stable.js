(function(){
function n(k){
if(k=="pi")return Math.PI;
if(k=="phi")return Math.PHI||(1+Math.sqrt(5))/2;
if(k=="e")return Math.E;
return Number(k);
}
var t;
var bot_user="SJ-9000";
function process(m,user){
if(user==bot_user)return;
if(m.indexOf("@")!=-1&&m.indexOf("@"+bot_user)==-1)return;
if(m.indexOf("!")==-1)return;
var k=/!([A-Za-z0-9_.\-]+)/g.exec(m);
k=(k!=null?k:["",""])[1]||"";
console.log(k);
if(k=="time"){
t=(new Date()).valueOf();
u=60*1000;
v=24*60*u;
v=Math.floor((v-t%v)/u);
post("UTC Time "+t+", "+v+" minutes until UTC midnight",user);
return;
}
if(k=="help"){
post("Current commands: !cbrt_*x* !dilbert_*date* !e !help !hoh_*n* !irreg_*n* !ln_*x* !log_*x* !phi !pi !pingme !sqrt_*x* !time\n*n* is an integer literal, *x* is an integer or float literal.\n\"e\", \"pi\", or \"phi\" (sans quotes) may be substituted for any float literal.\nDates should be given in the form YYYY-MM-DD",user);
t=1700;
return;
}
if(k=="pi"){
post(Math.PI,user);
}
if(k=="pingme"){
post("",user);
}
if(k=="phi"){
post(Math.PHI||(1+Math.sqrt(5))/2,user);
}
if(k=="e"){
post(Math.E,user);
}
if(k.indexOf("irreg_")==0){
var i=k.substring(6);
var j=("000"+i).slice(-4);
var url="http://irregularwebcomic.net/comics/irreg"+j+".jpg";
post("http://irregularwebcomic.net/"+k+".html",user);
setTimeout(function(){postRaw(url)},900)
t=2400;
return;
}
if(k.indexOf("sqrt_")==0){
post(Math.sqrt(n(k.substring(5))),user);
}
if(k.indexOf("cbrt_")==0){
post(Math.cbrt(n(k.substring(5))),user);
}
if(k.indexOf("ln_")==0){
post(Math.log(n(k.substring(3))),user);
}
if(k.indexOf("log_")==0){
post(Math.log10(n(k.substring(4))),user);
}
if(k.indexOf("hoh_")==0){
var i=k.substring(4);
var char="Tobi";
if(i<491)char="Noah";
if(i<472)char="Burk";
if(i<459)char="Tobi";
if(i<454)char="Noah";
if(i<450)char="Burk";
if(i<444)char="Intermission";
if(i<441)char="Tobi";
if(i<334)char="Noah";
if(i<222)char="Burk";
var url="http://neorice.com/hoh/"+i+"_"+(char=="Intermission"?"Burk_Noah_Tobi":char)+".png";
post(char+" http://neorice.com/hoh_"+i,user);
setTimeout(function(){postRaw(url)},900)
t=2400;
return;
}
if(k.indexOf("dilbert_")==0){
var url="http://dilbert.com/strip/"+k.substring(8);
console.log(url);
post(url,user);
setTimeout(_=>jQuery.get("https://crossorigin.me/"+url,a=>{postRaw((new RegExp('<img .*?src="(http://assets.amuniversal.com/[a-z0-9]+)".*?>')).exec(a.toString())[1]+".gif")},"html"),900);
t=2400;
}
return;
}

function getUser(el){
while(el.className.indexOf("monologue")<0)el=el.parentNode;
return (el.getElementsByClassName("username")[0]||{}).innerHTML;
}

function post(t,u){
 postRaw("(AUTOMATED RESPONSE) "+(u?"@"+u+" ":"")+t);
}

function postRaw(t){
 document.getElementById('input').value=t;document.getElementById('sayit-button').click()
 t=1600;
}

var f=function(){
t=200;
var a,b,c,k,t,u,v,z;
b=0;
k=null;
z=Array.prototype.slice.call(document.getElementsByClassName('message'),0);
for(a of z){
 c=parseInt(a.id.split("-")[1]);
 b=Math.max(c,b);
 if(b==c)k=a;
}
if(k)z=k.getElementsByClassName("content")[0]
if(z){
var user=getUser(z)||"";
process(z.innerHTML,user);
}
setTimeout(f,t)};f();
setTimeout(_=>{post("Bot Loaded.");console.log("Bot Loaded.")},100);})()