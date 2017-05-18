function Orient(callback){
    this.callback = callback || "";
    this.obj = document.createElement('div');
    document.body.appendChild(this.obj);
    this.obj.className = "mod-orient-layer none";
    this.obj.id = "orientLayer";
    this.obj.innerHTML = '<div class="mod-orient-layer__content"><i class="icon mod-orient-layer__icon-orient"></i><div class="mod-orient-layer__desc">为了更好的体验，请锁定屏幕旋转后浏览</div></div>';
    this.styles = document.createElement('style');
    document.body.appendChild(this.styles);
    this.styles.innerHTML = '@-webkit-keyframes rotation{10%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}50%{transform:rotate(0);-webkit-transform:rotate(0)}60%{transform:rotate(0);-webkit-transform:rotate(0)}90%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}100%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}}.mod-orient-layer{display:none;position:fixed;height:100%;width:100%;left:0;top:0;background:#000;z-index:9997}.mod-orient-layer__content{position:absolute;width:100%;top:45%;margin-top:-75px;text-align:center}.mod-orient-layer__icon-orient{display:inline-block;width:67px;height:109px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAADaCAMAAABU68ovAAAAXVBMVEUAAAD29vb////x8fH////////x8fH5+fn29vby8vL////5+fn39/f6+vr////x8fH////////+/v7////09PT////x8fH39/f////////////////////x8fH///+WLTLGAAAAHXRSTlMAIpML+gb4ZhHWn1c2gvHBvq1uKJcC6k8b187lQ9yhhboAAAQYSURBVHja7d3blpowFIDhTUIAOchZDkre/zE7ycySrbUUpsRN2/1fzO18KzEqxEVgTiZNfgmmtxRc8iaR8HNe8x4BtjQePKayYCIoyBSgvNNE1AkNSHqZyLqk97EgUCCHBzZ5mkg7ScvIJuIyOyXBRFxgpqWZyGsAZLB1KjsJi8nutHU4JCRbFRH8tmirI9k8Jx2sqNs8K/m0LQkrktO2crgcgXGB4AiTEsB0hJfo9MGgX7CGcYiYwQxmMOOvZwRhBG8tCoMXjBDeXvWCEcHbi14wgCBmMIMZzGAGM5jxETNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxY6E2rUQxnH2tz9cirlJFwFBJedaPnUv0M7++egPDE8iAJcIDmxwH5wwv9vUviw2kLbVO3TJU5uul/EyB0FoLp4x60PdGUd3qPurrWyjGGTc05u+1dcgI7/+tCCPARWGhH7o5Y7RCf+bH9ctXLp6v2BVDxfqz0oPXeSVaNtINo/1SXDv4dck8IIkbhtC2ol+iouEonTBCbYvVMnXOjxww6s/RFrBUpXHh/gw1rHj5d/qhYn9Gpk2FWh6xRBRX5Oj3Znh2Sq49/L6+y8pB26q9GbE2dbA2mVbx6I+7MfBglLCttm73ZQi7AD3iL4HqjFYJHSPRppqaUaJ3ATpGa+ckpGak2hRRMyqjGMkvl+xyFeSMwjAqcsZgGDdyhl0oNTnDN4yenJGZFGxNChP5/Y3efh6SM2rDOJMzboYxkDMqwyjIGcIw6F+io2FU1IxIm1JqRmgXSkvNKNCXeTpGrU0JNSO2c6LIGPgCS8AuDHz9ta0SXWDtxoDRH+MqlbC2Dt2G2JFRadtQZt2qq/orGowdGb2euxYiqWEpVWhTBnszoNAPdStuQwxqf0aocdWKW4Z+DfszIh8pxJqbuCE4YAC+4bm0evtipjpgJHeFnyyt1Ku2xa0bhjxr27p75rECNwyI9ZwvXkHq+7aTaMEV44YYy/spfgjgjNHaWW+GeUhGEX7tLlVinIFDDSgnOwhi1V6bU0b6tVS9eAERe863g4dRrtiHdc6o+nn5vtyVVgR79Cqt4uL6gfHPQyGqtP2vf7HADGbcYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JjhtOM+J/AgT008yDMkN/dPP9hzS8zAMQN3OEYeekp5YU7KOKXwVXqiY+QS7smcinGKABWdiBgpPJTSMHJ4KidhhPBUSMLw4CmPhKHgKUXCkHsygum71ftNSgCX6bsl8FQyfbcL5EdYsDk0R3j7aiA5wpt5AjKg/2gLJEBD/0Hf2OOf/vRrj6z/7GtP4B3nMKyjHA12kIPSjnJs3FEO0TvKkYJHOWCR+rjJH0Vn6fI5PjNbAAAAAElFTkSuQmCC);transform:rotate(90deg);-webkit-transform:rotate(90deg);-webkit-animation:rotation infinite 1.5s ease-in-out;animation:rotation infinite 1.5s ease-in-out;-webkit-background-size:67px;background-size:67px}.mod-orient-layer__desc{margin-top:20px;font-size:15px;color:#fff}.mod-orient-layer__desc{margin-top:20px;font-size:15px;color:#fff}';
    var ori = "onorientationchange" in window ? "orientationchange" : "resize";
    this.orientNotice();
    window.addEventListener(ori,function(){
        setTimeout(function(){
        this.orientNotice();
        }.bind(this),200);
    }.bind(this)); 
}
Orient.prototype.orientNotice = function(){
    var orient = this.checkDirect(); 
    if (orient == "portrait") { 
        this.obj.style.display = "none";
    } else { 
        this.obj.style.display = "block";
    }
}
Orient.prototype.checkDirect = function(){
    if (document.documentElement.clientHeight >= document.documentElement.clientWidth) {
        return "portrait"; 
    } else { 
        return "landscape"; 
    } 
}
/*-------------转屏提示-----------------*/
/*---------------用法------------------*/
/*new Orient(); */


