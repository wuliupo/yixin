(function(){
var ele = document.getElementById('gotop-btn');
ele.onclick = function(){
window.scrollTo(0,0);
}
window.onscroll = function(){
var screen = document.body.clientHeight;
var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
if(scrollTop > screen){
ele.className = "u-gotop u-gotop-show";
}else{
ele.className="u-gotop";
}
}
})();