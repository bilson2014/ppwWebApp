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
<script src="/resources/js/salesman/special/bannerAni.js"></script>
<script id="-mob-share" src="https://f1.webshare.mob.com/code/mob-share.js?appkey=8c49c537a706"></script>
<script src="/resources/js/salesman/special/jquery-1.8.3.min.js"></script>
<script src="/resources/js/salesman/special/jquery.flexslider-min.js"></script>
<script src="/resources/js/salesman/special/channel07.js"></script>

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
	color:white;
	letter-spacing: 1px;
	left: -60px;
    top: 20px;
}

.pageMenu div{
  
    height: 40px;
    width: 40px;
    background: #666;
    border-bottom: 1px solid white;
    padding: 5px;
    cursor: pointer;
  
}

.pageMenu div{
  line-height:40px;
}

.activeMenu{
background:#fe5453 !important;
}

.banner { position: relative;  margin-top:1px; height: 560px; overflow: hidden; }
.slides { position: relative; z-index: 1; }
.slides li { height: 560px; }

.kk a{
  transition: all .5s;
  -webkit-transition: all .5s;
}

.setHeight{
height:0 !important
}

.main_pd {
    min-height: 500px;
}

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
            <li class="bgitem" style="background:url(/resources/images/salesman/special/c7b1.jpg) 50% 50% no-repeat;"></li>
            <li class="bgitem" style="background:url(/resources/images/salesman/special/c7b2.jpg) 50% 50% no-repeat;"></li>
            <li class="bgitem" style="background:url(/resources/images/salesman/special/c7b3.jpg) 50% 50% no-repeat;"></li>
        </ul>
	</div>
	
	
	
	<div class="main_top">
		<div class="container newCon">
			<h2>[ 电商  + 视频 ]<br>淘宝已从追求效率的交易市场平台升级成为追求乐趣的内容化社区化的消费媒体平台，内容化时代已经到来！</h2>
		    <p style="text-align: center;">仅2017年4月到2017年12月，淘宝短视频播放量就由原来的3800万次上升至18亿次，净增长4700%。对于商家而言，想要在新的内容生态竞争模式下取得销量的突破，制作精良的短视频无疑是当前最好的选择。运用短视频引爆内容流量，抢占公域导购矩阵，瓜分内容营销红利。拍片网于2018年3月被淘宝指定为官方拍摄基地，视频制作服务覆盖98%类目，作品品质遥遥领先。</p>
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
		        <div id="findPage1" class="activeMenu findPage" data-id="0">全部</div>
		        <div id="findPage2" class="findPage" data-id="1">生活</div>
		        <div id="findPage3" class="findPage" data-id="2">数码</div>
		        <div id="findPage4" class="findPage" data-id="3">亲子</div>
		        <div id="findPage5" class="findPage" data-id="4">车品</div>
		        <div id="findPage6" class="findPage" data-id="5">护肤</div>
		        <div id="findPage7" class="findPage" data-id="6">电器</div>
		        <div id="findPage8" class="findPage" data-id="7">彩妆</div>
		    </div>
			<ul class="channel">
				
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29748.html" target="_blank">
							<span>
								<img alt='苍山 Cangshan-评测教学' src="${imgBnner}group1/M00/00/CD/CgptuFrpneyAE6zBAAGD43_4XRQ641.jpg">
								<i></i>
							</span>
							<font>苍山 Cangshan-评测教学</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29797.html" target="_blank">
							<span>
								<img alt='Teabox 茶壶-评测教学' src="${imgBnner}group1/M01/01/06/CgpmTlrqjqGAWLYIAADzDmS44gs253.jpg">
								<i></i>
							</span>
							<font>Teabox 茶壶-评测教学</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29754.html" target="_blank">
							<span>
								<img alt=' OXO 炒锅-外观与工艺' src="${imgBnner}group1/M01/00/CD/CgptuFrppF-ASsazAAEAyAsvh1Y641.jpg">
								<i></i>
							</span>
							<font> OXO 炒锅-外观与工艺</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/9_29731.html" target="_blank">
							<span>
								<img alt='美的  Midea 除螨仪B3-外观与工艺' src="${imgBnner}group1/M01/01/04/CgpmTlre6vOADBeuAAFL48xaCSk898.jpg">
								<i></i>
							</span>
							<font>美的  Midea 除螨仪B3-外观与工艺</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/9_29732.html" target="_blank">
							<span>
								<img alt='美的  Midea 除螨仪B5-外观与工艺' src="${imgBnner}group1/M01/00/CA/CgpsbFre6vmARxR1AAGN9YgiwAA272.jpg">
								<i></i>
							</span>
							<font>美的  Midea 除螨仪B5-外观与工艺</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29795.html" target="_blank">
							<span>
								<img alt='OXO 储物罐-功能讲解' src="${imgBnner}group1/M01/00/CD/CgptuFrqj6iAD_enAAKzx7A_1fQ577.jpg">
								<i></i>
							</span>
							<font>OXO 储物罐-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/9_29732.html" target="_blank">
							<span>
								<img alt='VARIDESK 地垫-评测教学' src="${imgBnner}group1/M00/00/CD/CgptuFrqkQaAK_Z3AAEn6-VGnY0542.jpg">
								<i></i>
							</span>
							<font>VARIDESK 地垫-评测教学</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29765.html" target="_blank">
							<span>
								<img alt='Chefman 电茶壶-外观与工艺' src="${imgBnner}group1/M00/00/CD/CgptuFrqkQaAK_Z3AAEn6-VGnY0542.jpg">
								<i></i>
							</span>
							<font>Chefman 电茶壶-外观与工艺</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29751.html" target="_blank">
							<span>
								<img alt='Zojirushi-功能讲解' src="${imgBnner}group1/M01/00/CD/CgptuFrpoROAexYSAAHllTsayIU063.jpg">
								<i></i>
							</span>
							<font>Zojirushi-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29753.html" target="_blank">
							<span>
								<img alt='Zestkit 饭盒-功能讲解' src="${imgBnner}group1/M01/00/CB/CgpsbFrpo06AXglLAAH-vMHndGg370.jpg">
								<i></i>
							</span>
							<font>Zestkit 饭盒-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29763.html" target="_blank">
							<span>
								<img alt='Behmor-外观与工艺' src="${imgBnner}group1/M00/00/CB/CgpsbFrprA2ADGi1AAGEjZ5gMEg743.jpg">
								<i></i>
							</span>
							<font>Behmor-外观与工艺</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29765.html" target="_blank">
							<span>
								<img alt='Comfee-外观与工艺' src="${imgBnner}group1/M01/01/06/CgpmTlrprZyAFZZHAAFwNxrX-GE735.jpg">
								<i></i>
							</span>
							<font>Comfee-外观与工艺</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29766.html" target="_blank">
							<span>
								<img alt='Sterline 蔬菜切片机-功能讲解' src="${imgBnner}group1/M00/00/CD/CgptuFrprjmAQmV0AAEyIZAsEAQ765.jpg">
								<i></i>
							</span>
							<font>Sterline 蔬菜切片机-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29752.html" target="_blank">
							<span>
								<img alt='NutriBullet-评测教学' src="${imgBnner}group1/M01/01/04/Cgpw7FrpomyAQ80RAAHHSt5KsEc797.jpg">
								<i></i>
							</span>
							<font>NutriBullet-评测教学</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29784.html" target="_blank">
							<span>
								<img alt='simplehuman 纸巾架-功能讲解' src="${imgBnner}group1/M01/01/04/Cgpw7Frqk_qAE9I9AADDuhqAHKA951.jpg">
								<i></i>
							</span>
							<font>simplehuman 纸巾架-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page1 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29756.html" target="_blank">
							<span>
								<img alt='完美烘烤 Perfect Bake 智能秤-评测教学' src="${imgBnner}group1/M01/01/04/Cgpw7Frqk_qAE9I9AADDuhqAHKA951.jpg">
								<i></i>
							</span>
							<font>完美烘烤 Perfect Bake 智能秤-评测教学</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/9_29726.html" target="_blank">
							<span>
								<img alt='明基 BenQ 投影仪-功能讲解' src="${imgBnner}group1/M01/00/CA/CgpsbFrdiSiAWhmKAAE4pvn92H0971.jpg">
								<i></i>
							</span>
							<font>明基 BenQ 投影仪-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="http://www.apaipian.com/play/1910_29838.html" target="_blank">
							<span>
								<img alt='Nest-功能讲解' src="${imgBnner}group1/M01/00/CB/CgpsbFrqqbaAeofwAADkWGKZEtc461.jpg">
								<i></i>
							</span>
							<font>Nest-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29852.html" target="_blank">
							<span>
								<img alt='三星 Samsung-Galaxy Tab S3-功能讲解' src="${imgBnner}group1/M01/01/04/Cgpw7FrqzPuAZNUvAADmGT3oErk393.jpg">
								<i></i>
							</span>
							<font>三星 Samsung-Galaxy Tab S3-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29853.html" target="_blank">
							<span>
								<img alt='华硕 ASUS-评测教学' src="${imgBnner}group1/M01/00/CB/CgpsbFrqzj6AbdqKAAFczrAPMsA183.jpg">
								<i></i>
							</span>
							<font>华硕 ASUS-评测教学</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29854.html" target="_blank">
							<span>
								<img alt='华硕 ASUS-外观与工艺' src="${imgBnner}group1/M01/01/06/CgpmTlrqz0SALfRRAAIelivp6Z0670.jpg">
								<i></i>
							</span>
							<font>华硕 ASUS-外观与工艺</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29854.html" target="_blank">
							<span>
								<img alt='华硕 ASUS-外观与工艺' src="${imgBnner}group1/M01/01/06/CgpmTlrqz0SALfRRAAIelivp6Z0670.jpg">
								<i></i>
							</span>
							<font>华硕 ASUS-外观与工艺</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29855.html" target="_blank">
							<span>
								<img alt='AmazonBasics 无线蓝牙音响-功能讲解' src="${imgBnner}group1/M00/01/06/CgpmTlrq0NuAGPkSAAG_9JnHgyw673.jpg">
								<i></i>
							</span>
							<font>AmazonBasics 无线蓝牙音响-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29857.html" target="_blank">
							<span>
								<img alt='佳能 Canon MX492-评测教学' src="${imgBnner}group1/M00/00/CB/CgpsbFrq0U2ACfzUAADlA7dw0vs853.jpg">
								<i></i>
							</span>
							<font>佳能 Canon MX492-评测教学</font>
						</a>
					</div>
				</li>
				<li class="page2 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29858.html" target="_blank">
							<span>
								<img alt='佳能 Canon MX492-功能讲解' src="${imgBnner}group1/M00/00/CD/CgptuFrq0cqAWzy5AADNw3REFF4865.jpg">
								<i></i>
							</span>
							<font>佳能 Canon MX492-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page3 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29820.html" target="_blank">
							<span>
								<img alt='费雪 Fisher-Price-多功能座椅-功能讲解' src="${imgBnner}group1/M00/00/CB/CgpsbFrqlk2AJNojAAGrv3pd630925.jpg">
								<i></i>
							</span>
							<font>费雪 Fisher-Price-多功能座椅-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page3 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29821.html" target="_blank">
							<span>
								<img alt='Moonlite-功能讲解' src="${imgBnner}group1/M00/01/06/CgpmTlrql4uAFqAxAAHaIMZ8IOE132.jpg">
								<i></i>
							</span>
							<font>Moonlite-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page3 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29820.html" target="_blank">
							<span>
								<img alt='Step2 多功能水塘-功能讲解' src="${imgBnner}group1/M00/00/CB/CgpsbFrqlk2AJNojAAGrv3pd630925.jpg">
								<i></i>
							</span>
							<font>Step2 多功能水塘-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page3 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29822.html" target="_blank">
							<span>
								<img alt='Moonlite-功能讲解' src="${imgBnner}group1/M00/01/04/Cgpw7FrqmeOAMkZuAAHGbN04oUE463.jpg">
								<i></i>
							</span>
							<font>Moonlite-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page3 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29823.html" target="_blank">
							<span>
								<img alt='伟易达 VTech-功能讲解' src="${imgBnner}group1/M00/00/CD/CgptuFrqmv6AYaQUAAISt7p1tkI092.jpg">
								<i></i>
							</span>
							<font>伟易达 VTech-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page4 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29815.html" target="_blank">
							<span>
								<img alt='Mpow 车载支架-评测教学' src="${imgBnner}group1/M01/01/04/Cgpw7FrqpPGAArFCAAGvqshOZco150.jpg">
								<i></i>
							</span>
							<font>Mpow 车载支架-评测教学</font>
						</a>
					</div>
				</li>
				<li class="page4 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29811.html" target="_blank">
							<span>
								<img alt='VicTsing 车载发射器-评测教学' src="${imgBnner}group1/M00/00/CD/CgptuFrqpoiAWuXTAAFZTjgH5Ug782.jpg">
								<i></i>
							</span>
							<font>VicTsing 车载发射器-评测教学</font>
						</a>
					</div>
				</li>
				<li class="page4 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29812.html" target="_blank">
							<span>
								<img alt='VicTsing 车载发射器-功能讲解' src="${imgBnner}group1/M00/01/06/CgpmTlrqpXaAa-6QAAHhGcI-vf4442.jpg">
								<i></i>
							</span>
							<font>VicTsing 车载发射器-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page4 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29810.html" target="_blank">
							<span>
								<img alt='WizGear 车载支架-外观与工艺' src="${imgBnner}group1/M00/01/04/Cgpw7Frqp3WAPlqFAAF6EwVNfCM091.jpg">
								<i></i>
							</span>
							<font>WizGear 车载支架-外观与工艺</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29775.html" target="_blank">
							<span>
								<img alt='薇姿 Vichy-评测教学' src="${imgBnner}group1/M00/00/CB/CgpsbFrqi4-ASqUuAAD_yG4uI3I432.jpg">
								<i></i>
							</span>
							<font>薇姿 Vichy-评测教学</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29777.html" target="_blank">
							<span>
								<img alt='薇姿 Vichy-功能讲解' src="${imgBnner}group1/M01/01/06/CgpmTlrqjH-AcVyFAAGYMZl4s-A247.jpg">
								<i></i>
							</span>
							<font>薇姿 Vichy-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29774.html" target="_blank">
							<span>
								<img alt='理肤泉 La Roche 儿童防嗮霜-功能讲解' src="${imgBnner}group1/M00/00/CB/CgpsbFrptxSAa6U2AAGSaVBiPK8883.jpg">
								<i></i>
							</span>
							<font>理肤泉 La Roche 儿童防嗮霜-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page5 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29771.html" target="_blank">
							<span>
								<img alt='理肤泉 La Roche 防嗮霜-功能讲解' src="${imgBnner}group1/M01/00/CD/CgptuFrpsquANun2AAFj9KiMShA288.jpg">
								<i></i>
							</span>
							<font>理肤泉 La Roche 防嗮霜-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page6 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29743.html" target="_blank">
							<span>
								<img alt='肯莫尔 Kenmore-功能讲解' src="${imgBnner}group1/M00/00/CB/CgpsbFrpl2iAQVlyAAFwp_GwC0U235.jpg">
								<i></i>
							</span>
							<font>肯莫尔 Kenmore-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page6 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29762.html" target="_blank">
							<span>
								<img alt='霍尼韦尔 Honeywell 空气净化扇-外观与工艺' src="${imgBnner}group1/M01/01/04/Cgpw7Frpq5aANUSZAAHO0c0GcvY132.jpg">
								<i></i>
							</span>
							<font>霍尼韦尔 Honeywell 空气净化扇-外观与工艺</font>
						</a>
					</div>
				</li>
				<li class="page6 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29749.html" target="_blank">
							<span>
								<img alt='肯莫尔 Kenmore-外观与工艺' src="${imgBnner}group1/M00/01/04/Cgpw7FrpnqWAA3csAAHxnLD1LA4014.jpg">
								<i></i>
							</span>
							<font>肯莫尔 Kenmore-外观与工艺</font>
						</a>
					</div>
				</li>
				<li class="page6 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29851.html" target="_blank">
							<span>
								<img alt='霍尼韦尔 Honeywell-外观与工艺' src="${imgBnner}group1/M00/01/06/CgpmTlrqzBiAMJTjAAEOrYGod6U794.jpg">
								<i></i>
							</span>
							<font>霍尼韦尔 Honeywell-外观与工艺</font>
						</a>
					</div>
				</li>
				<li class="page7 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29737.html" target="_blank">
							<span>
								<img alt='欧莱雅 L OREAL-功能讲解' src="${imgBnner}group1/M01/00/CB/CgpsbFrpikKACTOdAAE9L4rEe2g975.jpg">
								<i></i>
							</span>
							<font>欧莱雅 L OREAL-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page7 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29738.html" target="_blank">
							<span>
								<img alt='美宝莲 Maybelline-功能讲解' src="${imgBnner}group1/M01/01/04/Cgpw7FrpiveAb0-1AAETgd-XUFk617.jpg">
								<i></i>
							</span>
							<font>美宝莲 Maybelline-功能讲解</font>
						</a>
					</div>
				</li>
				<li class="page7 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29739.html" target="_blank">
							<span>
								<img alt='Wunder2 Wunderbrow-男评测教学' src="${imgBnner}group1/M00/01/04/Cgpw7FrpjruAc8VxAADjRwfa51Q061.jpg">
								<i></i>
							</span>
							<font>Wunder2 Wunderbrow-男评测教学</font>
						</a>
					</div>
				</li>
				<li class="page7 pageAni">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_29740.html" target="_blank">
							<span>
								<img alt='Wunder2 Wunderbrow-女评测教学' src="${imgBnner}group1/M00/01/04/Cgpw7Frpj6SAL0Z9AAF_zho8VSE975.jpg">
								<i></i>
							</span>
							<font>Wunder2 Wunderbrow-女评测教学</font>
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
</html>
