<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
<meta name=“viewport” content=“width=device-width; initial-scale=1.0”>  
<meta name="keywords" content="淘宝视频制作,淘宝视频拍摄,淘宝主图视频,淘宝主图视频制作,产品主图视频,电商视频拍摄,淘宝短视频制作,淘宝视频官方拍摄基地">
<meta name="description" content="拍片网于2018年3月被淘宝指定为官方拍摄基地，视频制作服务覆盖98%类目，品质遥遥领先。淘宝主图视频制作，电商产品视频拍摄，官方授权，价格公道，极速出片。淘宝短视频制作就上拍片网！">
<title>淘宝短视频制作-产品主图视频-电商视频拍摄-淘宝视频官方拍摄基地-拍片网</title>
<link rel="stylesheet" type="text/css" href="/resources/css/salesman/special/style.css">
<link rel="stylesheet" type="text/css" href="/resources/css/salesman/special/css.css">
<link rel="shortcut icon" href="/resources/images/favicon.ico">
<script src="/resources/js/salesman/special/jquery-1.8.3.min.js"></script>
<script src="/resources/js/salesman/special/shangqiao.js"></script>
<spring:url value="${file_locate_storage_path}" var="imgBnner" />
<script id="-mob-share" src="https://f1.webshare.mob.com/code/mob-share.js?appkey=8c49c537a706"></script>
<script src="/resources/js/salesman/special/jquery-1.8.3.min.js"></script>
<script src="/resources/js/salesman/special/jquery.flexslider-min.js"></script>


<script>
	function SearchVideo(){  
	   var key=document.getElementById("search-q").value;
		if(key==''){
			key="*"
		}
	   window.location.href="https://www.apaipian.com/search?q="+key;  
	  }  
		
</script>

<style type="text/css">
   .Guide{
    width: 506px;
    padding: 0 !important;
    text-align: center;
    position: absolute;
    top: 75%;
    left: 25%;
    margin-left: -253px;
    }
    
    .Guide a{
    width:200px !important;
    height:40px !important;
    line-height:40px !important;
    background: #FE5453;
    border-radius: 100px;
    font-size: 16px !important;
    color: #FFFFFF;
    padding: 0 !important;
    margin: 0px 25px !important;
    border:none !important;
    }
    
    .Guide a:hover {
    background: #fe2220;
    box-shadow: 3px 3px 3px #000!important;
    }
    
    .banner00{
     min-width:960px !important;
    background:black;
    position: relative;
    }
    .main_top p {
    padding: 0 45px !important;
}

.pageMenu{
	position:absolute;
	z-index: 1;
	text-align: center;
	font-size:14px;
	color:#999;
	letter-spacing: 1px;
	left: -70px;
    top: 20px;
    max-height:200px;
}

.scrollDiv{
height: auto !important;
overflow: auto;
max-height: 270px;
}

.scrollDivTop{
    width: auto !important;
  /*   max-width: 640px;
    overflow-x: auto;
    overflow-y: hidden; */
    background: transparent !important;
}

.scrollDivTop div{
   line-height:24px;
}

.scrollDivTop div:last-child{
   line-height:24px;
   margin-right:0px !important;
}

::-webkit-scrollbar{width:14px;}

.pageMenu  div{
    height: 30px;
    width: 70px;
    background:#fff;
    text-align:center;
    cursor: pointer;
}

.typeMenu{
background: #B3B3B3 !important;
height: 24px !important;
border-radius: 2px 2px 0 0;
color:white !important;
line-height:24px !important;
z-index:99;

}

.typeUp{
 height: 24px !important;
 background:url(/resources/images/salesman/special/up.png) no-repeat center  !important;
 background-size:10px 10px !important;
 background-color: #fff !important;
}
.typeUpTop{
 height: 24px !important;
 background:url(/resources/images/salesman/special/left.png) no-repeat center  !important;
 background-size:10px 10px !important;
 background-color: #fff !important;
 display:none !important;
}
.typeDown{
 height: 24px !important;
 background:url(/resources/images/salesman/special/down.png) no-repeat center  !important;
 background-size:10px 10px !important;
 background-color: #fff !important;
 border-radius:0 0 2px 2px;
 }
 .typeDownTop{
 height: 24px !important;
 background:url(/resources/images/salesman/special/right.png) no-repeat center  !important;
 background-size:10px 10px !important;
 background-color: #fff !important;
 border-radius:0 0 2px 2px;
 display:none !important;
 }
 
  .typeDownTop div{
    display:block
  }

.pageMenu div{
  line-height:30px;
}

.activeMenu{
color:#fe5453 !important;
}

.activeMenuMore{
color:#fe5453 !important;
}

.banner { position: relative;  margin-top:1px; height: auto !important; overflow: hidden; }
.slides { position: relative; z-index: 1; }
.slides li img{width:100%}
.slides li{height: auto !important;}


.kk a{
  transition: all .5s;
  -webkit-transition: all .5s;
}

.setHeight{
height:0 !important
}

.main_pd {
    min-height:400px;
}

.topMenu{
    position:absolute;
    top: -12px;
    left: 9px;
}

