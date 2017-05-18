var nid = (function(){
    var result = location.search.match(new RegExp("[\?\&]" + "nid"+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
        return "";
    }
    return result[1];
})();
new Orient();
document.addEventListener("touchmove",function(e){
	e.preventDefault();
})
var getcode;
var Src = [
	"img/h1.png", //0
	"img/h2.png", //1
	"img/h3.png", //2
	"img/p01.jpg", //3
	"img/p02.png", //4
	"img/p2.png", //5
	"img/p03.png", //6
	"img/p3a.png", //7
	"img/p3b.png", //8
	"img/p3c.png", //9
	"img/p3d.png", //10
	"img/p4.jpg", //11
	"img/p04.png", //12
	"img/p05.png", //13
	"img/p21.png", //14
	"img/p22.png", //15
	"img/p31.png", //16
	"img/p41.png", //17
	"img/p51.png", //18
	"img/p61.png", //19
	"img/p62.png", //20
	"img/pz.png", //21
	"img/p30.jpg", //22
	"img/j1.jpg", //23
	"img/j2.jpg", //24
	"img/j3.jpg", //25
	"img/j4.jpg", //26
	"img/j5.jpg", //27
];
var nickname;
var count;
var countNum = 60;
var timepause = false;
var timeover = false;
var nandu = 1;
var pz = $(".penzi")[0];
var movetop;
var gover = false;
var urscode = 0;
var beforetime;
$.ajax({
	type: "post",
	url: "userInfo.php",
	data:{nid:nid},
	dataType: 'json',
	success: function(data) {
		nickname = data.nickname;
		$(".namebox").text(nickname);
		$(".head img").attr("src",data.headimgurl);
	}
});

$(document).ready(function(){
	Src.preload(function(){
		start();
	})
	Src.percent = function(){
		$(".ll").css("width",parseInt(this.js)+"%");
		
	}
})
function start(){
	".lgo,.loadbar,.ltext".none();
	".lbtn".block();
}
$(".lbtn").on("touchstart",function(){
	".p2".block();
})
$(".p2btn").on("touchstart",function(){
	".p3".block();
	p3();
})

function p3(){
	count = setInterval(function(){
				
		if(countNum <= 0){
			gover = true;
			countNum = 0;
			timeover = true;
		}else{
			gover = false;
		}
		if( !gover && !timepause){
			countNum --;
		}
		$(".p3ll").css("width",countNum*100/60+"%");
	},1000)
	movetop = $(".move")[0].offsetTop;
	pzmove();
	go();
	frame()
}
function pzmove(){
	var pzLeft = $(".penzi")[0].offsetLeft;
	var winW = $(window).width();
	var pzW = $(".penzi").width();
	var touch = new Touch();
	touch.move = function(e){
		var x = e.x;
		pzLeft = pzLeft + x;
		pzLeft = pzLeft < 0 ? 0 : pzLeft > winW - pzW ? winW - pzW : pzLeft;
		$(".penzi").css("left",pzLeft + "px");
	}
}
function Thdrop(num) {
	this.price = 0;
	this.width;
	this.left = Math.random()*100;
	this.whichone = Math.round(Math.random()*10*num);
	this.creat();
}
Thdrop.prototype.creat = function(){
	this.div = document.createElement("div");
	$(this.div).addClass("dropbox absolute");
	$(".drop").append(this.div);
	this.divimg = document.createElement("img");
	$(this.divimg).addClass("w100 left");
	
	this.divimg.src = this.whichone > 5 ? "img/h1.png" : this.whichone > 2 ? "img/h2.png" : "img/h3.png";
	this.div.dataset.price = this.whichone > 5 ? 1 : -1;
	$(this.div).append(this.divimg).addClass("fast0").css("left",this.left + "%");
	$(this.div).on("webkitAnimationEnd animationend",function(){
		this.delete();
	}.bind(this));
	this.width = this.div.offsetWidth/2;
}
Thdrop.prototype.delete = function(){
	$(".drop")[0].removeChild(this.div);
}

function go(){
//	nandu = urscode/99 + 1;
	if(urscode>=11){
		nandu = 1.5;
	}
	if(urscode>=66){
		nandu = 1.8;
	}
	new Thdrop(nandu);
	if(gover){
		return
	}else{
		setTimeout(go,300);
	}
}
function impact(obj,dobj){
	var o = {
		x:getposition(obj,"left"),
		y: movetop,
		w:getposition(obj,"width"),
		h:getposition(obj,"height")
	}
	var d = {
		x:getposition(dobj,"left"),
		y:getposition(dobj,"top"),
		w:getposition(dobj,"width"),
		h:getposition(dobj,"height")
	}
	if(d.x >= o.x-d.w+10 && d.x<=o.x+o.w && d.y>=o.y - d.h+5 && d.y < o.y){
		return true;
	}else{
		return false;
	}
}
function getposition(obj,style){
	switch(style){
		case "left":
			return obj.offsetLeft;
			break;
		case "top":
			return obj.offsetTop;
			break;
		case "width":
			return obj.clientWidth;
			break;
		case "height":
			return obj.clientHeight;
			break;
	}
}
function frame(){
	var drop = $(".drop")[0].children;
	for(var i = 0;i<drop.length;i++){
		if(impact(pz,drop[i])){
			var price = drop[i].dataset.price;
			if(price != -1){
				if(timeover){
					".p3e,.coverpage".block();
					cjajax();
				}else{
					urscode = urscode + parseInt(price);
					var fenshu = document.createElement("div");
					fenshu.className = "absolute fadeOut"
					$(fenshu).text(urscode+"朵");
					$(".feishu").append(fenshu);
					$(fenshu).on("webkitAnimationEnd animationend",function(){
						$(fenshu).remove();
					})
					checkscode();
				}
			}
			$(".drop")[0].removeChild(drop[i]);
		}
	}
	window.requestAnimationFrame(frame);
}

function checkscode(scode){
	if(urscode == 11){
		".coverpage,.p3a".block();	
		gover = true;
		timepause = true;
		beforetime = countNum;
	}
	if(urscode == 66){
		".coverpage,.p3b".block();
		gover = true;
		timepause = true;
		beforetime = countNum;
	}
	if(urscode == 99){
		".coverpage,.p3c".block();
		gover = true;
		timepause = true;
	}
}
$(".p3abtn1").on("touchstart",function(){
	".p3a,.coverpage".none();	
	gover = false;
	timepause = false;
	countNum = beforetime;
	urscode = 11;
	go();
})
$(".p3bbtn1").on("touchstart",function(){
	".p3b,.coverpage".none();
	gover = false;
	timepause = false;
	countNum = beforetime;
	urscode = 66;
	go();
})
$(".p3ebtn1").on("touchstart",function(){
	".p3e,.coverpage".none();
	countNum = 60;
	gover = false;
	timeover = false;
	urscode = 0;
	go();
})
$(".p3abtn2,.p3bbtn2,.p3cbtn1,.p3ebtn2").on("touchstart",function(){
	".p3d".block();
	$(this).parent().addClass("none");
	cjajax();
	
})
function cjajax(){
	updatefx(nickname,urscode);
	$.ajax({
		type: "post",
		url: "luck.php",
		data:{nid:nid,score:urscode},
		dataType: 'json',
		success: function(data) {
		}
	});
}
function luckdraw(){
	".p3".none();
	".p4".block();
	var cany1y = true;
	var shake = new Shake();
	shake.end = function(speed){
		if(speed > 3000 && cany1y){
			$(".p4y1y").addClass("y1y");
			cany1y = false;
			setTimeout(function(){
				$.ajax({
					type: "post",
					url: "getpiz.php",
					data:{nid:nid},
					dataType: 'json',
					success: function(data) {
						".p4a".none();
						if(data.pid == 0){
							".p4c".block();
						}else{
							".p4b".block();
							if(data.pid == 1){
								$(".p4bj img").attr("src","img/j3.jpg")
							}else if(data.pid == 2){
								$(".p4bj img").attr("src","img/j1.jpg")
							}else if(data.pid == 3){
								$(".p4bj img").attr("src","img/j2.jpg")
							}else if(data.pid == 4){
								$(".p4bj img").attr("src","img/j5.jpg")
							}else if(data.pid == 5){
								$(".p4bj img").attr("src","img/j4.jpg")
							}
						}
					}
				});
			},1500)
			
		}
	}
}
var bgm = document.getElementById("miuse");

$(".miuse").on("touchstart",function(){
	if(bgm.paused){
		bgm.play();
		$(".miusebtn").attr("src","img/go.png");
	}else{
		bgm.pause()
		$(".miusebtn").attr("src","img/stop.png");
	}
})

if (navigator.userAgent.match(/iphone/i)) {
	document.addEventListener("WeixinJSBridgeReady", function () { 
		bgm.play()
	}, false);	
}else{
	bgm.play();
}

