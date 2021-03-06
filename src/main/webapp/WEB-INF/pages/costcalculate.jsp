<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>

<%-- import CSS --%>
<spring:url value="/resources/css/index.css" var="indexCss" />
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss" />
<spring:url value="/resources/lib/swiper/swiper.min.css" var="swiperCss" />
<%-- import JS --%>
<spring:url value="/resources/images" var="imgPath" />
<spring:url value="/resources/lib/requireJs/require.js" var="requireJs" />
<spring:url value="/resources/lib/swiper/swiper.min.js" var="swiperJs" />
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/images" var="imgPath" />
<link rel="shortcut icon" href="${imgPath}/favicon.ico" >
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="拍片成本计算器，视频价格计算器，宣传片制作报价，宣传片制作成本，视频制作价格">
	<meta name="description" content="拍片网平台致力于打造“影视工业化”行业标准，首家模块化成本定价，推出拍片成本计算器，让你随时了解视频制作价格。拍片就上拍片网">
	<meta name="baidu-site-verification" content="dMz6jZpIwd" />
	<title>拍片成本计算器_视频价格计算器_宣传片制作报价-拍片网</title>
    <link rel="stylesheet" href="/resources/css/costCalculator.css">
    <link rel="stylesheet" href="/resources/lib/swiper/swiper.min.css">
    <link rel="stylesheet" href="/resources/lib/Bootstrap/css/bootstrap.min.css">
    <script type="text/javascript" src="/resources/lib/jquery/jquery-2.0.3.min.js"></script>
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<script type="text/javascript">
		var _vds = _vds || [];
		window._vds = _vds;
		(function(){
		  _vds.push(['setAccountId', '9f2e33a3d43b5d78']);
		  (function() {
		    var vds = document.createElement('script');
		    vds.type='text/javascript';
		    vds.async = true;
		    vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(vds, s);
		  })();
		})();
	</script>
