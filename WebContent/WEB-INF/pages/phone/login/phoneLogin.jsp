<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/Bootstrap/css/bootstrap.min.css" var="bootstrapCss"/>
<spring:url value="/resources/css/common.css" var="commonCss"/>
<spring:url value="/resources/css/phone/login/phoneLogin.css" var="phoneLoginCss"/>

<%-- import JS --%>
<spring:url value="/resources/js/phone/login/phoneLogin.js" var="phoneLoginJs"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/Bootstrap/js/bootstrap.min.js" var="bootstrapJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>


<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
	<meta name="keywords" content="拍片网,视频制作,拍广告,找导演,拍片">
	<meta name="description" content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
	<title>移动端登录&&注册</title>
	<link rel="shortcut icon" href="${imgPath}/favicon.ico" >
	<link rel="stylesheet" href="${bootstrapCss}">
	<link rel="stylesheet" href="${commonCss}">
	<link rel="stylesheet" href="${phoneLoginCss}">

	
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->

	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${bootstrapJs }"></script>
	<script src="${aesJs }"></script>
	<script src="${padJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${phoneLoginJs }"></script>


</head>
<body>

	  <div class="cusSide" id="changeDiv">
	      <div class="topDiv">
	        
	        <div class="topContent">
	           <div><img class="" id="cusLogo" src="${imgPath}/phone/login/logorw.png" ></div>
	            <div><img class="hide" id="posLogo" src="${imgPath}/phone/login/logocw.png" ></div>
	           <div class="lineWidth"></div>
	           <div class="infoWord" id="infoWordId">来拍片网，收获最对的作品</div>
	        </div>
	       
	      </div>
	      
	      <div class="bottomDiv">
	               <input id="login_type" value="phone" type="hidden"></input>
	               <div class="titleWord cusBg">
	                  <div class="leftWord wc" id="checkCus">客户</div>
	                  <div class="rightWord red" id="checkPos">供应商</div>
	               </div>
			               <div class="contentHeight contentColor">
					                 <div class="loginContent">
							                   <div class="image hide"></div> 
							                   <input placeholder="手机号" id="user_phoneNumber"></input>
							                   <div class="error-word hide"  id="user_phoneNumberId">错误提示</div>
					                 </div>
					                
					                  <div class="loginContent">
							                   <div class="image "><img alt="图片验证码" src="/login/kaptcha.png?41" id="kaptcha_pic" class="btn-validation"/></div> 
							                   <input placeholder="图片验证码" id="kaptcha_code"></input>
							                   <div class="error-word hide"  id="kapt_error_info">错误提示</div>
					                 </div>
					                 
					                    <div class="loginContent">
							                   <div class="image "><button type="button" id="verification_code_recover_btn" class="btn-get-validation fontSizeBaseLight" >点击获取</button></div> 
							                   <input placeholder="短信验证码" id="verification_code" ></input>
							                   <div class="error-word hide" id="code_error_info">错误提示</div>
					                    </div>
					                    
					                  <div class="loginContent" >
					                     <div class="checkInfo hide" id="infoOrder">
						                       <div class="inline">
						                         <input class="checkboxDiv" type="checkbox" id="checkboxId" checked="checked" />
						                       </div>
						                       <div class="inline wordSize">我已阅读并同意<span>拍片网条款</span>
						                       </div>
					                      </div>
					                 </div>
					                 
					                   <div class="submitBtn" id="submitBtn">登录</div>
					            </div>
					               
			              </div>
	  </div>
		
	
</body>
</html>