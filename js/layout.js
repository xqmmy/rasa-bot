//日期
layui.use('laydate', function(){
  var laydate = layui.laydate;
  laydate.render({
    elem: '#start_date'
  });
  laydate.render({
    elem: '#end_date'
  });
});
var formatDateTime = function (date) {  
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = date.getHours();  
        h=h < 10 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        var second=date.getSeconds();  
        second=second < 10 ? ('0' + second) : second;  
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
    };
    
//首页-------------------------------------------------------------------------------------------
//表格
$("#searchHH").click(function (){
	if($("select[name='index']").val()==""){
		$("#warningMsg").html("请输入索引。")
		return false;
	}
	if($("input[name='start_time']").val()==""){
		$("#warningMsg").html("请选择开始日期。")
		return false;
	}
	if($("input[name='end_time']").val()==""){
		$("#warningMsg").html("请选择结束日期。")
		return false;
	}
	$("#warningMsg").html("")
	var params = $("#searchId").serializeArray();
    var j = {};
    for (var item in params) {
        j[params[item].name] = params[item].value;
    }
	$.ajax({
		url:"https://kf.shsunshine.org/web_es/read/read_fromes",
		dataType:"json",
        type: "post",
        traditional:true,
        contentType:"application/json",
        data:JSON.stringify(j),
        async:false,
        success:function (v){
    		$("#hidCount").val(v.result.length);
        	if($("select[name='index']").val()=="wechat_nosign"){
        		layui.use('laypage', function(){
					var laypage = layui.laypage;
					laypage.render({
						elem: 'pageCount',
						count: v.result.length,
						limit:20,
						jump: function(obj, first){
							var tdH="";
							var tot=0;
							if((obj.curr-1)*20+20<v.result.length){
								tot=(obj.curr-1)*20+20;
							}else{
								tot=v.result.length;
							}
			        		for(var i=((obj.curr-1)*20);i<tot;i++){
		        				var MsgSDate=v.result[i].MsgSendDate;
								var md=MsgSDate.split("T");
								var md2=md[1].split(".");
								var md3=md[0].split("-");
								var md4=md2[0].split(":");
								var hours;
								if((Number(md4[0])+8)>=24){
									hours = 0;
								}else{
									hours=(Number(md4[0])+8)
								}
								if(v.result[i].MsgContent.includes('@玑脉技术支持')==true){
									var ms = v.result[i].MsgContent.split("@玑脉技术支持")[1];
									ms.replace(" ","");
								}else{
									var ms = v.result[i].MsgContent;
								}
								
								var m=new Date(md3[0],(Number(md3[1])-1),md3[2],hours,md4[1],md4[2]);
								MsgSDate = formatDateTime(m);
			        			tdH += `<tr><td title="用户名称">`+v.result[i].MsgFromNick+`</td>
					        			<td title="群名称">`+v.result[i].RoomTopic+`</td>
					        			<td title="发送时间">`+MsgSDate+`</td>
					        			<td title="消息内容">`+ms+`</td></tr>`;
			        		}
			        		if(v.result.length<=0){
			        			tdH=`<tr><td colspan="4">暂无数据</td></tr>`;
			        		}
			        		var tableH = `<thead>
			        						<tr>
							        		<th width="200">用户名称</th>
							        		<th width="300">群名称</th>
							        		<th width="200">发送时间</th>
							        		<th width="600">消息内容</th></tr>
							        		</thead><tbody>`+tdH+`</tbody>`;
			        		$("#msgHH").html(tableH);
						}
					});
				});
        		
        	}else if($("select[name='index']").val()=="response_result"){
        		layui.use('laypage', function(){
					var laypage = layui.laypage;
					laypage.render({
						elem: 'pageCount',
						count: v.result.length,
						limit:20,
						jump: function(obj, first){
							var tdH="";
							var tot=0;
							if((obj.curr-1)*20+20<v.result.length){
								tot=(obj.curr-1)*20+20;
							}else{
								tot=v.result.length;
							}
			    			var tdH="",MsgFromNic="",RoomTopic="",MsgSendDate="",message="",text="",MsgSendDate2="";
			        		for(var i=((obj.curr-1)*20);i<tot;i++){
			        			if(v.result[i].input.sender !="jitesh97"){
			        				if(!v.result[i].input.desc){
			        					MsgFromNick="空";
			        					RoomTopic="空";
			        					MsgSendDate="空";
			        					message="空";
			        				}else{
			        					if(!v.result[i].input.desc.MsgFromNick){
				        					MsgFromNick="空";
				        				}else{
											MsgFromNick=v.result[i].input.desc.MsgFromNick;
				        				}
				        				if(!v.result[i].input.desc.RoomTopic){
				        					RoomTopic="空";
				        				}else{
											RoomTopic=v.result[i].input.desc.RoomTopic;
				        				}
				        				if(!v.result[i].input.desc.MsgSendDate){
				        					MsgSendDate="空";
											MsgSendDate2="空";
				        				}else{
											MsgSendDate=v.result[i].input.desc.MsgSendDate;
											var md=MsgSendDate.split("T");
											var md2=md[1].split(".");
											var md3=md[0].split("-");
											var md4=md2[0].split(":");
											var hours;
											if((Number(md4[0])+8)>=24){
												hours = 0;
											}else{
												hours=(Number(md4[0])+8)
											}
											var m=new Date(md3[0],(Number(md3[1])-1),md3[2],hours,md4[1],md4[2]);
											var m2=new Date(md3[0],(Number(md3[1])-1),md3[2],hours,md4[1],(Number(md4[2])+2));
											MsgSendDate = formatDateTime(m);
											MsgSendDate2 = formatDateTime(m2);
				        				}
				        				if(!v.result[i].input.message){
				        					message="空";
				        				}else{
				        					if(v.result[i].input.message.includes('@玑脉技术支持')==true){
												message=v.result[i].input.message.split("@玑脉技术支持")[1];
												message.replace(" ","");
											}else{
												message=v.result[i].input.message;
											}
				        				}
			        				}
			        				if(v.result[i].result!=""&&v.result[i].result!=null&&v.result[i].result!="undefind"){
			        					text=v.result[i].result[0].text;
			        				}else{
			        					text="暂无回复";
			        				}
					        		tdH += `<tr><td title="用户名称">`+MsgFromNick+`</td>
							        			<td title="群名称">`+RoomTopic+`</td>
							        			<td title="发送时间">`+MsgSendDate+`</td>
							        			<td title="消息内容">`+message+`</td>
							        			<td title="详情" class="paren">
							        				<a class="fontC tableAD" value="`+i+`">详情</a>
							        				<div style="display:none">
							        					<p class="uname">`+MsgFromNick+`</p>
							        					<p class="umsg">`+message+`</p>
							        					<p class="udate">`+MsgSendDate+`</p>
							        					<p class="udate2">`+MsgSendDate2+`</p>
							        					<p class="xmsg">`+text+`</p>
							        					<p class="roomNam">`+RoomTopic+`</p>
							        				</div>
							        			</td></tr>`;
				        		}else{
			        				if(v.result[i].result!=""&&v.result[i].result!=null&&v.result[i].result!="undefind"){
			        					text=v.result[i].result[0].text;
			        				}else{
			        					text="暂无回复";
			        				}
			        				MsgSendDate=v.result[i].job_enqueued_at;
									var md=MsgSendDate.split("T");
									var md2=md[1].split(".");
									var md3=md[0].split("-");
									var md4=md2[0].split(":");
									var hours;
									if((Number(md4[0])+8)>=24){
										hours = 0;
									}else{
										hours=(Number(md4[0])+8)
									}
									var m=new Date(md3[0],(Number(md3[1])-1),md3[2],hours,md4[1],md4[2]);
									var m2=new Date(md3[0],(Number(md3[1])-1),md3[2],hours,md4[1],(Number(md4[2])+2));
									MsgSendDate = formatDateTime(m);
									MsgSendDate2 = formatDateTime(m2);
									if(v.result[i].input.message.includes('@玑脉技术支持')==true){
										message=v.result[i].input.message.split("@玑脉技术支持")[1];
										message.replace(" ","");
									}else{
										message=v.result[i].input.message;
									}
				        			tdH += `<tr><td title="用户名称">未知用户</td>
							        			<td title="群名称">群聊小助手</td>
							        			<td title="发送时间">`+MsgSendDate+`</td>
							        			<td title="消息内容">`+message+`</td>
							        			<td title="详情" class="paren">
							        				<a class="fontC tableAD" value="`+i+`">详情</a>
							        				<div style="display:none">
							        					<p class="uname">未知用户</p>
							        					<p class="umsg">`+v.result[i].input.message+`</p>
							        					<p class="udate">`+MsgSendDate+`</p>
							        					<p class="udate2">`+MsgSendDate2+`</p>
							        					<p class="xmsg">`+text+`</p>
							        					<p class="roomNam">群聊小助手</p>
							        				</div>
							        			</td></tr>`;
				        		}
				        		if(v.result.length<=0){
				        			tdH=`<tr><td colspan="4">暂无数据</td></tr>`;
				        		}
			        			var tableH = `<thead>
				        						<tr>
								        		<th width="200">用户名称</th>
								        		<th width="300">群名称</th>
								        		<th width="250">发送时间</th>
								        		<th width="600">消息内容</th>
								        		<th width="100">更多</th></tr>
								        		</thead><tbody>`+tdH+`</tbody>`;
				        		$("#msgHH").html(tableH); 
			        		}
						}
					})
				})
        	}
        },
        error:function (v){
        	console.log(v)
        	alert("网络连接错误。")
        }
	})
})
//历史消息框
$("#msgHH").on("click",".tableAD",function (){
	var n=$(this).attr("value");
	var html = `<div class="msgnameInfo">
					<span class="msgname">`+$(this).siblings('div').find(".uname").html()+`</span>
					<span class="msgtime">`+$(this).siblings('div').find(".udate").html()+`</span>
				</div>
				<div class="msgContent">
					<p class="msgText">`+$(this).siblings('div').find(".umsg").html()+`</p>
				</div>
				<div class="msgnameInfo">
					<span class="msgname">玑脉技术支持</span>
					<span class="msgtime">`+$(this).siblings('div').find(".udate2").html()+`</span>
				</div>
				<div class="msgContent">
					<p class="msgText">`+$(this).siblings('div').find(".xmsg").html()+`</p>
				</div>`;
	var roon = $(this).siblings('div').find(".roomNam").html()+"消息详情";
	$(".msgWin").html(html);
	layui.use('layer', function(){
		var layer = layui.layer;
			layer.open({
			type: 1, 
			title:roon,
			skin:"msgWin2",
			area: ['500px', '300px'],
			offset: 'auto',
			zIndex:9999999,
			content:$(".msgWin"),
			anim: 4
		});
	}); 
})	


