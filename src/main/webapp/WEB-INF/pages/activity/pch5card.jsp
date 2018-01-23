<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%-- import CSS --%>
<spring:url value="/resources/css/activity/pch5card.css" var="pch5cardCss"/>
<%-- import JS --%>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/activity/pch5card.js" var="pch5cardJS"/>
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="制作1分钟宣传片要花多少钱？问人不如自己算。上拍片网，10秒出报价，专业团队为您保驾护航，再也不用担心拍宣传片多花冤枉钱。企业视频名片999元起，超值钜惠！">
<meta name="keywords" content="拍1分钟宣传片价格,60秒宣传片制作费用,视频名片,视频名片制作">
<meta name="baidu-site-verification" content="dMz6jZpIwd" />
<title>视频名片制作-60秒宣传片费用-1分钟宣传片价格-拍片网</title>

    <link rel="stylesheet" href="${pch5cardCss}">
    <link rel="shortcut icon" href="${imgPath}/favicon.ico" >

<script type="text/javascript"
	src="/resources/lib/jquery/jquery-2.0.3.min.js"></script>
<script type="text/javascript"
	src="/resources/lib/jquery.json/jquery.json-2.4.min.js"></script>

<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
<!--[if lt IE 9]>
        <script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
    <![endif]-->
</head>

<body>

	<div>
		<jsp:include flush="true" page="../header.jsp"></jsp:include> 
		<%-- <div class='top'><img src="${imgPath}/activity/pch1.jpg"></div> --%>
		<div class='basscard'>
			<img id='firstbb' src="${imgPath}/activity/pch2.jpg">
		<%-- 	<img class='picstyle' src="${imgPath}/activity/pchs.gif"> --%>
			<video class='picstyle' playsinline="true" webkit-playsinline="true"  id="toPlayVideo"  loop="loop" x-webkit-airplay="true" webkit-playsinline="" playsinline="true" preload="auto" poster="" style=""> 
				 <source type="video/mp4" src="http://106.75.77.53:8888/group1/M00/00/79/CgpsbFoAN6-AA59QAAzzC7kngrY524.mp4"> 
			</video> 
			<a href='#check'><img class='tiaostyle' src="${imgPath}/activity/party.png"></a>
			
		</div>
		<div class='picmuch'>
			<img src="${imgPath}/activity/pch3.jpg">
			<img class='pics' src="${imgPath}/activity/pch4.jpg">
		</div>
		<div class='moves'>
			<img src="${imgPath}/activity/pch5.jpg">
			<div class='cente'>
				<div class="codeCard">
            		<div class="cardItem">
            			<img  src="${imgPath}/activity/play1.jpg">
            			<div class="readCode"><img  src="${imgPath}/activity/play1er.png"></div>
            			<div class='fonts'>拍片网</div>
            		</div>
            		<div class="cardItem">
            			<img  src="${imgPath}/activity/play2.jpg">
            			<div class="readCode"><img  src="${imgPath}/activity/play2er.png"></div>
            			<div class='fonts'>中飞艾维</div>	
            		</div>
            	</div>
			</div>
		</div>
		<div class='check' id='check'>
			<img id='forbai' src="${imgPath}/activity/pch6.jpg">
			<div class="orderBot">
				<div class='name'>
					<input class="input" type="text" maxlength="20" id="name" placeholder='请填写您的姓名'/>
					<p class="error" id='nameerror'></p>
				</div>
				<div class='phone'>
					<input class="input" type="text" maxlength="20" id="phone" placeholder='请填写您的手机号'/>
					<div class="var" id='varnum' >获取验证码</div>
					<p class="error" id='phoneerror'></p>
				</div>
				<div class='num'>
					<input class="input"  type="text" maxlength="10"  id="num"  placeholder='请填写验证码'/>
					<p class="error" id='numerror'></p>
				</div>  
				<div class='button' id='button'>
					<p class="error" id='best'></p>
					<img id='ppshou' src="${imgPath}/activity/name.png">
				</div>   			                  
			</div>
		</div>
		<jsp:include flush="true" page="../foot.jsp"></jsp:include> 
		<%-- <div class='last'>
			<img src="${imgPath}/activity/pch7.jpg">
		</div> --%>
	</div>
    <%-- <jsp:include flush="true" page="../foot.jsp"></jsp:include>  --%>
	<!-- video-->
    <script type="text/javascript" src="${pch5cardJS}"></script>
    <script type="text/javascript" src="${commonJs }"></script>
</body>
</html>
