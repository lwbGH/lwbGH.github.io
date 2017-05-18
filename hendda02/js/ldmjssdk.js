//前端页面须引用http://res.wx.qq.com/open/js/jweixin-1.0.0.js
//前端页面须有JQ库支持（ajax使用了JQ库）
//分享须跳转到ldmchange.html再跳转回来

var senduid = (function(){
var result = location.search.match(new RegExp("[\?\&]" + "uid"+ "=([^\&]+)","i"));
if(result == null || result.length < 1){
    return "";
}
return result[1];
})();
var url = window.location.href;		
function wxfenxiang(){
	$.ajax({
		url:'./ldmjssdk.php',// 跳转到 action  
		data:{url:url,uid:senduid},
		type:'post',
		dataType:'json',
		success:function(data){		
			wx.config({
			debug:false,
			appId: data['appId'],
			timestamp: data['timestamp'],
			nonceStr: data['nonceStr'],
			signature: data['signature'],
			jsApiList: [
			"onMenuShareTimeline",
			"onMenuShareAppMessage",
			"onMenuShareQQ"
			]
			});
			wx.ready(function (){
			//var sendnum = parseInt(pnum)+1;			
			var shareData = {
			title: data['nickname']+"是第"+pnum+"个记录暖心事儿的人",		
			desc: "记录2016那些让你感动的瞬间",
			link: 'http://www.5pm5gum.com/userproject/hdnx/houjinindex.html?uid='+senduid,
			imgUrl: 'https://img.alicdn.com/imgextra/i1/754991753/TB26D4kbHFlpuFjy0FgXXbRBVXa_!!754991753.jpg',
			success:function()
			{					
				end();
				$.ajax({
					url:'addnum.php',// 跳转到 action  
					data:{},
					type:'post',
					dataType:'text'
				});
			}
			};	
			wx.onMenuShareAppMessage(shareData);
			wx.onMenuShareTimeline(shareData);
			wx.onMenuShareQQ(shareData);

			});
		},
		error:function(data){
		}
	});	
}
 wxfenxiang();
	