</head>
<body>
  <jsp:include flush="true" page="header.jsp"></jsp:include> 
    <div class="page">
    
     <r:identity role="provider">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="roletype" value="provider">              
	 </r:identity>
	 <r:identity role="customer">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="roletype" value="customer">
	 </r:identity>
	 <r:identity role="employee">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="roletype" value="employee">
	 </r:identity>  
    
        <div class="costBackguound">
            <div class="costContent">
                <div class="info">
                    <div>拍片价格计算器</div>
                    <div>COST EVALUATOR</div>
                    <div>
                        <label></label>此价格仅限参考
                    </div>
                    <div>
                        <label></label>最终价格以视频管家报价为准
                    </div>
                </div>
                <div class="calculator">
                    <div class="bg"></div>
                    <div class="price">
                        <label>￥</label>
                        <label id="price">- -&nbsp&nbsp&nbsp- -</label>
                    </div>
                    <div class="controlWidth">
                        <div class="youNeed"> 填写您的拍摄需求，计算您的拍片价格</div>
                            <div class="calItem">
                                <div class="title" >视频类别</div>
                                <div class="dropdown costSelect" id="type">
                                    <div class="btn btn-default dropdown-toggle" type="button" id="typeShow" data-toggle="dropdown">
                                        <span data-content="0" id="videoType">企业宣传</span>
                                        <div class="carets"></div>
                                    </div>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" >
                                       <!--  <li data-content="0">活动视频</li>
                                        <li data-content="1">产品广告(TVC)</li>
                                        <li data-content="2">企业宣传</li>
                                        <li data-content="3">微电影</li>
                                        <li data-content="4">融资路演</li>
                                        <li data-content="5">众筹视频</li> -->
                                        
                                        
                                        
                                        <li data-content="0">企业宣传</li>
                                        <li data-content="1">广告TVC</li>
                                        <li data-content="2">微电影</li>
                                        <li data-content="3">MG动画</li>
                                        <li data-content="4">三维展示</li> 
                                        <li data-content="5">视频名片</li> 
                                        <li data-content="6">电商视频</li>
                                        <li data-content="7">活动及课件</li>
                                        
                                        
                                    </ul>
                                </div>
                            </div>

                            <div class="calItem">
                                <div class="title" >时长</div>
                                <div class="dropdown costSelect" id="type">
                                    <div class="btn btn-default dropdown-toggle" type="button" id="typeShow" data-toggle="dropdown">
                                        <span data-content="0" id="time">1 ~ 3 分钟</span>
                                        <div class="carets"></div>
                                    </div>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" >
                                        <li data-content="0">1 ~ 3 分钟</li>
                                        <li data-content="1">3 ~ 5 分钟</li>
                                        <li data-content="2">5 ~ 10 分钟</li>
                                    </ul>
                                </div>
                            </div>

                              <div class="calItem">
                                <div class="title" >导演团队</div>
                                <div class="dropdown costSelect" id="type">
                                    <div class="btn btn-default dropdown-toggle" type="button" id="typeShow" data-toggle="dropdown">
                                        <span data-content="0" id="team">专业级导演团队</span>
                                        <div class="carets"></div>
                                    </div>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" >
                                        <li data-content="0" data-info="0">专业级导演团队</li>
                                        <li data-content="1" data-info="1">广告级导演团队</li>
                                        <li data-content="2" data-info="2">电影级导演团队</li>
                                    </ul>
                                </div>
                                <div class="infoContent" id="teamInfo">等哈看对方机会卡机的很快发货的罚款的饭卡减</div>
                            </div>

                              <div class="calItem">
                                <div class="title" >拍摄设备</div>
                                <div class="dropdown costSelect" id="type">
                                    <div class="btn btn-default dropdown-toggle" type="button" id="typeShow" data-toggle="dropdown">
                                        <span data-content="0" id="equipment">专业级设备(HD)</span>
                                        <div class="carets"></div>
                                    </div>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" >
                                        <li data-content="0" data-info="3">专业级设备(HD)</li>
                                        <li data-content="1" data-info="4">广告级设备(2K)</li>
                                        <li data-content="2" data-info="5">电影级设备(4K)</li>
                                       
                                    </ul>
                                </div>
                                  <div class="infoContent" id="equipmentInfo">等哈看对方机会卡机的很快发货的罚款的饭卡减</div>
                            </div>

                             <div class="calItem">
                                <div class="title" >演员</div>
                                <div class="dropdown costSelect" id="type">
                                    <div class="btn btn-default dropdown-toggle" type="button" id="typeShow" data-toggle="dropdown">
                                        <span data-content="0" id='actor'>自有演员</span>
                                        <div class="carets"></div>
                                    </div>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" >
                                        <li data-content="0">自有演员</li>
                                        <li data-content="1">普通演员</li>
                                        <li data-content="2">专业演员</li>
                                        
                                    </ul>
                                </div>
                            </div>

                             <div class="calItem">
                                <div class="title"  >配音</div>
                                <div class="dropdown costSelect" id="type">
                                    <div class="btn btn-default dropdown-toggle" type="button" id="typeShow" data-toggle="dropdown">
                                        <span id="animation" data-content="0">无配音</span>
                                        <div class="carets"></div>
                                    </div>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" >
                                        <!-- <li data-content="0">无动画</li>
                                        <li data-content="1">三维动画</li>
                                        <li data-content="2">二维动画</li>
                                        <li data-content="3">MG动画</li> -->
                                        
                                       	<li data-content="0">无配音</li>
                                        <li data-content="1">专业配音</li>
                                        <li data-content="2">广播级配音</li>
                                        <li data-content="3">广告级配音</li> 
                                    </ul>
                                </div>
                            </div>
                          
                          <r:noLogin>
                             <div class="calItem inputWidthPhone">
                                <div class="title" data-content=""  id="errorPhone">您的联系方式</div>
                                <div>
                                <input data-content="0" placeholder="您的手机号" id="phone">
                                </div>
                            </div>
                            
                             <div class="calItem code" id='code-container'>
                                <div class="title" data-content=""  id="errorCode">您的验证码</div>
                                <div>
                                   <input data-content="0" placeholder="您的验证码" id="phoneCodes">
                                   <button class="setCode btn-c-r" id='getPhoneCodes'>发送验证码</button>
                                </div>
                            </div>
                           </r:noLogin>
                           <div class="netError">错误</div>
                            <div class="calItem inputWidth">
                                <button class="btn-c-r" id="start">开始计算</button>
                                <button id="clear">重置</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
     <!-- foot -->
         					 <jsp:include flush="true" page="foot.jsp"></jsp:include> 
                            <!--新版底部-->
    </div>
    <script type="text/javascript"  src="/resources/lib/Bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript"  src="/resources/lib/jquery.json/jquery.json-2.4.min.js"></script>
    <script type="text/javascript"  src="/resources/lib/jquery/waypoints.min.js"></script>
    <script type="text/javascript"  src="/resources/js/cost.js"></script>
    <script type="text/javascript"  src="/resources/js/common.js"></script>
    
</body>
</html>