<%@ page contentType="text/html;charset=UTF-8"%>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
<meta name=“viewport” content=“width=device-width; initial-scale=1.0”> 
<title>热门频道-短视频分享-拍片网</title>
<link rel="stylesheet" type="text/css" href="/resources/css/salesman/special/style.css">
<script src="/resources/js/salesman/special/jquery-1.8.3.min.js"></script>
<script src="/resources/js/salesman/special/shangqiao.js"></script>
<script>
	function SearchVideo(){  
	   var key=document.getElementById("search-q").value;
		if(key==''){
			key="*"
		}
	   window.location.href="https://www.apaipian.com/search?q="+key;  
	  }  
</script>
</head>

<body>
	<div class="top">
		<div class="container">
    		<a href="https://www.apaipian.com" target="_blank"><img class="logo fl" src="/resources/images/salesman/special/bannerLogoR.png" alt="拍片网" /></a>
            <ul class="nav fl">
            	<li><a href="https://www.apaipian.com/resources/salesman/ver/">我要拍片</a></li>
            	<li><a href="https://www.apaipian.com/cost/cal">估算成本</a></li>
            	<li><a href="https://www.apaipian.com/list.html">精品案例</a></li>
            	<li><a href="https://www.apaipian.com/order-flow.html">服务流程</a></li>
            	<li><a href="https://www.apaipian.com/special">特色专题</a></li>
            	<li><a href="http://factory.apaipian.com/">拍片工厂</a></li>
            	<li><a href="https://www.apaipian.com/news-list.html">新闻资讯</a></li>
            </ul>
			<div class="search fl">
				<input placeholder="作品名称，类型，风格，公司信息" id="search-q">
				<i onclick="SearchVideo()"></i>
			</div><!--
			<p class="login fr"><a href="https://www.apaipian.com/login">登录</a> &emsp; <a href="https://www.apaipian.com/register">注册</a></p>-->
            <div class="clear"></div>
		</div>
	</div>
	<div class="top2"></div>
	<div class="banner">
        <ul class="slides">
            <li class="bgitem" style="background:url(/resources/images/salesman/special/banner1.jpg) 50% 50% no-repeat;"></li>
            <li class="bgitem" style="background:url(/resources/images/salesman/special/banner2.jpg) 50% 50% no-repeat;"></li>
            <li class="bgitem" style="background:url(/resources/images/salesman/special/banner3.jpg) 50% 50% no-repeat;"></li>
        </ul>
    </div>
    <script src="/resources/js/salesman/special/jquery.flexslider-min.js"></script>
    <script>
    $(function(){
        $('.banner').flexslider({
            directionNav: true,
			slideshowSpeed: 5000,
            pauseOnAction: false
        });
    });
    </script>
	
	<div class="pindao">
		<div class="container">
			<div class="jsz"></div>
			<p class="choice"><a href="http://p.qiao.baidu.com/cps/chat?siteId=11228634&userId=23382165" target="_blank"><i></i>撩一下客服MM</a> &emsp;&emsp; <a href="https://www.apaipian.com/list.html"><i></i>佛系地随意逛逛</a> &emsp;&emsp; <a href="https://www.apaipian.com/special"><i></i>去看看精选专题</a> &emsp;&emsp; <a href="https://www.apaipian.com/news-list.html"><i></i>学习点拍片知识</a> &emsp;&emsp; <a href="https://www.apaipian.com/beta"><i></i>传递到官网首页</a></p>
		</div>
	</div>
	<div class="foot">
		<div class="container">
			<ul class="foot_nav">
				<li class="gzh"><img src="/resources/images/salesman/special/code_pai.png" width="111" height="110"><br>扫一扫 关注官方微信</li>
				<li class="f_nav">
					<h2>登录</h2>
					<a class="sml cusLogin" href="https://www.apaipian.com/login?role=user" target="_blank">客户登录</a><br>
					<a class="sml proLogin" href="https://www.apaipian.com/login?role=director" target="_blank">导演登陆</a><br><br>
					<a class="sml reg" href="https://www.apaipian.com/register" target="_blank">注册</a>
				</li>
				<li class="f_nav">
					<h2>关于拍片网</h2>
					<a href="https://www.apaipian.com/about-us.html" target="_blank">了解我们</a><br>
					<a href="https://www.apaipian.com/member.html#join-us" target="_blank">加入我们</a><br>
					<a href="https://www.apaipian.com/company-activity.html" target="_blank">公司活动</a><br>
					<a href="https://www.apaipian.com/member.html#activityPart" target="_blank">团队介绍</a>
				</li>
				<li class="f_nav">
					<h2>服务</h2>
					<a href="https://www.apaipian.com/order-flow.html" target="_blank">服务流程</a><br>
					<a href="https://www.apaipian.com/company-service.html#servicePart" target="_blank">服务协议</a>
				</li>
				<li class="f_nav">
					<h2>在线联系我们</h2>
					<a class="sml cusSer codeshow" href="Javascript:void(0)">客户客服
						<div class="code hide"><img src="images/code_ke.jpg"><br>客户客服</div>
					</a><br>
					<a class="sml proSer codeshow" href="Javascript:void(0)">创作团队客服
						<div class="code hide"><img src="images/code_dao.jpg"><br>创作团队客服</div>
					</a><br>
					<a class="sml email" href="mailto:bdmarket@paipianwang.cn">bdmarket@paipianwang.cn</a>
				</li>
				<li class="f_nav">
					<h2>咨询电话</h2>
					<p><font>400-660-9728</font><br>工作时间 9:00-18:00 (周一至周五)</p>
				</li>
			</ul>
			<div class="bot">
				<span>版权信息</span><br>本站视频作品采用知识共享署名-非商业性使用 本站不提供任何视听上传服务<br>所有内容均来自视频分享站点所提供的公开引用资源<br>© 2018 北京拍片乐科技有限公司 京ICP备16066831号-1
			</div>
		</div>
	</div>
	<div class="go-top hide" id="go-top">
		<a href="http://p.qiao.baidu.com/cps/chat?siteId=11228634&userId=23382165" target="_blank" class="uc-2vm"></a>
		<a href="https://www.apaipian.com/cost/cal" target="_blank" class="feedback"></a>
		<a href="javascript:(0);" class="go"></a>
	</div>
</body>
</html>
