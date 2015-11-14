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
t=(new Date()).valueOf();
u=60*1000;
v=24*60*u;
v=Math.floor((v-t%v)/u);
if(z&&z.innerHTML=="!time"){
document.getElementById('input').value="(AUTOMATED RESPONSE) UTC Time: "+t+" ("+v+" minutes until UTC midnight)";document.getElementById('sayit-button').click()
}setTimeout(f,1200)};f();