.topMenu div{

    height: 24px !important; 
    width: 88px;
    background:#fff;
    text-align:center;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
   
}


/* .aa{
position:absolute;
top:100;
left:200;

} */

</style>
</head>


<input id="imgPath" type="hidden" value="${file_locate_storage_path}">

<body>
	<div class="top">
		<div class="container">
    		<a href="https://www.apaipian.com" target="_blank"><img alt="" class="logo fl" src="/resources/images/salesman/special/bannerLogoR.png" alt="拍片网" /></a>
            <ul class="nav fl">
            	<li><a href="https://www.apaipian.com/resources/salesman/ver/">我要拍片</a></li>
            	<li><a href="https://www.apaipian.com/cost/cal">估算成本</a></li>
            	<li><a href="https://www.apaipian.com/list.html">精品案例</a></li>
            	<li><a href="https://www.apaipian.com/order-flow.html">服务流程</a></li>
            	<li><a href="http://www.apaipian.com/special">特色专题</a></li>
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
	<div class="banner00"><img alt="" src="/resources/images/salesman/special/banner009.jpg" alt="互联网金融"></div>
	
	<div class="main_top">
		<div class="container newCon">
			<h2 class="aa">[ 电商  + 视频 ]<br>内容化时代已经到来</h2>
		    <p style="text-align: center;">淘宝已从追求效率的交易市场平台升级成为追求乐趣的内容化社区化的消费媒体平台，仅2017年4月到2017年12月，淘宝短视频播放量就由原来的3800万次上升至18亿次，净增长4700%。对于商家而言，想要在新的内容生态竞争模式下取得销量的突破，制作精良的短视频无疑是当前最好的选择。运用短视频引爆内容流量，抢占公域导购矩阵，瓜分内容营销红利。拍片网于2018年3月被淘宝指定为官方拍摄基地，视频制作服务覆盖98%类目，作品品质遥遥领先。</p>
	        <div class="toshare"> 
	         <ul class="share">
	                            <li>分享到 : </li>
                                <li class="-mob-share-weixin setShare"></li>
                                <li class="-mob-share-qq setShare"></li>
                                <li class="-mob-share-weibo setShare"></li>
                                <li class="-mob-share-qzone setShare"></li>
              </ul>	
           </div>   	
		</div>
	</div>
	<div class="main_pd">
		
		<div class="container">
		    <div class="topMenu">  
		        <div class="typeUpTop"></div>	
		            <div class="scrollDivTop">
			                <div id="findPage0" class="activeMenuMore allPage" data-id="*">全部</div>
					        <div id="findPage1" class="findPageTop" data-id="0">TVC</div>
					        <div id="findPage2" class="findPageTop" data-id="1">微电影</div>
					        <div id="findPage3" class="findPageTop" data-id="2">MG动画</div>
					        <div id="findPage4" class="findPageTop" data-id="3">功能介绍</div>
					        <div id="findPage6" class="findPageTop" data-id="4">品牌片</div>
					        <div id="findPage7" class="findPageTop" data-id="5">产品宣传片</div>
					        <div id="findPage8" class="findPageTop" data-id="6">企业宣传片</div>
				     </div>   
		        <div class="typeDownTop"></div>
		    </div>
		    
		    <div class="pageMenu">
		        <div class="typeMenu">分类</div>		  
		        <div class="typeUp"></div>	
		            <div class="scrollDiv">
		                <div id="findPage0" class="activeMenu findPage" data-id="*">全部</div>
				        <div id="findPage1" class="findPage" data-id="0">轿车</div>
				        <div id="findPage2" class="findPage" data-id="1">轿跑车</div>
				        <div id="findPage3" class="findPage" data-id="2">跑车</div>
				        <div id="findPage4" class="findPage" data-id="3">SUV</div>
				        <div id="findPage6" class="findPage" data-id="4">商务车</div>
				        <div id="findPage7" class="findPage" data-id="5">轻卡</div>
				        <div id="findPage8" class="findPage" data-id="6">重卡</div>
				        <div id="findPage9" class="findPage" data-id="7">皮卡</div>
				        <div id="findPage10" class="findPage" data-id="8">客车</div>
				     </div>   
		        <div class="typeDown"></div>
		    </div>
		    
		    
		    
			<ul class="channel">
			

				
			</ul>
			
		</div>
	</div>
	<div class="bot main_4">
				<span>版权信息</span><br>本站视频作品采用知识共享署名-非商业性使用 本站不提供任何视听上传服务<br>所有内容均来自视频分享站点所提供的公开引用资源<br>© 2018 北京拍片乐科技有限公司 京ICP备16066831号-1
    </div>
	<div class="go-top hide" id="go-top">
		<a href="http://p.qiao.baidu.com/cps/chat?siteId=11228634&userId=23382165" target="_blank" class="uc-2vm"></a>
		<a href="https://www.apaipian.com/cost/cal" target="_blank" class="feedback"></a>
		<a href="javascript:(0);" class="go"></a>
	</div>
</body>
<script src="/resources/js/salesman/special/channel09.js"></script>
</html>
