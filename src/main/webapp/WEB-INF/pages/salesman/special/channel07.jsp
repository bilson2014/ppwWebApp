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
	left: -60px;
    top: 20px;
     max-height:200px;
}

.scrollDiv{
height: auto !important;
overflow: auto;
max-height: 270px;
}

::-webkit-scrollbar{width:14px;}

.pageMenu  div{
    height: 30px;
    width: 60px;
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

}

.typeUp{
 height: 24px !important;
 background:url(/resources/images/salesman/special/up.png) no-repeat center  !important;
 background-size:10px 10px !important;
 background-color: #fff !important;
}
.typeDown{
 height: 24px !important;
 background:url(/resources/images/salesman/special/down.png) no-repeat center  !important;
 background-size:10px 10px !important;
 background-color: #fff !important;
 border-radius:0 0 2px 2px;
 }

.pageMenu div{
  line-height:30px;
}

.activeMenu{
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

/* .aa{
position:absolute;
top:100;
left:200;

} */

</style>
</head>

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
	<div class="banner">
		 <ul class="slides">
           <!--  <li class="bgitem" style="background:url(/resources/images/salesman/special/c7b1.jpg) 50% 50% no-repeat;"></li>
            <li class="bgitem" style="background:url(/resources/images/salesman/special/c7b2.jpg) 50% 50% no-repeat;"></li>
            <li class="bgitem" style="background:url(/resources/images/salesman/special/c7b3.jpg) 50% 50% no-repeat;"></li> -->
            <li class="bgitem"><img src="/resources/images/salesman/special/c7b1.jpg"></li>
            <li class="bgitem"><img src="/resources/images/salesman/special/c7b2.jpg"></li>
            <li class="bgitem"><img src="/resources/images/salesman/special/c7b3.jpg"></li>
        </ul>
	</div>
	
	
	
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
		    <div class="pageMenu">
		        <div class="typeMenu">分类</div>		  
		        <div class="typeUp"></div>	
		            <div class="scrollDiv">
				        <div id="findPage1" class="activeMenu findPage" data-id="0">全部</div>
				        <div id="findPage2" class="findPage" data-id="1">家居</div>
				        <div id="findPage3" class="findPage" data-id="2">数码</div>
				        <div id="findPage4" class="findPage" data-id="3">亲子</div>
				        <div id="findPage6" class="findPage" data-id="4">护肤</div>
				        <div id="findPage7" class="findPage" data-id="5">电器</div>
				        <div id="findPage8" class="findPage" data-id="6">彩妆</div>
				        <div id="findPage3" class="findPage" data-id="7">美食</div>
				        <div id="findPage4" class="findPage" data-id="8">车品</div>
				        <div id="findPage6" class="findPage" data-id="9">萌宠</div>
				        <div id="findPage7" class="findPage" data-id="10">服饰</div>
				        <div id="findPage8" class="findPage" data-id="11">游戏</div>
				        <div id="findPage8" class="findPage" data-id="12">手作</div>
				        <div id="findPage8" class="findPage" data-id="13">文化</div>
				        <div id="findPage8" class="findPage" data-id="14">匠人</div>
				        <div id="findPage8" class="findPage" data-id="18">运动</div>
				        <div id="findPage8" class="findPage" data-id="15">旅行</div>
				        <div id="findPage8" class="findPage" data-id="16">动漫</div>
				        <div id="findPage8" class="findPage" data-id="17">其他</div>
				     </div>   
		        <div class="typeDown"></div>
		    </div>
			<ul class="channel">
			
			
				<li class="page1 pageAni">
					<div class="kk">
						<a href="http://www.apaipian.com/play/1910_29748.html" target="_blank">
							<span>
								<img alt='苍山 Cangshan-刀具' src="${imgBnner}group1/M00/00/CD/CgptuFrpneyAE6zBAAGD43_4XRQ641.jpg">
								<i></i>
							</span>
							<font>苍山 Cangshan-刀具</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="http://www.apaipian.com/play/1910_29797.html" target="_blank">
							<span>
								<img alt='Teabox-茶壶' src="${imgBnner}group1/M01/01/06/CgpmTlrqjqGAWLYIAADzDmS44gs253.jpg">
								<i></i>
							</span>
							<font>Teabox-茶壶</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29754.html" target="_blank">
							<span>
								<img alt='OXO-炒锅' src="${imgBnner}group1/M01/00/CD/CgptuFrppF-ASsazAAEAyAsvh1Y641.jpg">
								<i></i>
							</span>
							<font>OXO-炒锅</font>
						</a>
					</div>
				</li>
				
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29795.html" target="_blank">
							<span>
								<img alt='OXO-储物罐' src="${imgBnner}group1/M01/00/CD/CgptuFrqj6iAD_enAAKzx7A_1fQ577.jpg">
								<i></i>
							</span>
							<font>OXO-储物罐</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29791.html" target="_blank">
							<span>
								<img alt='VARIDESK-地垫' src="${imgBnner}group1/M00/00/CD/CgptuFrqkQaAK_Z3AAEn6-VGnY0542.jpg">
								<i></i>
							</span>
							<font>VARIDESK-地垫</font>
						</a>
					</div>
				</li>
				
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29753.html" target="_blank">
							<span>
								<img alt='Zestkit-饭盒' src="${imgBnner}group1/M01/00/CB/CgpsbFrpo06AXglLAAH-vMHndGg370.jpg">
								<i></i>
							</span>
							<font>Zestkit-饭盒</font>
						</a>
					</div>
				</li>
				
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29766.html" target="_blank">
							<span>
								<img alt='Sterline-蔬菜切片机' src="${imgBnner}group1/M00/00/CD/CgptuFrprjmAQmV0AAEyIZAsEAQ765.jpg">
								<i></i>
							</span>
							<font>Sterline-蔬菜切片机</font>
						</a>
					</div>
				</li>
				
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29784.html" target="_blank">
							<span>
								<img alt='simplehuman-纸巾架' src="${imgBnner}group1/M01/01/04/Cgpw7Frqk_qAE9I9AADDuhqAHKA951.jpg">
								<i></i>
							</span>
							<font>simplehuman-纸巾架</font>
						</a>
					</div>
				</li>
				
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/9_29726.html" target="_blank">
							<span>
								<img alt='明基 BenQ-投影仪' src="${imgBnner}group1/M01/00/CA/CgpsbFrdiSiAWhmKAAE4pvn92H0971.jpg">
								<i></i>
							</span>
							<font>明基 BenQ-投影仪</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="http://www.apaipian.com/play/1910_29838.html" target="_blank">
							<span>
								<img alt='Nest-摄像头' src="${imgBnner}group1/M01/00/CB/CgpsbFrqqbaAeofwAADkWGKZEtc461.jpg">
								<i></i>
							</span>
							<font>Nest-摄像头</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29852.html" target="_blank">
							<span>
								<img alt='三星 Samsung-平板电脑' src="${imgBnner}group1/M01/01/04/Cgpw7FrqzPuAZNUvAADmGT3oErk393.jpg">
								<i></i>
							</span>
							<font>三星 Samsung-平板电脑</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29853.html" target="_blank">
							<span>
								<img alt='华硕 ASUS-路由器' src="${imgBnner}group1/M01/00/CB/CgpsbFrqzj6AbdqKAAFczrAPMsA183.jpg">
								<i></i>
							</span>
							<font>华硕 ASUS-路由器</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29854.html" target="_blank">
							<span>
								<img alt='华硕 ASUS-电脑' src="${imgBnner}group1/M01/01/06/CgpmTlrqz0SALfRRAAIelivp6Z0670.jpg">
								<i></i>
							</span>
							<font>华硕 ASUS-电脑</font>
						</a>
					</div>
				</li>				
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29855.html" target="_blank">
							<span>
								<img alt='AmazonBasics-无线蓝牙音响' src="${imgBnner}group1/M00/01/06/CgpmTlrq0NuAGPkSAAG_9JnHgyw673.jpg">
								<i></i>
							</span>
							<font>AmazonBasics-无线蓝牙音响</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29857.html" target="_blank">
							<span>
								<img alt='佳能 Canon-办公打印机' src="${imgBnner}group1/M00/00/CB/CgpsbFrq0U2ACfzUAADlA7dw0vs853.jpg">
								<i></i>
							</span>
							<font>佳能 Canon-办公打印机</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29858.html" target="_blank">
							<span>
								<img alt='佳能 Canon-照片打印机' src="${imgBnner}group1/M00/00/CD/CgptuFrq0cqAWzy5AADNw3REFF4865.jpg">
								<i></i>
							</span>
							<font>佳能 Canon-照片打印机</font>
						</a>
					</div>
				</li>
				<li class="page3 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29820.html" target="_blank">
							<span>
								<img alt='费雪 Fisher-Price - 多功能座椅' src="${imgBnner}group1/M00/00/CB/CgpsbFrqlk2AJNojAAGrv3pd630925.jpg">
								<i></i>
							</span>
							<font>费雪 Fisher-Price - 多功能座椅</font>
						</a>
					</div>
				</li>
				<li class="page3 pageAni">
					<div class="kk">
						<a href="http://www.apaipian.com/play/1910_29821.html" target="_blank">
							<span>
								<img alt='Moonlite-投影仪' src="${imgBnner}group1/M00/01/06/CgpmTlrql4uAFqAxAAHaIMZ8IOE132.jpg">
								<i></i>
							</span>
							<font>Moonlite-投影仪</font>
						</a>
					</div>
				</li>
				<li class="page3 pageAni">
					<div class="kk">
						<a href="http://www.apaipian.com/play/1910_29822.html" target="_blank">
							<span>
								<img alt='Step2-多功能水塘' src="${imgBnner}group1/M00/01/04/Cgpw7FrqmeOAMkZuAAHGbN04oUE463.jpg">
								<i></i>
							</span>
							<font>Step2-多功能水塘</font>
						</a>
					</div>
				</li>
				<li class="page3 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29823.html" target="_blank">
							<span>
								<img alt='伟易达 VTech-手推车' src="${imgBnner}group1/M00/00/CD/CgptuFrqmv6AYaQUAAISt7p1tkI092.jpg">
								<i></i>
							</span>
							<font>伟易达 VTech-手推车</font>
						</a>
					</div>
				</li>
				<li class="page4 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29775.html" target="_blank">
							<span>
								<img alt='薇姿 Vichy-护肤套装' src="${imgBnner}group1/M00/00/CB/CgpsbFrqi4-ASqUuAAD_yG4uI3I432.jpg">
								<i></i>
							</span>
							<font>薇姿 Vichy-护肤套装</font>
						</a>
					</div>
				</li>
				<li class="page4 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29777.html" target="_blank">
							<span>
								<img alt='薇姿 Vichy-爽肤水' src="${imgBnner}group1/M01/01/06/CgpmTlrqjH-AcVyFAAGYMZl4s-A247.jpg">
								<i></i>
							</span>
							<font>薇姿 Vichy-爽肤水</font>
						</a>
					</div>
				</li>
				<li class="page4 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29774.html" target="_blank">
							<span>
								<img alt='理肤泉 La Roche-儿童防嗮霜' src="${imgBnner}group1/M00/00/CB/CgpsbFrptxSAa6U2AAGSaVBiPK8883.jpg">
								<i></i>
							</span>
							<font>理肤泉 La Roche-儿童防嗮霜</font>
						</a>
					</div>
				</li>
				<li class="page4 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29771.html" target="_blank">
							<span>
								<img alt='理肤泉 La Roche-防嗮霜' src="${imgBnner}group1/M01/00/CD/CgptuFrpsquANun2AAFj9KiMShA288.jpg">
								<i></i>
							</span>
							<font>理肤泉 La Roche-防嗮霜</font>
						</a>
					</div>
				</li>
				
				  <li class="page5 pageAni">
					<div class="kk">
						<a href="http://www.apaipian.com/play/9_29731.html" target="_blank">
							<span>
								<img alt='美的 Midea-B3除螨仪' src="${imgBnner}group1/M01/01/04/CgpmTlre6vOADBeuAAFL48xaCSk898.jpg">
								<i></i>
							</span>
							<font>美的 Midea-B3除螨仪</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="http://www.apaipian.com/play/9_29732.html" target="_blank">
							<span>
								<img alt='美的 Midea-B5除螨仪' src="${imgBnner}group1/M01/00/CA/CgpsbFre6vmARxR1AAGN9YgiwAA272.jpg">
								<i></i>
							</span>
							<font>美的 Midea-B5除螨仪</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29789.html" target="_blank">
							<span>
								<img alt='Chefman-电茶壶' src="${imgBnner}group1/M01/01/06/CgpmTlrqkcmAQAu-AAGGmcyex5I921.jpg">
								<i></i>
							</span>
							<font>Chefman-电茶壶</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29751.html" target="_blank">
							<span>
								<img alt='Zojirushi-电压力锅' src="${imgBnner}group1/M01/00/CD/CgptuFrpoROAexYSAAHllTsayIU063.jpg">
								<i></i>
							</span>
							<font>Zojirushi-电压力锅</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29752.html" target="_blank">
							<span>
								<img alt='NutriBullet-料理机' src="${imgBnner}group1/M01/01/04/Cgpw7FrpomyAQ80RAAHHSt5KsEc797.jpg">
								<i></i>
							</span>
							<font>NutriBullet-料理机</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29763.html" target="_blank">
							<span>
								<img alt='Behmor-咖啡机' src="${imgBnner}group1/M00/00/CB/CgpsbFrprA2ADGi1AAGEjZ5gMEg743.jpg">
								<i></i>
							</span>
							<font>Behmor-咖啡机</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29765.html" target="_blank">
							<span>
								<img alt='Comfee-电水壶' src="${imgBnner}group1/M01/01/06/CgpmTlrprZyAFZZHAAFwNxrX-GE735.jpg">
								<i></i>
							</span>
							<font>Comfee-电水壶</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29756.html" target="_blank">
							<span>
								<img alt='完美烘烤 Perfect Bake-智能厨房秤' src="${imgBnner}group1/M00/00/CD/CgptuFrppnCAXcvvAAIaDwYpf7M109.jpg">
								<i></i>
							</span>
							<font>完美烘烤 Perfect Bake-智能厨房秤</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29743.html" target="_blank">
							<span>
								<img alt='肯莫尔 Kenmore-冰箱' src="${imgBnner}group1/M00/00/CB/CgpsbFrpl2iAQVlyAAFwp_GwC0U235.jpg">
								<i></i>
							</span>
							<font>肯莫尔 Kenmore-冰箱</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29762.html" target="_blank">
							<span>
								<img alt='霍尼韦尔 Honeywell-空气净化扇' src="${imgBnner}group1/M01/01/04/Cgpw7Frpq5aANUSZAAHO0c0GcvY132.jpg">
								<i></i>
							</span>
							<font>霍尼韦尔 Honeywell-空气净化扇</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29749.html" target="_blank">
							<span>
								<img alt='肯莫尔 Kenmore-洗衣机' src="${imgBnner}group1/M00/01/04/Cgpw7FrpnqWAA3csAAHxnLD1LA4014.jpg">
								<i></i>
							</span>
							<font>肯莫尔 Kenmore-洗衣机</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29851.html" target="_blank">
							<span>
								<img alt=' 霍尼韦尔 Honeywell-空气净化器' src="${imgBnner}group1/M00/01/06/CgpmTlrqzBiAMJTjAAEOrYGod6U794.jpg">
								<i></i>
							</span>
							<font> 霍尼韦尔 Honeywell-空气净化器</font>
						</a>
					</div>
				</li>
				<li class="page6 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29737.html" target="_blank">
							<span>
								<img alt='欧莱雅 L OREAL-睫毛膏' src="${imgBnner}group1/M01/00/CB/CgpsbFrpikKACTOdAAE9L4rEe2g975.jpg">
								<i></i>
							</span>
							<font>欧莱雅 L'OREAL-睫毛膏</font>
						</a>
					</div>
				</li>
				<li class="page6 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29738.html" target="_blank">
							<span>
								<img alt='美宝莲 Maybelline-粉底' src="${imgBnner}group1/M01/01/04/Cgpw7FrpiveAb0-1AAETgd-XUFk617.jpg">
								<i></i>
							</span>
							<font>美宝莲 Maybelline-粉底</font>
						</a>
					</div>
				</li>
				<li class="page6 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29739.html" target="_blank">
							<span>
								<img alt='Wunder2 Wunderbrow-男化妆师' src="${imgBnner}group1/M00/01/04/Cgpw7FrpjruAc8VxAADjRwfa51Q061.jpg">
								<i></i>
							</span>
							<font>Wunder2 Wunderbrow-男化妆师</font>
						</a>
					</div>
				</li>
				<li class="page6 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29740.html" target="_blank">
							<span>
								<img alt='Wunder2 Wunderbrow-女化妆师' src="${imgBnner}group1/M00/01/04/Cgpw7Frpj6SAL0Z9AAF_zho8VSE975.jpg">
								<i></i>
							</span>
							<font>Wunder2 Wunderbrow-女化妆师</font>
						</a>
					</div>
				</li>
				<li class="page7 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/9_29918.html" target="_blank">
							<span>
								<img alt='红印蟹' src="${imgBnner}group1/M01/00/CE/CgptuFr0K2GAHjxoAAHEcFEBxRE538.jpg">
								<i></i>
							</span>
							<font>红印蟹</font>
						</a>
					</div>
				</li>
				<li class="page7 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/9_29920.html" target="_blank">
							<span>
								<img alt='天海藏' src="${imgBnner}group1/M00/00/CF/CgptuFr0LY-AYEwYAAMlsReJGX4486.jpg">
								<i></i>
							</span>
							<font>天海藏</font>
						</a>
					</div>
				</li>
				<li class="page7 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1499_29923.html" target="_blank">
							<span>
								<img alt='五常大米' src="${imgBnner}group1/M01/01/07/CgpmTlr0MJmAJ-0EAAIVTIKbEyM329.jpg">
								<i></i>
							</span>
							<font>五常大米</font>
						</a>
					</div>
				</li>
				<li class="page7 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30795.html" target="_blank">
							<span>
								<img alt='Bob s Red Mill-面包' src="${imgBnner}group1/M01/00/D4/CgptuFr9TEeACDr4AAF1JB-aRSI872.jpg">
								<i></i>
							</span>
							<font>Bob's Red Mill-面包</font>
						</a>
					</div>
				</li>
				<li class="page7 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30793.html" target="_blank">
							<span>
								<img alt='M&S-ONLY-兔型巧克力' src="${imgBnner}group1/M00/01/0B/Cgpw7Fr9SByAVPeOAAF4llJk6mA019.jpg">
								<i></i>
							</span>
							<font>M&S-ONLY-兔型巧克力</font>
						</a>
					</div>
				</li>
				<li class="page7 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30797.html" target="_blank">
							<span>
								<img alt='BonChon-炸鸡腿' src="${imgBnner}group1/M00/00/D4/CgptuFr9Tl2AWdfBAAJule7GFNU887.jpg">
								<i></i>
							</span>
							<font>BonChon-炸鸡腿</font>
						</a>
					</div>
				</li>
				<li class="page7 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30799.html" target="_blank">
							<span>
								<img alt='M&S-Easter Food' src="${imgBnner}group1/M00/01/0D/CgpmTlr9T7yAeZmSAAGqYr2FMNA171.jpg">
								<i></i>
							</span>
							<font>M&S-Easter Food</font>
						</a>
					</div>
				</li>
				<li class="page7 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30798.html" target="_blank">
							<span>
								<img alt='Cookalong-宽面条' src="${imgBnner}group1/M00/01/0D/CgpmTlr9TxGAT0NdAALBmE_B1Ag266.jpg">
								<i></i>
							</span>
							<font>Cookalong-宽面条</font>
						</a>
					</div>
				</li>
				<li class="page8 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29810.html" target="_blank">
							<span>
								<img alt='WizGear-车载支架' src="${imgBnner}group1/M00/01/04/Cgpw7Frqp3WAPlqFAAF6EwVNfCM091.jpg">
								<i></i>
							</span>
							<font>WizGear-车载支架</font>
						</a>
					</div>
				</li>
				<li class="page8 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29812.html" target="_blank">
							<span>
								<img alt='VicTsing-车载发射器' src="${imgBnner}group1/M00/01/06/CgpmTlrqpXaAa-6QAAHhGcI-vf4442.jpg">
								<i></i>
							</span>
							<font>VicTsing-车载发射器</font>
						</a>
					</div>
				</li>
				<li class="page8 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29815.html" target="_blank">
							<span>
								<img alt='Mpow-车载支架' src="${imgBnner}group1/M01/01/04/Cgpw7FrqpPGAArFCAAGvqshOZco150.jpg">
								<i></i>
							</span>
							<font>Mpow-车载支架</font>
						</a>
					</div>
				</li>
				<li class="page8 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29811.html" target="_blank">
							<span>
								<img alt='VicTsing-车载蓝牙发射器' src="${imgBnner}group1/M00/00/CD/CgptuFrqpoiAWuXTAAFZTjgH5Ug782.jpg">
								<i></i>
							</span>
							<font>VicTsing-车载蓝牙发射器</font>
						</a>
					</div>
				</li>
				<li class="page9 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29809.html" target="_blank">
							<span>
								<img alt='HEXBUG-猫捉老鼠' src="${imgBnner}group1/M01/01/0B/Cgpw7Fr7o0KAPKfQAAF-st3_DBE346.jpg">
								<i></i>
							</span>
							<font>HEXBUG-猫捉老鼠</font>
						</a>
					</div>
				</li>
				<li class="page9 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29807.html" target="_blank">
							<span>
								<img alt='PetPals-猫窝' src="${imgBnner}group1/M00/00/D4/CgptuFr7p_iAaJCVAAGe2e12XA8110.jpg">
								<i></i>
							</span>
							<font>PetPals-猫窝</font>
						</a>
					</div>
				</li>
				<li class="page9 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29803.html" target="_blank">
							<span>
								<img alt='Nutro-狗粮' src="${imgBnner}group1/M01/00/D4/CgptuFr7sXeAZKz7AAJ3I3ix08k338.jpg">
								<i></i>
							</span>
							<font>Nutro-狗粮</font>
						</a>
					</div>
				</li>
				<li class="page9 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29802.html" target="_blank">
							<span>
								<img alt='Purina Pro-狗粮' src="${imgBnner}group1/M00/00/D2/CgpsbFr7sfaAebApAAFqchpRnXM493.jpg">
								<i></i>
							</span>
							<font>Purina Pro-狗粮</font>
						</a>
					</div>
				</li>
				<li class="page10 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/9_30802.html" target="_blank">
							<span>
								<img alt='七匹狼 SEPTWOLVES-内裤' src="${imgBnner}group1/M00/01/0D/CgpmTlr9WGmASPHFAAGumg9B2aE745.jpg">
								<i></i>
							</span>
							<font>七匹狼 SEPTWOLVES-内裤</font>
						</a>
					</div>
				</li>
				<li class="page10 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/9_29727.html" target="_blank">
							<span>
								<img alt='花花公子 Playboy-男鞋' src="${imgBnner}group1/M01/00/CC/CgptuFrdilGATriHAAGCzG4AlzU978.jpg">
								<i></i>
							</span>
							<font>花花公子 Playboy-男鞋</font>
						</a>
					</div>
				</li>
				<li class="page10 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2145_29862.html" target="_blank">
							<span>
								<img alt='复古呢大衣' src="${imgBnner}group1/M00/00/CE/CgptuFrxUe-ADOM0AAHbGznAFmg951.jpg">
								<i></i>
							</span>
							<font>复古呢大衣</font>
						</a>
					</div>
				</li>
				<li class="page10 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29767.html" target="_blank">
							<span>
								<img alt='361度-运动鞋' src="${imgBnner}group1/M01/00/CD/CgptuFrprxqALMn-AAHAEq5Wi40621.jpg">
								<i></i>
							</span>
							<font>361度-运动鞋</font>
						</a>
					</div>
				</li>
				<li class="page11 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29825.html" target="_blank">
							<span>
								<img alt='Nerf-玩具枪' src="${imgBnner}group1/M00/01/0C/CgpmTlr7s7aAV37WAAGAnXvCEGw766.jpg">
								<i></i>
							</span>
							<font>Nerf-玩具枪</font>
						</a>
					</div>
				</li>
				<li class="page11 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29826.html" target="_blank">
							<span>
								<img alt='Play-Doh-彩泥' src="${imgBnner}group1/M01/01/0B/Cgpw7Fr7tJ-AG95PAAIGOVR7hpc595.jpg">
								<i></i>
							</span>
							<font>Play-Doh-彩泥</font>
						</a>
					</div>
				</li>
				<li class="page11 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29827.html" target="_blank">
							<span>
								<img alt='LEGO DUPLO-挖掘机' src="${imgBnner}group1/M01/00/D4/CgptuFr7tQiAW7bsAAFwZZ4Ww70776.jpg">
								<i></i>
							</span>
							<font>LEGO DUPLO-挖掘机</font>
						</a>
					</div>
				</li>
				<li class="page11 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29824.html" target="_blank">
							<span>
								<img alt='Crayola-画板' src="${imgBnner}group1/M00/00/D2/CgpsbFr7s1uAQQJyAAKW3b4-JgI264.jpg">
								<i></i>
							</span>
							<font>Crayola-画板</font>
						</a>
					</div>
				</li>
				<li class="page12 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30819.html" target="_blank">
							<span>
								<img alt='RELIQUIAE ESPAÑA-手工包' src="${imgBnner}group1/M00/00/D4/CgptuFr-q8WARDKiAAFkwgiQJZA538.jpg">
								<i></i>
							</span>
							<font>RELIQUIAE ESPAÑA-手工包</font>
						</a>
					</div>
				</li>
				<li class="page12 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30815.html" target="_blank">
							<span>
								<img alt='Butcher and Baker-手工衣服' src="${imgBnner}group1/M00/01/0B/Cgpw7Fr-qA2ASj9OAAIcWkkylxc014.jpg">
								<i></i>
							</span>
							<font>Butcher and Baker-手工衣服</font>
						</a>
					</div>
				</li>
				<li class="page12 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30816.html" target="_blank">
							<span>
								<img alt='Cambria-手工皮革' src="${imgBnner}group1/M01/00/D2/CgpsbFr-qPyAGwCdAAGO87nbzoY819.jpg">
								<i></i>
							</span>
							<font>Cambria-手工皮革</font>
						</a>
					</div>
				</li>
				<li class="page12 pageAni">
					<div class="kk">
						<a href="https://m.apaipian.com/play/2185_30815.html" target="_blank">
							<span>
								<img alt='Butcher and Baker-手工衣服' src="${imgBnner}group1/M00/01/0B/Cgpw7Fr-qA2ASj9OAAIcWkkylxc014.jpg">
								<i></i>
							</span>
							<font>Butcher and Baker-手工衣服</font>
						</a>
					</div>
				</li>
				<li class="page12 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29816.html" target="_blank">
							<span>
								<img alt='Curver-手工储物篮' src="${imgBnner}group1/M00/01/0C/CgpmTlr7rI-AepfjAAJ458si7ig270.jpg">
								<i></i>
							</span>
							<font>Curver-手工储物篮</font>
						</a>
					</div>
				</li>
				<li class="page12 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30818.html" target="_blank">
							<span>
								<img alt='VamShoes-手工鞋' src="${imgBnner}group1/M01/01/0B/Cgpw7Fr-qwiAEQB3AAF96ASznlw825.jpg">
								<i></i>
							</span>
							<font>VamShoes-手工鞋</font>
						</a>
					</div>
				</li>
				<li class="page12 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30822.html" target="_blank">
							<span>
								<img alt='Mandarinas-手工玩偶' src="${imgBnner}group1/M00/00/D2/CgpsbFr-rSmABrl-AAJuX7AEQBA081.jpg">
								<i></i>
							</span>
							<font>Mandarinas-手工玩偶</font>
						</a>
					</div>
				</li>
				<li class="page12 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30823.html" target="_blank">
							<span>
								<img alt='Guitar Man-手工吉他' src="${imgBnner}group1/M01/01/0B/Cgpw7Fr-reCAHi8XAAIIkMfL9-c589.jpg">
								<i></i>
							</span>
							<font>Guitar Man-手工吉他</font>
						</a>
					</div>
				</li>
				<li class="page13 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/9_29798.html" target="_blank">
							<span>
								<img alt='吉他-弹奏篇' src="${imgBnner}group1/M00/00/CA/CgpsbFrhVMeAFjXUAAJK5WbJRCg857.jpg">
								<i></i>
							</span>
							<font>吉他-弹奏篇</font>
						</a>
					</div>
				</li>
				<li class="page13 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30834.html" target="_blank">
							<span>
								<img alt='物外设计-红铜钢笔' src="${imgBnner}group1/M01/00/D4/CgptuFr-sOuAcf08AAEQik4X9MM273.jpg">
								<i></i>
							</span>
							<font>物外设计-红铜钢笔</font>
						</a>
					</div>
				</li>
				<li class="page13 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30827.html" target="_blank">
							<span>
								<img alt='Pentagon-钢笔' src="${imgBnner}group1/M01/00/D2/CgpsbFr-s-6ACl6GAAELAsXKzJA445.jpg">
								<i></i>
							</span>
							<font>Pentagon-钢笔</font>
						</a>
					</div>
				</li>
				<li class="page13 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30828.html" target="_blank">
							<span>
								<img alt='笔墨文明-汉字六体书' src="${imgBnner}group1/M01/00/D4/CgptuFr-tNKADUn7AAE1JM8iKn0315.jpg">
								<i></i>
							</span>
							<font>笔墨文明-汉字六体书</font>
						</a>
					</div>
				</li>
				<li class="page13 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30826.html" target="_blank">
							<span>
								<img alt='钢笔绘画技巧' src="${imgBnner}group1/M01/01/0B/Cgpw7Fr-sv-AAevrAAHT-snm3i8500.jpg">
								<i></i>
							</span>
							<font>钢笔绘画技巧</font>
						</a>
					</div>
				</li>
				<li class="page13 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30825.html" target="_blank">
							<span>
								<img alt='Pilot Vanishing Point-钢笔' src="${imgBnner}group1/M01/01/0B/Cgpw7Fr-sXyADEeAAAExmWMZ5tY732.jpg">
								<i></i>
							</span>
							<font>Pilot Vanishing Point-钢笔</font>
						</a>
					</div>
				</li>
				<li class="page13 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30824.html" target="_blank">
							<span>
								<img alt='艺术博物馆' src="${imgBnner}group1/M01/00/D4/CgptuFr-r9SAPlkqAAG0IqGn4v8523.jpg">
								<i></i>
							</span>
							<font>艺术博物馆</font>
						</a>
					</div>
				</li>
				<li class="page13 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30829.html" target="_blank">
							<span>
								<img alt='蓝色烟熏鲸鱼-插图工艺' src="${imgBnner}group1/M00/00/D4/CgptuFr-tiyAR161AAItAYcbWWg462.jpg">
								<i></i>
							</span>
							<font>蓝色烟熏鲸鱼-插图工艺</font>
						</a>
					</div>
				</li>
				<li class="page14 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30807.html" target="_blank">
							<span>
								<img alt='Stephen Webster-珠宝匠' src="${imgBnner}group1/M01/00/D2/CgpsbFr-nIaATffYAAELXWnnNwk654.jpg">
								<i></i>
							</span>
							<font>Stephen Webster-珠宝匠</font>
						</a>
					</div>
				</li>
				<li class="page14 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30808.html" target="_blank">
							<span>
								<img alt='Mohitos-青石匠' src="${imgBnner}group1/M00/00/D2/CgpsbFr-nqOALXGOAAFaSFKgHaU194.jpg">
								<i></i>
							</span>
							<font>Mohitos-青石匠</font>
						</a>
					</div>
				</li>
				<li class="page14 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30809.html" target="_blank">
							<span>
								<img alt='MEMBER-乐器工匠' src="${imgBnner}group1/M00/01/0D/CgpmTlr-oBSAT3B6AAJTY4CR7s8391.jpg">
								<i></i>
							</span>
							<font>MEMBER-乐器工匠</font>
						</a>
					</div>
				</li>
				<li class="page14 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30820.html" target="_blank">
							<span>
								<img alt='STITCH-缝纫工匠' src="${imgBnner}group1/M01/00/D4/CgptuFr-oZeAR1YbAAFH9MuZe9U589.jpg">
								<i></i>
							</span>
							<font>STITCH-缝纫工匠</font>
						</a>
					</div>
				</li>
					<li class="page18 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30848.html" target="_blank">
							<span>
								<img alt='TriggerPoint-按摩滚筒' src="${imgBnner}group1/M01/01/0B/Cgpw7FsCjR6AefBLAAF1P7QqgVY236.jpg">
								<i></i>
							</span>
							<font>TriggerPoint-按摩滚筒</font>
						</a>
					</div>
				</li>
				<li class="page18 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30846.html" target="_blank">
							<span>
								<img alt='施文 Schwinn-自行车' src="${imgBnner}group1/M01/00/D2/CgpsbFsCij6ATdq5AAJof-xsvMQ697.jpg">
								<i></i>
							</span>
							<font>施文 Schwinn-自行车</font>
						</a>
					</div>
				</li>
				<li class="page18 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30847.html" target="_blank">
							<span>
								<img alt='Core-健身组合' src="${imgBnner}group1/M01/00/D4/CgptuFsCjEWAV70QAADz_xV1dhc205.jpg">
								<i></i>
							</span>
							<font>Core-健身组合</font>
						</a>
					</div>
				</li>
				<li class="page18 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_29828.html" target="_blank">
							<span>
								<img alt='Razor-滑板车' src="${imgBnner}group1/M01/01/0C/CgpmTlr7rkSAafrJAAFif2xLz78487.jpg">
								<i></i>
							</span>
							<font>Razor-滑板车</font>
						</a>
					</div>
				</li>
				<li class="page15 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30810.html" target="_blank">
							<span>
								<img alt='日默瓦 RIMOWA-Salsa 行李箱' src="${imgBnner}group1/M00/00/D4/CgptuFr-o1uAJVRKAAFXLjSxjBg777.jpg">
								<i></i>
							</span>
							<font>日默瓦 RIMOWA-Salsa 行李箱</font>
						</a>
					</div>
				</li>
				<li class="page15 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30811.html" target="_blank">
							<span>
								<img alt='日默瓦 RIMOWA-Topas 行李箱' src="${imgBnner}group1/M00/01/0D/CgpmTlr-o_mAe4_7AAG8maMmT7w607.jpg">
								<i></i>
							</span>
							<font>日默瓦 RIMOWA-Topas 行李箱</font>
						</a>
					</div>
				</li>
				<li class="page15 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30813.html" target="_blank">
							<span>
								<img alt='日默瓦 RIMOWA-白色款行李箱' src="${imgBnner}group1/M01/01/0D/CgpmTlr-ptuARjeZAAHjVSxfA88985.jpg">
								<i></i>
							</span>
							<font>日默瓦 RIMOWA-白色款行李箱</font>
						</a>
					</div>
				</li>
				<li class="page15 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30812.html" target="_blank">
							<span>
								<img alt='日默瓦 RIMOWA-黑色款行李箱' src="${imgBnner}group1/M01/00/D4/CgptuFr-pwGAPJiWAAE7Bw7QAxI526.jpg">
								<i></i>
							</span>
							<font>日默瓦 RIMOWA-黑色款行李箱</font>
						</a>
					</div>
				</li>
				<li class="page16 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30806.html" target="_blank">
							<span>
								<img alt='麦当劳  McDonalds-小黄人' src="${imgBnner}group1/M01/00/D4/CgptuFr-mveAQs4tAAHm8a1LRWI891.jpg">
								<i></i>
							</span>
							<font>麦当劳  McDonald's-小黄人</font>
						</a>
					</div>
				</li>
				<li class="page16 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30805.html" target="_blank">
							<span>
								<img alt='The Toys Asia-钢铁侠' src="${imgBnner}group1/M01/01/0D/CgpmTlr-mGSAFjsiAAHBJqqBVHg179.jpg">
								<i></i>
							</span>
							<font>The Toys Asia-钢铁侠</font>
						</a>
					</div>
				</li>
				<li class="page16 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30803.html" target="_blank">
							<span>
								<img alt='金属炼魂-Ex-S Gundam型' src="${imgBnner}group1/M01/01/0B/Cgpw7Fr-lY2AD_5_AAFcDozjZks530.jpg">
								<i></i>
							</span>
							<font>金属炼魂-Ex-S Gundam型</font>
						</a>
					</div>
				</li>
				<li class="page16 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30804.html" target="_blank">
							<span>
								<img alt='Kamibot and Gundam ' src="${imgBnner}group1/M01/00/D2/CgpsbFr-luyAFWybAAG7Xne3HfQ737.jpg">
								<i></i>
							</span>
							<font>Kamibot and Gundam </font>
						</a>
					</div>
				</li>
				<li class="page17 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30831.html" target="_blank">
							<span>
								<img alt='Qunol-辅酶Q10' src="${imgBnner}group1/M01/00/D2/CgpsbFr-t7mAL4t_AAJ8UXed2R0360.jpg">
								<i></i>
							</span>
							<font>Qunol-辅酶Q10</font>
						</a>
					</div>
				</li>
				<li class="page17 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30830.html" target="_blank">
							<span>
								<img alt='爱乐维 Elevit-澳洲版' src="${imgBnner}group1/M01/00/D4/CgptuFr-txyAc6zeAAG-qefSK6I891.jpg">
								<i></i>
							</span>
							<font>爱乐维 Elevit-澳洲版 </font>
						</a>
					</div>
				</li>
				<li class="page17 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30832.html" target="_blank">
							<span>
								<img alt='花卉-多肉植物' src="${imgBnner}group1/M01/00/D2/CgpsbFr-uE-AEPwuAAI-hAeDyFE554.jpg">
								<i></i>
							</span>
							<font>花卉-多肉植物 </font>
						</a>
					</div>
				</li>
				<li class="page17 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2185_30833.html" target="_blank">
							<span>
								<img alt='花卉-西海岸花园' src="${imgBnner}group1/M00/00/D2/CgpsbFr-uSOAUaoOAAM9fU8N3T4544.jpg">
								<i></i>
							</span>
							<font>花卉-西海岸花园</font>
						</a>
					</div>
				</li>
			
				
				
			</ul>
		</div>
	</div>
    <div class="main_4">
    	<div class="container00">
            <ul class="four_project">
                <li><a href="https://www.apaipian.com/list-qyxcp/" target="_blank"><h3>宣传片</h3><p>专业制作班底，开发<br>精品内容</p></a></li>
                <li><a href="https://www.apaipian.com/list-tvc/" target="_blank"><h3>广告片</h3><p>一站式商业视频服务<br>资源整合全国联动</p></a></li>
                <li><a href="https://www.apaipian.com/list-wdy/" target="_blank"><h3>微电影</h3><p>免费创意策划，视频<br>管家全程跟踪</p></a></li>
                <li><a href="https://www.apaipian.com/list-mg/" target="_blank"><h3>MG动画</h3><p>把握设计潮流，全面<br>助力品牌升级</p></a></li>
            </ul>
        </div>
    </div>
	<div class="foot">
		<div class="container">
			<ul class="foot_nav">
				<li class="gzh"><img alt="" src="/resources/images/salesman/special/code_pai.png" width="111" height="110"><br>扫一扫 关注官方微信</li>
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
						<div class="code hide"><img alt="" src="/resources/images/salesman/special/code_ke.jpg"><br>客户客服</div>
					</a><br>
					<a class="sml proSer codeshow" href="Javascript:void(0)">创作团队客服
						<div class="code hide"><img alt="" src="/resources/images/salesman/special/code_dao.jpg"><br>创作团队客服</div>
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
<script src="/resources/js/salesman/special/channel07.js"></script>
</html>
