try{
var sid = (function(){
    var result = location.search.match(new RegExp("[\?\&]" + "sid"+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
        return "";
    }
    return result[1];
})();
var uid = (function(){
    var result = location.search.match(new RegExp("[\?\&]" + "uid"+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
        return "";
    }
    return result[1];
})();
document.addEventListener("touchmove",function(e){
    e.preventDefault();
});
var canbetouch = true;
var pnum = 0;
var dzvote;
$.ajax({
	type: "post",
	url: "getInfo.php",
	data:{uid:uid},
	dataType: 'json',
	success: function(data) {		
			$(".p6name").text(data.nickname);
			$(".p6head img").attr("src",data.face);
		if(data.info == 2){
			$(".uploadimg").css({
				"background":"url("+data.img+") no-repeat center",
				"background-size":"100% 100%",
				"background-color":"#EDEDEE",
				});
			$(".p6text").text(data.word).prop("readonly","readonly");
			".upload,.p6mark,.p6textimg,.p6mark2".none();
			$(".p6btn img").attr("src","img/p8.png");
			swi1 = false;
		}		
	}
})
$(document).ready(function(){
	if(sid == "" || sid == undefined){
		$.ajax({
			type: "post",
			url: "fist.php",
			dataType: 'json',
			success: function(data) {
				pnum  = parseInt(data.num);
				$(".allpeople").text(pnum)
			}
		});
		cantouch = true;
		".p0".none();
		".p1".block();
	}else{
		$.ajax({
			type: "post",
			url: "fist.php",
			data:{sid:sid,enter:1,uid:uid},
			dataType: 'json',
			success: function(data) {
				if(data.info == 0){
					pnum  = parseInt(data.num);
					$(".allpeople").text(pnum);
					cantouch = true;
					".p0".none();
					".p1".block();
				}
				if(data.info == 1){
					cantouch = false;
					dzvote = parseInt(data.votes);
					
					".arrow".none();
					".p0".block();
					pnum  = parseInt(data.num)
					$(".allpeople").text(pnum);
					$(".p0name").text(data.nickname);
					$(".p0head img").attr("src",data.face);
					$(".p0img").attr("src",data.img);
					$(".votes").text(dzvote);
					$('.p0text').text(data.word);
					".p0".block();
					".p1".none();
				}
			}
		});
		
	}
	
	
})
$(".p0btn").on("touchstart",function(){
	".p0".none();
	".p1,.arrow".block();
	cantouch = true;
})
var before=after=0;
$(document).on("touchstart",function(e){
	before = after = e.originalEvent.targetTouches[0].clientY;
})
$(document).on("touchmove",function(e){
	after = e.originalEvent.targetTouches[0].clientY;
})
var nowpage = 1;
var cantouch = false;
$(document).on("touchend",function(){
	var cha = after - before;
	if(cha <-30){
		if(nowpage == 1 && cantouch){
			nextpage(".p1",".p2");
			nowpage = 2;
		}else if(nowpage == 2 && cantouch){
			nextpage(".p2",".p3");
			nowpage = 3;
		}else if(nowpage == 3 && cantouch){
			nextpage(".p3",".p4");
			nowpage = 4;
		}else if(nowpage == 4 && cantouch){
			nextpage(".p4",".p5");
			nowpage = 5;
		}
		else if(nowpage == 5 && cantouch){
			nextpage(".p5",".p6");
			nowpage = 6;
			".arrow".none();
		}
	}
})
function nextpage(tpage,npage){
	(tpage).none();
	(npage).block();
}
var swi1 = true;
var base64;
$(".dz").on("touchstart",function(){
	$.ajax({
			type: "post",
			url: "fist.php",
			data:{sid:sid,uid:uid,enter:2},
			dataType: 'json',
			success: function(data) {
				if(data.info == 1){
					msgbox(data.msg);
					$(".votes").text(dzvote+1);
				}
				if(data.info == 0){
					msgbox("亲,你已经点过赞咯");
				}
			}
	});
})
function start(){
	
}
$(".uploadbtn").on("change",function(){
	".p6reload".block();
	".p6mark,.upload".none();
	canbetouch = true;
	".imgload".block();
//	$(".uploadimg").css("background","none");
//	selectFileImage($('.uploadbtn')[0],'uploadimg');
	selectFileImage(this,document.querySelector(".uploadimg"));
	
})
$(".p6mark2").on("touchstart",function(){
	".p7".block()
	".p6,.p6mark2".none();
})
$(".ruploadbtn").on("change",function(){
	".upload,.p6mark".none();
	canbetouch = true;
	".imgload".block();
//	$(".uploadimg").css("background","none");
	selectFileImage(this,document.querySelector(".uploadimg"));
})
$(".p6btn").on('touchstart',function(){
	if(swi1){
		if($('.uploadbtn')[0].files[0] == undefined){
			msgbox("请上传照片!");
		}else if($('.p6text').val() == "" || $('.p6text').val() == undefined){
			msgbox("请输入需要表达的内容!");
		}else{
			base64 = document.getElementsByClassName("uploadimg")[0].toDataURL("image/jpeg");
			
			".ruploadbtn,.p6reload".none();
			
			$(".p6text").prop("readonly","readonly");
			swi1 = false;
			canbetouch = false;
			$.ajax({
				type: "post",
				url: "saveImg.php",
				data:{uid:uid,imgurl:base64,word:$('.p6text').val()},
				dataType: 'json',
				beforeSend:function(){
					".imgload".block();
				},
				success: function(data) {
					".imgload".none();
					if(data.info == 1){
						msgbox("图片上传成功!");
						$(".p6btn img").attr("src","img/p8.png");
					}
					if(data.info== 0){
						msgbox("图片上传失败,请重新进入上传!",3000);
						swi1 = true;
					}
				}
			});			
		}
	}else{
		".p6".none();
		".p9,.coverpage".block();
	}	
});
$(".p6text").bind("focus",function(){
	$(".p6textimg").addClass("none");
})
$(".p6text").bind("blur",function(){
	if($(this).val().length == 0){
		$(".p6textimg").removeClass("none");
	}
	
})
$(".coverpage").on("touchstart",function(){
	".p9,.coverpage".none();
	".p10".block();
})
$(".p7btn").on("touchstart",function(){
	".p7".none();
	".p6".block();
	
})
var cans = document.getElementsByClassName("uploadimg")[0].getContext('2d');
var cansimg = new Image();
function selectFileImage(fileObj, canvas) {  
	var listenerAdded = false, scale, canvasWidth, canvasHeight, 
    drawX, drawY, initScale, drawWidth, drawHeight,
    tmpCanvas = document.createElement("canvas"), maxScale,
    width, height, ctx = tmpCanvas.getContext("2d");
	//ctx.clearRect(0,0,canvasWidth,canvasHeight);
      
    var file = fileObj.files['0'];
    var orientation = null;

    if (file) {
        var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式  
        if (!rFilter.test(file.type)) {
            return;
        }
        EXIF.getData(file, function() {
            EXIF.getAllTags(this);
            orientation = EXIF.getTag(this, 'Orientation');
			//alert(orientation)
        });

        var oReader = new FileReader();
        oReader.onload = function(e) {
			".imgload".block();
            var image = new Image();
            image.src = e.target.result;
            function onload() {				
				console.log("图片上传中")
                width = image.width;
                height = image.height;

                tmpCanvas.width = width;
                tmpCanvas.height = height;
                ctx.save();
                ctx.translate(width >> 1, height >> 1);
				 if (navigator.userAgent.match(/iphone/i)) {
					 if(orientation != "" && orientation != 1){
						switch (orientation) {
							case 6: //需要顺时针（向左）90度旋转
								//alert("90度旋转") 
								//ctx.rotate(Math.PI/2);
								rotateImg(this,'left',canvas);
								//alert(ctx.rotate(Math.PI/2))
								break;
							case 8: //需要逆时针（向右）90度旋转 
								//ctx.rotate(-Math.PI/2);
								rotateImg(this,'right',canvas);  
								break;
							case 3: //需要180度旋转  
								//ctx.rotate(Math.PI);
								rotateImg(this,'right',canvas); 
								rotateImg(this,'right',canvas); 
								break;
						}
					 }
				}
				/*else if (navigator.userAgent.match(/Android/i)) {
					
					}*/
                ctx.restore();
                ctx.drawImage(image, 0, 0);
                var context = canvas.getContext("2d");
                canvasWidth = canvas.width;
                canvasHeight = canvas.height;                
                scale = initScale = Math.min(canvasWidth / width, canvasHeight / height),//返回最小的那个数字
                maxScale = Math.max(1 / scale, scale);
                drawWidth = scale * width, drawHeight = scale * height;
                drawX = (canvasWidth - drawWidth) / 2;
                drawY = (canvasHeight - drawHeight) / 2;
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.fillStyle = "#EDEDEE";   
        		context.fillRect(0, 0, canvasWidth, canvasHeight);
                context.drawImage(tmpCanvas, 0, 0, width, height, drawX, drawY, drawWidth, drawHeight);
				var base64 = null;
				base64 = canvas.toDataURL("image/jpeg",0.5);
                if(!listenerAdded){
                    listenerAdded = true;
                    var isDoubleTouch = false, startX, startY, dltX, dltY,
                        dbStartX1, dbStartY1, dbStartX2, dbStartY2, dbDlt1, dbDlt2;
                    canvas.addEventListener("touchstart",function(e){
                        isDoubleTouch = false;
                        if(e.targetTouches.length == 1 && !isDoubleTouch && canbetouch){
                            startX = e.targetTouches[0].clientX;
                            startY = e.targetTouches[0].clientY;
                        }
                        if(e.targetTouches.length == 2 && canbetouch){
                            isDoubleTouch = true;
                            dbStartX1 = e.targetTouches[0].clientX;
                            dbStartX2 = e.targetTouches[1].clientX;
                            dbStartY1 = e.targetTouches[0].clientY;
                            dbStartY2 = e.targetTouches[1].clientY;
                            dbDlt1 = Math.pow(dbStartX2 - dbStartX1, 2) + Math.pow(dbStartY2 - dbStartY1, 2);
                        }
                    });
                    canvas.addEventListener("touchmove",function(e){
                        if(e.targetTouches.length == 1 && !isDoubleTouch && canbetouch){
                            dltX = e.targetTouches[0].clientX - startX;

                            dltY = e.targetTouches[0].clientY - startY;
                            startX += dltX;
                            startY += dltY;
                            // dltX *= scale / initScale;
                            // dltY *= scale / initScale;
                            drawX += dltX;
                            drawY += dltY;
                            // if(drawX > 0 && drawX + drawWidth > canvasWidth
                            //     || (drawX < 0 && drawX + drawWidth < canvasWidth))
                            //     drawX = dltX < 0 ? canvasWidth - drawWidth : 0;
                            // if(drawY > 0 && drawY + drawHeight > canvasHeight
                            //     || (drawY < 0 && drawY + drawHeight < canvasHeight))
                            //     drawY = dltY < 0 ? canvasHeight - drawHeight : 0;
                            context.clearRect(0, 0, canvasWidth, canvasHeight);
                            context.fillStyle = "#EDEDEE";   
        					context.fillRect(0, 0, canvasWidth, canvasHeight);
                            context.drawImage(tmpCanvas, 0, 0, width, height, drawX, drawY, drawWidth, drawHeight);
                        }
                        if(e.targetTouches.length == 2 && canbetouch){
                            isDoubleTouch = true;
                            dbStartX1 = e.targetTouches[0].clientX;
                            dbStartX2 = e.targetTouches[1].clientX;
                            dbStartY1 = e.targetTouches[0].clientY;
                            dbStartY2 = e.targetTouches[1].clientY;
                            dbDlt2 = Math.pow(dbStartX2 - dbStartX1, 2) + Math.pow(dbStartY2 - dbStartY1, 2);
                            scale *= Math.sqrt(dbDlt2 / dbDlt1);
                            dbDlt1 = dbDlt2;
                            if(scale < initScale)
                                scale = initScale;
                            if(scale > maxScale)
                                scale = maxScale;
                            var aftW = width * scale, aftH = height * scale;
                            drawX = drawX + drawWidth / 2 - aftW / 2;
                            drawY = drawY + drawHeight / 2 - aftH / 2;
                            drawWidth = aftW;
                            drawHeight = aftH;
                            context.clearRect(0, 0, canvasWidth, canvasHeight);
                            context.fillStyle = "#EDEDEE";   
        					context.fillRect(0, 0, canvasWidth, canvasHeight);
                            context.drawImage(tmpCanvas, 0, 0, width, height, drawX, drawY, drawWidth, drawHeight);
                        }
                    });
                }
				".imgload".none();
				console.log("上传完成")
				$(".uploadimg").css({
				"background":"#EDEDEE",
				});
            };
            if(image.complete)
                onload();
            else image.onload = onload;
        };
        oReader.readAsDataURL(file);
    }
}
function rotateImg(img, direction,canvas) {    
        //alert(img);  
        //最小与最大旋转方向，图片旋转4次后回到原方向    
        var min_step = 0;    
        var max_step = 3;    
        //var img = document.getElementById(pid);    
        if (img == null)return;    
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
        var height = img.height;    
        var width = img.width;    
        //var step = img.getAttribute('step');    
        var step = 2;    
        if (step == null) {    
            step = min_step;    
        }    
        if (direction == 'right') {    
            step++;    
            //旋转到原位置，即超过最大值    
            step > max_step && (step = min_step);    
        } else {    
            step--;    
            step < min_step && (step = max_step);    
        }    
        //旋转角度以弧度值为参数    
        var degree = step * 90 * Math.PI / 180;    
        var ctx = canvas.getContext('2d');    
        switch (step) {    
            case 0:    
                canvas.width = width;    
                canvas.height = height;    
                ctx.drawImage(img, 0, 0);    
                break;    
            case 1:    
                canvas.width = height;    
                canvas.height = width;    
                ctx.rotate(degree);    
                ctx.drawImage(img, 0, -height);    
                break;    
            case 2:    
                canvas.width = width;    
                canvas.height = height;    
                ctx.rotate(degree);    
                ctx.drawImage(img, -width, -height);    
                break;    
            case 3:    
                canvas.width = height;    
                canvas.height = width;    
                ctx.rotate(degree);    
                ctx.drawImage(img, -width, 0);    
                break;    
        }    
    }    
var bgm = document.getElementById("miuse");
function is_weixn(){  
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
        return true;  
    } else {  
        return false;  
    }  
}  
 function autoPlayAudio1() {
 	if(is_weixn()){
 		 wx.config({
	        // 配置信息, 即使不正确也能使用 wx.ready
	        debug: false,
	        appId: '',
	        timestamp: 1,
	        nonceStr: '',
	        signature: '',
	        jsApiList: []
	    });
	    wx.ready(function() {
	    	bgm.load();
	        bgm.play();
	    });
 	}
   
}
 autoPlayAudio1();
 $(".miuse").on("touchstart",function(){
	if(bgm.paused){
		bgm.play();
		$(".miusebtn").attr("src","img/go.png");
	}else{
		bgm.pause()
		$(".miusebtn").attr("src","img/stop.png");
	}
})
}catch(e){
    alert(e.name + ":" + e.message);   
}
function end(){
	$(".p10").removeClass("none");
	$(".p9,.coverpage,.p1,.p2,.p3,.p4,.p5,.p6,.p7,.p0").addClass("none");
}
