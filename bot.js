(function(){
function n(k){
if(k=="pi")return Math.PI;
if(k=="phi")return Math.PHI||(1+Math.sqrt(5))/2;
if(k=="e")return Math.E;
return Number(k);
}
var t=100;
var bot_user="SJ-9000";
var admin_user="SuperJedi224";

function process(m,user){
user=user.replace(/\u2000B/g,"").replace(/\u2011/g,"-");
if(user==bot_user)return;
if(!m)return;
if(m.indexOf("@")!=-1&&m.indexOf("@"+bot_user)==-1)return;
if(m.indexOf("!")==-1)return;
var k=/!([^ ]+)/.exec(m);
k=(k!=null?k:["",""])[1]||"";
console.log(k);
if(k=="reboot"){
if(user==admin_user){post("Rebooting...");setTimeout(_=>location.reload(true),100);}else{post("You don't have access to admin commands!",user);}
}
if(k=="time"){
t=(new Date()).valueOf();
u=60*1000;
v=24*60*u;
v=Math.floor((v-t%v)/u);
post("UTC Time "+t+", "+v+" minutes until UTC midnight",user);
return;
}
if(k=="help"){
post("Current commands: !cbrt_*x* !darths_*n* !dilbert_*date* !e !help !hi !hoh_*n* !irreg_*n* !ln_*x* !log_*x* !phi !pi !pingme !roll_*dice* !sqrt_*x* !time\n*n* is an integer literal, *x* is an integer or float literal.\n\"e\", \"pi\", or \"phi\" (sans quotes) may be substituted for any float literal.\nDates should be given in the form YYYY-MM-DD, dice in algebraic dice notation\nFor unit conversion, type !convert_*quantity* to:*unit*",user);
t+=200;
return;
}
if(k=="hi"){
post("Hello!",user);
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
post("http://irregularwebcomic.net/"+i+".html",user);
setTimeout(function(){postRaw(url)},1000)
t=4000;
return;
}
if(k.indexOf("ytp_")==0){
var j=k.substring(4);
post("",user);
jQuery.get("http://crossorigin.me/https://www.youtube.com/playlist?list="+j,a=>{
var q=a.toString().match(/<a.+?href="\/watch.+?"/g);
q=q[q.length*Math.random()];
q=/href="(.+?)(&.+?)?"/.exec(q);
setTimeout(_=>postRaw(q?"http://youtube.com"+q[1]:"error"),500);
})
t=4200;
}
if(k.indexOf("darths_")==0){
var i=k.substring(7);
var j=("000"+i).slice(-4);
var url="http://darthsanddroids.net/comics/darths"+j+".jpg";
post("http://www.darthsanddroids.net/episodes/"+j+".html",user);
setTimeout(function(){postRaw(url)},1000)
t=4000;
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
var char="Burk";
if(i<505)char="Tobi";
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
setTimeout(function(){postRaw(url)},1000)
t=4000;
return;
}
if(k.indexOf("roll_")==0){
post(parseDice(k.substring(5)),user);
}
if(k.indexOf("convert_")==0){
var s=k.substring(8);
var amt=parseInt(/\d+/.exec(s)[0]);
var unit=(/\D+/.exec(s)||[""])[0];
var to=(/to:([a-zA-Z]+)/.exec(m)||[])[1];
post(convert(amt,unit,to),user);
}
if(k.indexOf("dilbert_")==0){
var url="http://dilbert.com/strip/"+k.substring(8);
post(url,user);
setTimeout(_=>jQuery.get("https://crossorigin.me/"+url,a=>{postRaw((new RegExp('<img .*?src="(http://assets.amuniversal.com/[a-z0-9]+)".*?>')).exec(a.toString())[1]+".gif")},"html"),900);
t=4000;
}
return;
}
function parseDice(dice){try{var sides=0,number=1,keep=0,explode=0;
if(dice[0]=='d')dice="1"+dice;
console.log(dice);
number=parseInt(/\d+/.exec(dice)[0]);
var i=dice.indexOf("d");
sides=parseInt(/\d+/.exec(dice.substring(i))[0]);
keep=number;
i=dice.indexOf("k");
if(i!=-1)keep=parseInt(/\d+/.exec(dice.substring(i))[0]);
if(keep>number||number>1e7)return "error";
if(dice.indexOf("^")!=-1)explode=1;
var v=[];
for(i=0;i<number;i++)v.push(roll(sides,explode));
v.sort(function(a, b){return a-b});
var s="("+v.toString()+")";
var q=0;
for(i=0;i<keep;i++)q+=v.pop();
return s.length>300?q:q+" "+s;
}catch(e){console.log(e.toString());return "error"}
}
var conversions=[
{m:1,cm:0.01,in:0.0254,mm:0.001,ft:0.3048,yd:0.9144,km:1000,mi:1609,um:1e-6,micron:1e-6,nm:1e-9,pm:1e-12,au:1.49578e11,Tm:1e12,pt:0.0003527,rod:5.0292,chain:20.1168,furlong:201.168,fathom:1.8288,angstrom:1e-10,pc:3.085678e16},
{s:1,ms:0.001,us:1e-6,ns:1e-9,min:60,hr:3600,d:86400,yr:31556926},
{ug:1e-9,mg:1e-6,g:0.001,ug:1e-9,mcg:1e-9,ng:1e-12,kg:1,lb:0.4539,ton:907.185,tonne:1000,ktonne:1e6,amu:1.6605e-24},
{W:1,hp:745.6999,kW:1000,MW:1e6,GW:1e9,TW:1e12,mW:1e-3},
{N:1,dyne:1e-5,lb:4.4482,lbf:4.4482,mN:0.001,kN:1000},
{J:1,erg:1e-7,kJ:1000,MJ:1e6,mJ:1e-3,GJ:1e9,TJ:1e12,foe:1e44,eV:1.602e-19,keV:1.602e-16,meV:1.602e-22,MeV:1.602e-13,GeV:1.602e-10,TeV:1.602e-7},
{L:1,l:1,mL:0.001,ml:0.001,cc:0.001,ul:1e-6,gal:3.78,oz:0.0296,c:0.2366,pt:0.4732,qt:0.94635},
{sqm:1,sqft:0.0929,square:9.2903,sqcm:1e-4,sqyd:0.8362,acre:4046.86,a:100,ha:1e4,sqkm:1e6,sqmi:2589988,sqmm:1e-6,nacre:4.046e-6,barn:1e-38}
];
function convert(x,f,t){
console.log(f+" "+t);
if(!f)return x+" is dimensionless.";
if(!t)return "error: must specify target unit.";
for(var ent of conversions)if(ent[f]&&ent[t])return x+" "+f+"="+(x*ent[f]/ent[t])+" "+t;
return "error: conversion failed.";
}
function roll(sides,exploding){
if(sides<2)return sides;
var v=0,s=0;
do{s=1+sides*Math.random();s|=0;v+=s;}while(exploding&&s==sides);
return v;
}
function getUser(el){
while(true){
if(!el)return "";
if(!el.className)return "";
if(el.className.indexOf("monologue")>=0)break;
el=el.parentNode;
}
return (el.getElementsByClassName("username")[0]||{}).innerHTML||"";
}

function post(t,u){
 postRaw("(AUTOMATED RESPONSE) "+(u?"@"+u+" ":"")+t);
}

function postRaw(t){
 document.getElementById('input').value=t;document.getElementById('sayit-button').click()
 t=2200;
}

var f=function(){
t=200;
var b,c,k,u,v,z;
b=0;
k=document.querySelector(".monologue:last-of-type .message:last-of-type");
if(k)z=k.getElementsByClassName("content")[0];
if(z){
var user=getUser(z)||"";
process(z.innerHTML,user);
}
console.log(t);
setTimeout(f,t)};setTimeout(f,400);
setTimeout(_=>{bool=true;post("Bot loaded.");console.log("Bot Loaded.")},200);})()