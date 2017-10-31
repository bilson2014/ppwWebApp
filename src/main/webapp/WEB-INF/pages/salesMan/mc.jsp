<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%-- import CSS --%>
<spring:url value="/resources/css/salesMan/mc.css" var="mcCss"/>
<%-- import JS --%>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/js/salesMan/mc.js" var="mcJS"/>
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
<title></title>

    <link rel="stylesheet" href="${mcCss}">
    <link rel="shortcut icon" href="${imgPath}/favicon.ico" >

<script type="text/javascript"
	src="resources/lib/jquery/jquery-2.0.3.min.js"></script>
<script type="text/javascript"
	src="resources/lib/jquery.json/jquery.json-2.4.min.js"></script>

<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
<!--[if lt IE 9]>
        <script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
    <![endif]-->
</head>

<body>

	 <r:identity role="provider">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="roletype" value="provider">  
	    <input type="hidden" id="role" value="创作团队" />              
	 </r:identity>
	 <r:identity role="customer">
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="roletype" value="customer">
	    <input type="hidden" id="role" value="客户" />         
	 </r:identity>
	 <r:identity role="employee">
	    <input type="hidden" id="role" value="内部员工" />
	    <input type="hidden" id="rolephone" value="1314520ppw" />
	    <input type="hidden" id="rolephoneImg" value="1314520ppw" />
	    <input type="hidden" id="roletype" value="employee">
	 </r:identity>
	<jsp:include flush="true" page="../header.jsp"></jsp:include> 
	<div class="page" style="height:300px;background:black">
	     <div class="pageTop">
	         <div class="topContent">
	               <div class="price showPrice" id="price">
	                    	<div class="afterPrice" ><span>￥</span><span>欢迎询价</span></div>
	                	    <div class="afterPrice" ><span>￥</span><span>欢迎询价</span></div>
	                    <div class="afterPriceTitle">影片价格</div>
                        <div class="btn-c-r" id="needOrder">我要下单</div>
                    </div>
                    <div class="order" id="order">
                    	<form id="order-form" role="form" method="post" autocomplete="off" accept-charset="UTF-8">
							<input type="hidden" id="indentName" name="indentName" value="${product.productName }">
							<input type="hidden" id="company-unique" name="teamId" value="${teamId }"/>
							<input type="hidden" id="play-unique" name="productId" value="${productId }"/>
							<input type="hidden" id="service-unique" name="serviceId" value="${product.serviceId }"/>
												
	                        <div class="closeBtn" id="closeBtn"></div>
	                        <div class="orderTitle" id="oootitlte">立即下单,对接制作团队</div>
	                        <div class="orderItem" id="phoneError">
	                            <input placeholder="您的电话号" name="indent_tele" id="phoneNumber">
	                        </div>
	                        <div class="orderItem" id="phoneCodeError">
	                            <input placeholder="输入手机验证码"  id="verificationCodeValue" name="phoneCode">
	                            <div class="btn-c-r" id="verification_code_recover_btn">获取验证码</div>
	                        </div>
	                         <a href="javascript:void(0);" id="order-btn1" ><div class="order-btn btn-c-r">确认提交</div></a>
	                     	  <!--  <div class="orderBtn" id="confirmBtn">确认下单</div>  -->
	                        <div class="orderBotTitle"></div>
                        </form>
                    </div>
	         </div>
	     </div>
	
	   
                    
                    <!-- 投资利器 -->
                    <div>
                    
                    </div>
                    <!-- 裂变 -->
                    <div>
                    
                    </div>
                     <!-- 卡片 -->
                    <div class="codeCard">
                        <div class="cardItem">
                               <div class="readCode"></div>
                        </div>
                        <div class="cardItem">
                               <div class="readCode"></div>
                        </div>
                        <div class="cardItem">
                               <div class="readCode"></div>
                        </div>
                        <div class="cardItem">
                               <div class="readCode"></div>
                        </div>
                        <div class="cardItem">
                               <div class="readCode"></div>
                        </div>
                    </div>
                      <div class="orderBot">
					             <div class='phone'>
					                  <input class="input" type="text" maxlength="20" id="phone" placeholder='请输入您的手机号'/>
					                  <div class="var" id='varnum' >获取验证码</div>
					                  <p class="error" id='phoneerror'></p>
					              </div>
					              <div class='phone'>
					                   <input class="input"  type="text" maxlength="10"  id="num"  placeholder='请输入验证码'/>
					                   <p class="error" id='numerror'></p>
					              </div>  
					               <div class='phone'>
					                   <input type="button" class="btnSub"  id='btnSub' value="现在下单"></input>
					               </div>   			                  
					  </div>		
                    
	 
	 
	</div>
    <%-- <jsp:include flush="true" page="../foot.jsp"></jsp:include>  --%>
	<!-- video-->
    <script type="text/javascript" src="${mcJS }"></script>
    <script type="text/javascript" src="${commonJs }"></script>

	
</body>

</html>
