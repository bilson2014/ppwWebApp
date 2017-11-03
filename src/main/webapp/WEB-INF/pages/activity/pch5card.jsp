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
<meta name="keywords" content="宣传片,宣传片制作, 品牌微电影,tvc广告片,广告片拍摄, mg动画,短视频,商业视频">
<meta name="description" content="拍片网是专业的商业视频服务平台，提供：宣传片、产品tvc广告拍摄、品牌微电影、mg动画等短视频内容制作。成本托管，免费创意策划，海量样片，价格透明。拍片就上拍片网！">
<meta name="baidu-site-verification" content="dMz6jZpIwd" />
<title>企业视频名片-拍片网</title>

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
		<div class='top'><img src="${imgPath}/activity/pch1.jpg"></div>
		<div class='basscard'>
			<img src="${imgPath}/activity/pch2.jpg">
			<img class='picstyle' src="${imgPath}/activity/pchs.gif">
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
			<img src="${imgPath}/activity/pch6.jpg">
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
					<img src="${imgPath}/activity/name.png">
				</div>   			                  
			</div>
		</div>
		<div class='last'>
			<img src="${imgPath}/activity/pch7.jpg">
		</div>
	</div>
	
	 

	
	   
                   
                     <!-- 卡片 -->
                
              	
                    
	 
	 
	
    <%-- <jsp:include flush="true" page="../foot.jsp"></jsp:include>  --%>
	<!-- video-->
    <script type="text/javascript" src="${pch5cardJS}"></script>
    <script type="text/javascript" src="${commonJs }"></script>

	
</body>

</html>