Array.prototype.preload = function(callback){
    this.js = 0;
    this.callback = callback;
    this.loop();
    for (var i=0;i<this.length;i++){
        var result = this[i].indexOf(".mp3");
        if(result != -1){
            var bg = new Audio();
            bg.oncanplaythrough = function(){
                bg.pause();
                this.js = this.js + 100/this.length; 
            }.bind(this)
            bg.src = this[i];
            bg.load();
            bg.playbackRate=0.01;
            bg.play();
        }else{
            var sucai = new Image();
            sucai.onload = function(){
                this.js = this.js + 100/this.length; 
            }.bind(this)
            sucai.src = this[i];
        }
    }
}
Array.prototype.loop = function(){
    if(this.js < 99){
        this.percent();
        this.raf = window.requestAnimationFrame(function(){
            this.loop();
        }.bind(this));
    }else{
        this.percent();
        this.callback();   
    }
}
Array.prototype.percent = function(){}
Array.prototype.choice = function(e){
    this.select = this[e];
    return this.select;
}
Array.prototype.remove = function(val) { var index = this.indexOf(val); if (index > -1) { this.splice(index, 1); } };
String.prototype.assign = function(e){
    var obj = $(e)[0].nodeName;
    if(obj == "img" || obj == "IMG"){
        $(e).attr("src",this);  
    }else{
        $(e).css("background-image","url("+this+")"); 
    }
}
String.prototype.none = function(){
    $(""+this).addClass("none");   
}
String.prototype.block = function(){
    $(""+this).removeClass("none");   
}
function Touch(obj){
    var ele = obj ? obj : document;
    var eventstart = "ontouchstart" in window ? "touchstart" : "mousedown";
    var eventend = "ontouchstart" in window ? "touchend" : "mouseup";
    var eventmove= "ontouchstart" in window ? "touchmove" : "mousemove";
    this.beforex=0,this.afterx=0;
    this.beforey=0,this.aftery=0;
    this.chax = 0,this.chay = 0;
    ele.addEventListener(eventstart,function(e){
        this.tstart(e);
    }.bind(this));
    ele.addEventListener("touchmove",function(e){
        this.tmove(e);
    }.bind(this));
    ele.addEventListener(eventend,function(e){
        this.tend(e);
    }.bind(this));
}
Touch.prototype.tmove = function(e){
    this.afterx = "ontouchstart" in window ? e.targetTouches[0].clientX : e.x;
    this.aftery = "ontouchstart" in window ? e.targetTouches[0].clientY : e.y;
    this.chax = this.afterx - this.beforex;
    this.chay = this.aftery - this.beforey;
    this.beforex = this.afterx;
    this.beforey = this.aftery;
    var cha = {
        x : this.chax,
        y : this.chay,
        clientX : this.afterx,
        clientY : this.aftery,
        moveX : this.chax,
        moveY : this.chay
    }
    this.move(cha);
}
Touch.prototype.tstart = function(e){
    this.beforex=0,this.afterx=0;
    this.beforey=0,this.aftery=0;
    this.checkx = 0,this.checky = 0;
    this.beforex = this.afterx = "ontouchstart" in window ? e.targetTouches[0].clientX : e.x;
    this.beforey = this.aftery = "ontouchstart" in window ? e.targetTouches[0].clientY : e.y;
    this.checkx = this.beforex;
    this.checky = this.beforey;
}
Touch.prototype.tend = function(e){
    this.afterx = "ontouchstart" in window ? this.afterx : e.x;
    this.aftery = "ontouchstart" in window ? this.aftery : e.y;
    this.chax = this.afterx - this.checkx;
    this.chay = this.aftery - this.checky;
    var cha = {
        x : this.chax,
        y : this.chay,
        clientX : this.afterx,
        clientY : this.aftery,
        moveX : this.chax,
        moveY : this.chay
    }
    this.end(cha);
    this.beforex = this.afterx = 0;
    this.beforey = this.aftery = 0;
    this.checkx = this.checky = 0;
}
Touch.prototype.move = function(e){}
Touch.prototype.end = function(e){}
function TaoVideo(arr, num, arr2) {
	this.arr2 = arr2 ? arr2.slice(0) : [];
	this.arr3 = arr2 ? arr2.slice(0) : [];
	this.frame = num ? num : 16;
	this.switch = false;
	this.duration = arr.length;
	this.currentTime = 0;
	this.render = new Image();
	this.arr = arr;
	this.movie()
}
TaoVideo.prototype.movie = function() {
	if(this.switch) {
		if(this.arr2.indexOf(this.currentTime) > -1) {
			this.switch = false;
			this.arr2.remove(this.currentTime);
			this.stop(this.currentTime)
		} else {
			this.render.onload = function() {
				this.result(this.render)
			}.bind(this);
			this.render.src = this.arr[this.currentTime];
			this.currentTime += 1;
			if(this.currentTime >= this.duration) {
				this.currentTime = 0;
				this.switch = false;
				this.arr2 = this.arr3.slice(0);
				this.stop(this.currentTime)
			}
		}
	}
	if(this.frame <= 16) {
		window.requestAnimationFrame(function() {
			this.movie()
		}.bind(this))
	} else {
		setTimeout(function() {
			this.movie()
		}.bind(this), this.frame)
	}
};
TaoVideo.prototype.result = function() {};
TaoVideo.prototype.play = function() {
	this.switch = true
};
TaoVideo.prototype.pause = function() {
	this.switch = false
};
TaoVideo.prototype.stop = function() {};


