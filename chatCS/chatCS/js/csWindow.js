
var tr = false;
var mine, to, user_id, dat;
var userName = "访客11",
	userId = "100000123",
	userAvatar = "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3474094557,370758738&fm=11&gp=0.jpg",
	kfName = "玑脉技术支持",
	kfType = "kefu",
	kfId = "1111111",
	kfAvatar = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606381788405&di=21b0921c883653e8608d06c014863130&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D580e773405f431adbcd243317b37ac0f%2F50f2f9dde71190ef9c7f0079c71b9d16fffa60dc.jpg";

layui.use('layim', function(layim){
	var layim = layui.layim;
	layim.config({
		init: {
			//配置客户信息
			mine: {
				"username": userName,
				"id": userId,
				//用户头像
				"avatar": userAvatar
			}
		},
		tool: [{
			alias: 'pingfen'
			, title: '打分'
			, icon: '&#xe6c6;'
		}],
		//开启客服模式
		brief: true,
		uploadImage: {
			url: 'http://222.73.241.5:7877',
			type: 'post',
			success:function (v){
				console.log(v)
			}
		},
		uploadFile: {
			url: 'http://222.73.241.5:7877/upload_file',
			type: 'post'
		},
		chatLog: layui.cache.dir + '/css/modules/layim/html/chatlog.html' 
		//聊天背景图
		//initSkin: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606987867846&di=dfb80e42a5a3df95c77e8a34840c7c01&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F120405%2F10016-120405012T88.jpg'
	});
  //打开一个客服面板
	layim.chat({
		name: kfName,
		type: kfType,
		//客服头像
		avatar: kfAvatar,
		id: kfId,
	});
	if ($(".layim-chat-main ul li").length == 0) {
		$(".clearMsg").hide();
	}
	//theme color
	$(".layui-layer-title").css("background", "#33A9B7");
	$(".layim-chat-mine .layim-chat-text").css("background", "#33A9B7");
	$(".layim-chat-mine .layim-chat-text:after").css("border-top-color", "#33A9B7");
	$(".style").append('.layim-chat-mine .layim-chat-text:after{border-top-color:#33A9B7 !important}');
	$(".layim-chat-send span").css("background", "#33A9B7");
	$(".flowBth").css("background", "#33A9B7");
	$(".bthSub").css("background", "#33A9B7");
	layim.setChatMin(); //收缩聊天面板
	//默认发送的第一条消息
	layim.getMessage({
		username: kfName,
		avatar: kfAvatar,
		id: kfId,
		type: kfType,
		content: "请问有什么能够帮助您的？face[可爱] "
	});
	//发出消息，接收回复的消息
	layim.on('sendMessage', function (res) {
		mine = res.mine;
		to = res.to;
		user_id = "46";
		dat = { message: mine.content, sender: user_id };
		if (to.type === 'kefu') {
			layim.setChatStatus('<span style="color:#FF5722;font-size:12px;">对方正在输入。。。</span>');
		}
		$(".layim-chat-mine .layim-chat-text").css("background", "#33A9B7");
		$(".clearMsg").show();
		$.ajax({
			//http://222.73.241.5:7277/web
			//https://kf.shsunshine.org/faq/faq/webhooks/rest/webhook
			url: "https://demo1.ji-ling.com/demo/demo/webhooks/rest/webhook",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(dat),
			success: function (v) {
				console.log(v)
				if(v.length > 0){
					if(v[0].buttons != undefined){
						if(v[0].buttons[0].payload == "faq"){
							obj = {
								username: to.name
								, avatar: to.avatar
								, id: to.id
								, type: to.type
								, content: "faq["+v[0].text+"]"
							}
							layim.setChatStatus('<span style="color:#FF5722;"></span>');
							layim.getMessage(obj);
						}else if(v[0].buttons[0].payload == "flow"){
							var bthHtml="";
							for(var i=0;i<v[0].buttons.length;i++){
								bthHtml+=v[0].buttons[i].title+"&"
							}
							bthHtml = bthHtml+v[0].text;
							console.log(bthHtml)
							obj = {
								username: to.name
								, avatar: to.avatar
								, id: to.id
								, type: to.type
								, content: "flow["+bthHtml+"]"
							}
							layim.setChatStatus('<span style="color:#FF5722;"></span>');
							layim.getMessage(obj);
							$(".flowBth").css("background", "#33A9B7");
						}else if(v[0].buttons[0].payload == "order"){
							obj = {
								username: to.name
								, avatar: to.avatar
								, id: to.id
								, type: to.type
								, content: v[0].text
							}
							layim.setChatStatus('<span style="color:#FF5722;"></span>');
							layim.getMessage(obj);
						}else if(v[0].buttons[0].payload == "end"){
							obj = {
								username: to.name
								, avatar: to.avatar
								, id: to.id
								, type: to.type
								, content: "end["+v[0].text+"]"
							}
							layim.setChatStatus('<span style="color:#FF5722;"></span>');
							layim.getMessage(obj);
							$(".bthSub").css("background", "#33A9B7");
						}
					}else{
						obj = {
							username: to.name
							, avatar: to.avatar
							, id: to.id
							, type: to.type
							, content: v[0].text
						}
						layim.setChatStatus('<span style="color:#FF5722;"></span>');
						layim.getMessage(obj);
					}
				}else{
					obj = {
						username: to.name
						, avatar: to.avatar
						, id: to.id
						, type: to.type
						, content: "我不知道您在说什么~face[泪]"
					}
					layim.setChatStatus('<span style="color:#FF5722;"></span>');
					layim.getMessage(obj);
				}
			},
			error: function (xhr, textStatus, errorThrown) {
				var layer = layui.layer;
		  		layer.msg('哎呀，出错了，请稍后重试。');
		  		console.log(xhr,textStatus,errorThrown)
			}
		})
	});
	layim.on('tool(pingfen)', function (insert, send, obj) {
		if (tr == false) {
			$(".pfDiv").show();
			$(".pfDiv").addClass("layui-anim-up");
			tr = !tr;
		} else {
			$(".pfDiv").hide();
			$(".pfDiv").removeClass("layui-anim-up");
			tr = !tr;
		}
	}); 
});
layui.use(['code'], function(){
  layui.code({
    elem: 'pre'
  })
});
$(function () {
	layui.use('util', function () {
		var util = layui.util;
		var layim = layui.layim;
		util.event('lay-active', {
			pf1: function () {
				$(".pfDiv").hide();
				tr = false;
				if (to == undefined) {
					layim.getMessage({
						username: kfName,
						avatar: kfAvatar,
						id: kfId,
						type: kfType,
						content: "不满意，感谢您的评价~"
					});
				} else {
					var obj = {
						username: to.name
						, avatar: to.avatar
						, id: to.id
						, type: to.type
						, content: 'face[泪] 感谢您的评价~'
					}
					layim.getMessage(obj);
				}
			},
			pf2: function () {
				$(".pfDiv").hide();
				tr = false;
				if (to == undefined) {
					layim.getMessage({
						username: kfName,
						avatar: kfAvatar,
						id: kfId,
						type: kfType,
						content: "一般，感谢您的评价~"
					});
				} else {
					var obj = {
						username: to.name
						, avatar: to.avatar
						, id: to.id
						, type: to.type
						, content: 'face[失望] 感谢您的评价~'
					}
					layim.getMessage(obj);
				}
			},
			pf3: function () {
				$(".pfDiv").hide();
				tr = false;
				if (to == undefined) {
					layim.getMessage({
						username: kfName,
						avatar: kfAvatar,
						id: kfId,
						type: kfType,
						content: "满意，感谢您的评价~"
					});
				} else {
					var obj = {
						username: to.name
						, avatar: to.avatar
						, id: to.id
						, type: to.type
						, content: 'face[嘻嘻] 感谢您的评价~'
					}
					layim.getMessage(obj);
				}
			},
			pf4: function () {
				$(".pfDiv").hide();
				tr = false;
				if (to == undefined) {
					layim.getMessage({
						username: kfName,
						avatar: kfAvatar,
						id: kfId,
						type: kfType,
						content: "非常满意，感谢您的评价~"
					});
				} else {
					var obj = {
						username: to.name
						, avatar: to.avatar
						, id: to.id
						, type: to.type
						, content: 'face[爱你] 感谢您的评价~'
					}
					layim.getMessage(obj);
				}
			},
			clearMsg: function () {
				localStorage.clear();
				$(".layim-chat-system").hide();
				$(this).hide();
				$(".layim-chat-main ul").html("");
				layim.getMessage({
					username: kfName,
					avatar: kfAvatar,
					id: kfId,
					type: kfType,
					content: "请问有什么能够帮助您的？face[可爱] "
				});
			},
			chatLog: function () {
				$(".layui-layer-title").css({
					"background": "#33A9B7",
					"color":"#fff"
				});
			},
			myxs:function(){
				var obj = {
					username: to.name
					, avatar: to.avatar
					, id: to.id
					, type: to.type
					, content: 'face[爱你] 感谢您的评价~'
				}
				layim.getMessage(obj);
			},
			bmyxs:function(){
				var obj = {
					username: to.name
					, avatar: to.avatar
					, id: to.id
					, type: to.type
					, content: 'face[泪] 感谢您的评价~'
				}
				layim.getMessage(obj);
			},
			subOrd:function (){
				layim.getMessage({
					username: kfName,
					avatar: kfAvatar,
					id: kfId,
					type: kfType,
					content: "工单提交成功。 "
				});
			},
			flowMsg:function (){
				var sedM = $(this).html();
				$(".layim-chat-textarea textarea").val(sedM);

			},
		});
	});
})
$(function () {
	if ($(".layim-chat-main ul li").length > 4) {
		$(".clearMsg").show();
	}
})

