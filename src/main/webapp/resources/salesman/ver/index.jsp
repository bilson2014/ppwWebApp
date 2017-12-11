<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->

<head>
<meta charset="utf-8">
<meta name="keywords" content="宣传片制作,企业宣传片,宣传片拍摄,宣传片价格">
<meta name="description" content="拍片网企业宣传片制作创意策划完全免费，企业宣传片拍摄价格多少？宣传片是按照什么标准定价的？商业视频内容 制作平台：宣传片、广告片、MG动画、微电影，成本劲省30%。">
<title>宣传片制作价格-企业宣传片拍摄-拍片网</title>
<link rel="stylesheet" href="/resources/css/modelTool.css">
<link rel="stylesheet" href="/resources/css/index.css">
<link rel="stylesheet" type="text/css" href="css/style.css">
<script src="js/jquery-1.8.3.min.js"></script>
<script src="js/jquery.SuperSlide.2.1.1.js"></script>
<script type="text/javascript" src="/resources/js/common.js"></script>
<script src="js/leftTime.js"></script>
<link rel="shortcut icon" href="${imgPath }/favicon.ico" >

<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?93ab42264ae7c05828fe3f88b039b7a6";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
</head>

<body>
<input type='hidden' id='csrftoken'>

   <jsp:include flush="true" page="../../../WEB-INF/pages/header.jsp"></jsp:include>

    <div class="banner slideBox" id="slideBox">
			<div class="bd">
				<ul>
					<li><img src="images/banner3.jpg" /></li>
				</ul>
			</div>
    </div>
 

    <div class="main_2">
    	<div class='boxtitle'></div>
    	<div class='twobox'>
    	 	<div class='left'>
    	 		<div class='topp'></div>
    	 		<div class='center'></div>
    	 		<div class='bot'><a href="javascript:void(0)" onclick="openwin()"></a></div>	        	
    	 	</div>
    	 	<div class='left'>
    	 		<div class='topp' ></div>
    	 		<div class='center'></div>
    	 		<div class='bot'><a href="javascript:void(0)" onclick="openwin()"></a></div>
    	 	</div>
    	 	<div class='left'>
    	 		<div class='topp'></div>
    	 		<div class='center'></div>
    	 		<div class='bot'><a href="javascript:void(0)" onclick="openwin()"></a></div>	
    	 	</div>
    	 	<div class='left'>
    	 		<div class='topp'></div>
    	 		<div class='center'></div>
    	 		<div class='bot'><a href="javascript:void(0)" onclick="openwin()"></a></div>
    	 		<!-- <div class='bot'><a href='http://p.qiao.baidu.com/cps/chat?siteId=11228634&userId=23382165' target='_blank'></a></div> -->
    	 	</div>
    	</div>
    
    </div>
    <div class="main_3" id="baoming">
    	<div class="container">
        	<div class="zxbox">
                <div class="inpbox">
                    <div class="box-1">
                        <input type="text" name="user_name" id="user_name" placeholder="您的称呼" class="tab1"/>
                        <div id="noUserError" class="noUserError">error</div>
                    </div>
                    <div class="box-2">
                        <input type="text" type="text" name="mob" id="mob" placeholder="手机号码" class="tab2"/>
                        <div id="sendPhoneError" class="sendPhoneError">error</div>
                        <input value="获取验证码" type="button" class="tab3" id="sendCode"/>
                    </div>
                    
                    <div class="box-3">
                        <input type="text" name="code" id="code" placeholder="验证码" class="tab4"/>
                        <div id="sendCodeError" class="sendCodeError">error</div>                            
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="tijiao">
                    <input  value="" class="tab5" name="submit" id="submit"  href="javascript:void(0);"/>
                    <div id="sendResult" class="sendResult">error</div>
                </div>
            </div>	
        </div>
    </div>
    <div class="main_4">
    	
    </div>
    
    
    <div class="main_1"></div>
    <div class="main_22">
    	<div class="container">
            <ul class="data">
            	<li><span>500<sup>+</sup></span> 家<br>成功合作客户</li>
                <li><span>5960</span> 多部<br>累计制作影片</li>
                <li><span>35800</span> 余<br>专业创作者加盟</li>
            </ul>
        </div>
        
          <div class="zixun" id="zixun">
          	<a href="javascript:void(0)" onclick="openwin()"></a>
        	<!-- <a href="http://p.qiao.baidu.com/cps/chat?siteId=11228634&userId=23382165" target='_blank'></a> -->
            <a href="#baoming" class="adv_active"></a>
        </div>
        
    </div>
    
    <jsp:include flush="true" page="../../../WEB-INF/pages/foot.jsp"></jsp:include> 
    
 
    <script>
   // document.domain = "apaipian.com";
  	var urlContext="http://www.apaipian.com";
  //  var urlContext="http://localhost:8080";
    
    
    var InterValObj; // timer变量，控制时间 - 注册
    var InterValRecoverObj; // timer变量，控制时间 - 密码找回
    var count = 120; // 间隔函数，1秒执行
    var curCount = 0; // 当前剩余秒数 - 注册
    var sendCode;
    var sendResult=true;
    
		$(document).ready(function(e) {
			 $(window.parent.document).find('.frame').css('height',$('body').height());
			 
			 $.ajax({
				  type: 'POST',
				  url: urlContext+'/getStorageUrl',
				  //data: data,
				  success:function(data){
					  $('#video1').attr('src',data.message+'/group1/M00/00/1C/CgpsbFiBDwiAF6EXBJzyrI8QQR0640.mp4');
					  $('#video2').attr('src',data.message+'/group1/M00/00/02/CgpsbFhfoJiAc37mAbir209g1Fs380.mp4');
					  $('#video3').attr('src',data.message+'/group1/M00/00/AC/Cgpw7FnLqAiAELUTAG9s7kqmTbQ166.mp4');
					  $('#video4').attr('src',data.message+'/group1/M00/00/B4/Cgpw7FoFXt-AP4z7AGj7aRh6ppc907.mp4');
				  },
				error:function(data){
				}, 
				dataType: 'json',
				//jsonpCallback:"cb"
			});
			//token
			$.ajax({
				  type: 'POST',
				  url: urlContext+'/getToken',
				  //data: data,
				  success:function(data){
					  $("#csrftoken").val(data.message);
				  },
				error:function(data){
				}, 
				dataType: 'json',
				//jsonpCallback:"cb"
			});
			
			$("#case_list li").click(function(){
				var i = $(this).index();
				$("#video").show();
				$("#video video:eq("+i+")").show();	 
			});
			
			$("#close").click(function(){
				for(var i=0;i<4;i++){
					var myVideo = document.getElementsByTagName('video')[i];
					myVideo.pause();
        		}
				$("#video").hide();
				$("#video video").hide();	 
			});
			
			$(".tab3").click(function(){
				
				if (curCount == 0) {
					$('#noUserError').hide();
					$('#sendPhoneError').hide();
					$('#sendPhoneError').hide();
					$('#sendCodeError').hide();
					$('#sendResult').hide();
					var phone=$("#mob").val();
					if (phone == '') {
						$('#sendPhoneError').show();
						$('#sendPhoneError').text('* 请填写手机号');
						return false;
					}
					if (!checkMobile(phone)) {
						$('#sendPhoneError').show();
						$('#sendPhoneError').text('* 手机格式不正确');
						return false;
					}
					curCount = count;
					$('#sendCode').val('已发送(' + curCount + ')');
					$('#sendCode').attr('disabled', true);
					InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器，
					
					  $.ajax({
						  type: 'POST',
						  url: urlContext+'/login/verification/'+$('#mob').val(),
						  //data: data,
						  success:function(data){
							  if(data){
								  //验证码发送成功
								  $('#sendCodeError').show();
								  $('#sendCodeError').text('验证码发送成功');
							  }else{
								  //验证码发送失败
								  $('#sendCodeError').show();
								  $('#sendCodeError').text('验证码发送失败');
							  }
						  },
						error:function(data){
						
						},
						dataType: 'json',
						//jsonpCallback:"cb"
					});   
				}			 
			});
			 
		
			$("#submit").click(function(){
				$('#noUserError').hide();
				$('#sendPhoneError').hide();
				$('#sendPhoneError').hide();
				$('#sendCodeError').hide();
				$('#sendResult').hide();
				var phone=$("#mob").val();
				
				var checkCode =$('#code').val();
				var realName=$('#user_name').val();
				if (realName == '') {
					$('#noUserError').show();
					$('#noUserError').text('* 请填写您的称呼');
					return false;
				}
				if (phone == '') {
					$('#sendPhoneError').show();
					$('#sendPhoneError').text('* 请填写手机号');
					return false;
				}
				if (!checkMobile(phone)) {
					$('#sendPhoneError').show();
					$('#sendPhoneError').text('* 手机格式不正确');
					return false;
				}

				if (checkCode == '') {
					$('#sendCodeError').show();
					$('#sendCodeError').text('* 请输入验证码');
					return false;
				}
				if(sendResult && checkCode==sendCode){
					return false;
				}
				$("#submit").attr('disabled', true);
				sendCode=checkCode;
				sendResult=false;
			 $.ajax({
					url : urlContext+'/order/deliver',
					type : 'POST',
					data : {
						csrftoken : $("#csrftoken").val(),
						indent_tele : phone,
						phoneCode : '-1',
						indent_recomment : '线上-SEM-价格区间',
						indentName : '线上-SEM',
						productId : -1,
						teamId : -1,
						serviceId : -1,
						sendToStaff : true,
						sendToUser : false,
						phoneCode :checkCode,
						realName:realName,
						indentSource : 22
					},
					dataType : 'json',
					/* jsonpCallback:"cb",  */
					success : function(data) {
						$("#submit").attr('disabled', false);
						if(data.ret){
							$('#sendResult').show();
							$('#sendResult').text('申请成功');
							sendResult=true;
						}else{
							$('#sendResult').show();
							$('#sendResult').text('申请失败');
						}
					 }
				}); 
			});
		}); 
		function checkMobile(str) {
			var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
			if(str.match(reg)){
				return true;
			} else{
				return false;
			}
		}
		function SetRemainTime() {
			if (curCount == 0) {
				window.clearInterval(InterValObj); // 停止计时器
				sendCode = true;
				$('#sendCode').val('重新获取');
				//$('#sendCode').removeAttr('disabled')
				$("#sendCode").attr('disabled', false);
				// 清除session code
				getData(function(data) {
					console.log(data);
					// 清除session code
				}, urlContext + '/login/clear/code');
			} else {
				curCount--;
				$("#sendCode").val('已发送(' + curCount + ')');
			}
		}
		
		function openwin() {
	        window.open("http://p.qiao.baidu.com/cps/chat?siteId=11228634&userId=23382165","newwindow","width=600,height=600,left=400,top=100,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=n o, status=no")
	        }
	    	
	    $(document).ready(function(e){
	            var subNav_active = $(".adv_active");
	            var subNav_scroll = function(target){
	                subNav_active = target.parent();
	            };
	            $("#zixun a").click(function(){
	                subNav_scroll($(this));
	                var target = $(this).attr("href");
	                var targetScroll = $(target).offset().top;
	                $("html,body").animate({scrollTop:targetScroll},300);
	                return false;
	            });
	    		
	    		var winwith=document.body.clientWidth;
	    		var imgheight=winwith/3;
	    		$(".slideBox").height(imgheight);
	    		$(".slideBox .bd").height(imgheight);
	    		$(".slideBox .bd img").width(winwith);
	    		
	    		$(window).resize(function(){
	    			var winwith=document.body.clientWidth;
	    			var imgheight=winwith/3;
	    			$(".slideBox").height(imgheight);
	    			$(".slideBox .bd").height(imgheight);
	    			$(".slideBox .bd img").width(winwith);
	    		});

	        }());
    </script>

</body>
</html>