/*
倒计时
用法：var countdown = new Countdown(时间)
		countdown.onplay = function(e){ //e为倒计的时间
			
		}
		countdown.pause(); 暂停
		countdown.play();  继续
 * */
function Countdown(time){
	this.swi = true;
	this.time = time;
	this.go();
	
}
Countdown.prototype.go = function(){
	var _this = this;
	setTimeout(function(){
		if(_this.time >= 1 && _this.swi ){
			_this.time--;
			_this.onplay(_this.time);
			_this.go();
		}
	},1000);
}
Countdown.prototype.pause = function(){
	this.swi = false;
}
Countdown.prototype.play = function(){
	if(!this.swi){
		this.swi = true;
		this.go();
	}else{
		return;
	}
	
}
Countdown.prototype.onplay = function(e){}

function msgbox(texts, time,top) {
    $(document.body).append('<div class="msgbox"><span>' + texts + '</span></div>')
    $('.msgbox').css({
        position: "fixed",
        left: 0,
        top: "40%",
        /*文本高度*/
        height: "10%",
        width: "100%",
        textAlign: "center",
        /*字体颜色*/
        color: "white",
        zIndex: "99999999"
    }).find('span').css({
        /*背景颜色*/
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: '2.5% 8%',
        borderRadius: "6px",
        fontFamily: '微软雅黑',
        fontSize: '24px',
    });
    if(top){
       $('.msgbox').css({
           top: top 
       }); 
    }
    var height = $('.msgbox').css('height');
    $('.msgbox').css('line-height', height).hide().fadeIn('200');
    if (time) {
        setTimeout(function() {
            $('.msgbox').fadeOut('200', function() {
                $(this).remove();
            });
        }, time);
    } else {
        setTimeout(function() {
            $('.msgbox').fadeOut('200', function() {
                $(this).remove();
            });
        }, 1000); //文字显示时间
    }

}
function Shake(){
	this.last_update = 0;
	this.SHAKE_THRESHOLD = 3000;
	this.x = this.y = this.z = this.last_x = this.last_y = this.last_z = 0;
	window.addEventListener('devicemotion',function(e){
		this.dm(e);
	}.bind(this))
}
Shake.prototype.dm = function(e){
	this.accelertion = e.accelerationIncludingGravity;
	this.curTime = new Date().getTime();
	if((this.curTime - this.last_update) > 100) {
		this.diffTime = this.curTime - this.last_update;
		this.last_update = this.curTime;
		this.x = this.accelertion.x;
		this.y = this.accelertion.y;
		this.z = this.accelertion.z;
		this.speed = Math.abs(this.x + this.y + this.z - this.last_x - this.last_y - this.last_z) / this.diffTime * 10000;
		this.end(this.speed);
		this.last_x = this.x;
		this.last_y = this.y;
		this.last_z = this.z;
	}
}
Shake.prototype.end = function(e){
	
}