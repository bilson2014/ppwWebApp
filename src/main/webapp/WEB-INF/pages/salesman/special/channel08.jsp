<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
<meta name=“viewport” content=“width=device-width; initial-scale=1.0”>  
<meta name="keywords" content="校招视频拍摄,校招宣传视频,招聘视频制作,校园招聘视频">
<meta name="description" content="校园招聘视频，千万曝光量轻松实现足不出户即可搞定校招，企业校招利器。校招宣传视频拍摄，招聘视频制作，就选拍片网。阿里官方视频拍摄基地，低预算拍大片，拍片就上拍片网">
<title>校招视频拍摄-校招宣传视频-招聘视频制作-校园招聘视频-拍片网 </title>
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
            <li class="bgitem"><img src="/resources/images/salesman/special/c8b1.jpg"></li>
            <li class="bgitem"><img src="/resources/images/salesman/special/c8b2.jpg"></li>
            <li class="bgitem"><img src="/resources/images/salesman/special/c8b3.jpg"></li>
        </ul>
	</div>
	
	
	
	<div class="main_top">
		<div class="container newCon">
			<h2 class="aa">千万曝光量 校招从此水到渠成</h2>
		    <p style="text-align: center;">校园招聘视频，让应聘者直观感受公司的环境氛围、精神风貌，影响范围更广，传播层次更深。千万曝光量轻松实现足不出户即可搞定校招，每天在办公室坐收上万份简历。企业想捕获优秀的人才，人才想找到合适的企业，由于之前的信息不对称，往往一纸之隔却又彼此错过。招聘视频，正是捅破这层尴尬的最有利的武器。</p>
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
		   
			<ul class="channel">
				
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/9_31486.html" target="_blank">
							<span>
								<img alt='林清轩-新零售-2018招聘篇' src="${imgBnner}group1/M00/01/13/CgpmTlsorVSADWxNAAIqxnpHHfw597.jpg">
								<i></i>
							</span>
							<font>林清轩-新零售-2018招聘篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/9_31517.html" target="_blank">
							<span>
								<img alt='顾家家居 KUKA-校招篇' src="${imgBnner}group1/M01/01/14/CgpmTlsx_DGAcSa-AAI9d0YTOs4567.jpg">
								<i></i>
							</span>
							<font>顾家家居 KUKA-校招篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_28177.html" target="_blank">
							<span>
								<img alt='京东方 BOE-校招-员工篇' src="${imgBnner}group1/M00/00/FB/CgpmTlq9tfeAbWmEAAJL2Yk9eUA128.jpg">
								<i></i>
							</span>
							<font>京东方 BOE-校招-员工篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31595.html" target="_blank">
							<span>
								<img alt='交通银行 BOCOM-校招篇' src="${imgBnner}group1/M01/01/16/CgpmTltW1xGAatymAAGldSnVr88021.jpg">
								<i></i>
							</span>
							<font>交通银行 BOCOM-校招篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31596.html" target="_blank">
							<span>
								<img alt='华为 Huawei-致勇者-2019校招篇' src="${imgBnner}group1/M00/00/DB/CgpsbFtW2FWAEUEHAAHF5AocIrU180.jpg">
								<i></i>
							</span>
							<font>华为 Huawei-致勇者-校招篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31599.html" target="_blank">
							<span>
								<img alt='华为 Huawei-倔强-校招篇' src="${imgBnner}group1/M01/01/14/Cgpw7FtW22eAW9hYAAFfSAXdnxM671.jpg">
								<i></i>
							</span>
							<font>华为 Huawei-倔强-校招篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_28215.html" target="_blank">
							<span>
								<img alt='钻石世家 ShiningHouse-招聘篇' src="${imgBnner}group1/M00/00/C0/CgptuFq6DkaAG02zAAMkDaWPolE361.jpg">
								<i></i>
							</span>
							<font>钻石世家 ShiningHouse-招聘篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_26637.html" target="_blank">
							<span>
								<img alt='英雄互娱-校招篇' src="${imgBnner}group1/M01/00/DD/CgptuFtW9yOAEerIAAFOKqh-LDY072.jpg">
								<i></i>
							</span>
							<font>英雄互娱-校招篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31589.html" target="_blank">
							<span>
								<img alt='中兴 ZTE-2018校招篇' src="${imgBnner}group1/M00/00/DB/CgpsbFtWzHuAdZulAAJPoCgAT6s093.jpg">
								<i></i>
							</span>
							<font>中兴 ZTE-2018校招篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31590.html" target="_blank">
							<span>
								<img alt='中泰集团-奋斗有“泰”度-招聘篇' src="${imgBnner}group1/M01/01/15/CgpmTltWze-ACwAPAAHQSqJFdDE277.jpg">
								<i></i>
							</span>
							<font>中泰集团-奋斗有“泰”度-招聘篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31591.html" target="_blank">
							<span>
								<img alt='启明星辰-领航信息安全-2019校招篇' src="${imgBnner}group1/M00/01/14/Cgpw7FtW0DmANtuGAAFiQD-_7ig332.jpg">
								<i></i>
							</span>
							<font>启明星辰-2019校招篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31592.html" target="_blank">
							<span>
								<img alt='乐圈影业-一本正经-招聘篇' src="${imgBnner}group1/M01/00/DD/CgptuFtW0c6AOjNKAAFj0hBUyuY728.jpg">
								<i></i>
							</span>
							<font>乐圈影业-一本正经-招聘篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31593.html" target="_blank">
							<span>
								<img alt='京东 JD-他们已经拿到校招offer?' src="${imgBnner}group1/M01/00/DD/CgptuFtW0qaAdmlLAAH5D5MyE9k679.jpg">
								<i></i>
							</span>
							<font>京东 JD-他们已经拿到offer?</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31597.html" target="_blank">
							<span>
								<img alt='飞鱼科技-与优秀者同行-招聘篇' src="${imgBnner}group1/M01/01/16/CgpmTltW3DCAQ6PrAAF12DVbCHo037.jpg">
								<i></i>
							</span>
							<font>飞鱼科技-与优秀者同行-招聘篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31598.html" target="_blank">
							<span>
								<img alt='安踏 Anta-2015校招篇' src="${imgBnner}group1/M00/01/14/Cgpw7FtW3eyAA_0LAAIn87mhro0470.jpg">
								<i></i>
							</span>
							<font>安踏 Anta-2015校招篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/303_832.html" target="_blank">
							<span>
								<img alt='百度 Baidu-招聘证言篇' src="${imgBnner}group1/M00/00/DD/CgptuFtNqSaABj-IAAKAAhLd8xE599.jpg">
								<i></i>
							</span>
							<font>百度 Baidu-招聘证言篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1910_27084.html" target="_blank">
							<span>
								<img alt='海南航空-2018全球乘务员招聘篇' src="${imgBnner}group1/M00/00/DD/CgptuFtNpXWAIVMJAAHCGWMiEtw897.jpg">
								<i></i>
							</span>
							<font>海南航空-2018全球乘务员招聘篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31565.html" target="_blank">
							<span>
								<img alt='南京银行-2017届全球校招篇' src="${imgBnner}group1/M01/01/14/Cgpw7FtNql-AfaKiAAFeP3974vs248.jpg">
								<i></i>
							</span>
							<font>南京银行-2017届全球校招篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31567.html" target="_blank">
							<span>
								<img alt='招商银行 -2018培训生招聘篇' src="${imgBnner}group1/M01/01/15/CgpmTltNrLuAbCDaAAFtnysZVks046.jpg">
								<i></i>
							</span>
							<font>招商银行 -2018培训生招聘篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1911_20804.html" target="_blank">
							<span>
								<img alt='中国建设银行 CCB-招聘篇' src="${imgBnner}group1/M01/01/14/Cgpw7FtNp3OANIgHAAKpHukTcE4225.jpg">
								<i></i>
							</span>
							<font>中国建设银行 CCB-招聘篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1312_13968.html" target="_blank">
							<span>
								<img alt='中瑞金服-招聘篇' src="${imgBnner}group1/M00/00/2F/CgpsbFjLcE-AXddtAAJhMgyyS6M777.jpg">
								<i></i>
							</span>
							<font>中瑞金服-招聘篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1116_10620.html" target="_blank">
							<span>
								<img alt='华为 -梦-2017应届生招聘篇' src="${imgBnner}group1/M00/01/15/CgpmTltNpqaAFCA1AAGeIyXrEA4297.jpg">
								<i></i>
							</span>
							<font>华为 -梦-2017应届生招聘篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1993_25490.html" target="_blank">
							<span>
								<img alt='美的 Midea-2018届校招篇' src="${imgBnner}group1/M00/00/C5/CgpsbFrQd3-ADyPsAARLDlhfJos233.jpg">
								<i></i>
							</span>
							<font>美的 Midea-2018届校招篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31568.html" target="_blank">
							<span>
								<img alt='三星 Samsung-2018校招篇' src="${imgBnner}group1/M00/00/DB/CgpsbFtNrbOAPxCHAAFaeyuyE-I680.jpg">
								<i></i>
							</span>
							<font>三星 Samsung-2018校招篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1448_17886.html" target="_blank">
							<span>
								<img alt='埃森哲 Accenture-招聘篇' src="${imgBnner}group1/M00/01/14/Cgpw7FtNpQWAci77AAF--fJr-HU940.jpg">
								<i></i>
							</span>
							<font>埃森哲 Accenture-招聘篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/1993_25282.html" target="_blank">
							<span>
								<img alt='尚德机构-招聘篇' src="${imgBnner}group1/M00/00/C2/CgpsbFrJzQaAMFaCAAHe1-wpwO8853.jpg">
								<i></i>
							</span>
							<font>尚德机构-招聘篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31566.html" target="_blank">
							<span>
								<img alt='晶苑集团-益力坚-招聘篇' src="${imgBnner}group1/M01/00/DB/CgpsbFtNq22ASntXAAI5Thdqgrk645.jpg">
								<i></i>
							</span>
							<font>晶苑集团-益力坚-招聘篇</font>
						</a>
					</div>
				</li>
				<li class="page">
					<div class="kk">
						<a href="https://www.apaipian.com/play/2198_31563.html" target="_blank">
							<span>
								<img alt='极飞-招聘篇' src="${imgBnner}group1/M01/01/14/Cgpw7FtNqIyAU_AbAAG8hzXU8ZA038.jpg">
								<i></i>
							</span>
							<font>极飞-招聘篇</font>
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
<script >
$('.banner').flexslider({
    directionNav: true,
	 slideshowSpeed: 5000,
    pauseOnAction: false
});
</script>
</html>
