<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/css/flow/flowMenu.css" var="flowMenuCss"/>
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js" var="datepickerJs" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js" var="datepickerZhJs" />

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/js/flow/flowMenu.js" var="flowMenuJs"/>
<spring:url value="/resources/images" var="imgPath" />
<%-- <spring:url value="http://localhost:8080/" var="url" /> --%>
<%-- <spring:url value="http://test.apaipian.com:7070/" var="url" /> --%>
<spring:url value="http://localhost:8080/" var="url" /> 

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
<meta name="keywords" content="">
<meta name="description" content="">
<meta name="baidu-site-verification" content="dMz6jZpIwd" />
<title></title>
<link rel="stylesheet" href="${flowMenuCss}">
<link rel="stylesheet" href="${datepickerCss}">
<script type="text/javascript" src="${jqueryJs}"></script>
<script type="text/javascript" src="${datepickerJs}"></script>
<script type="text/javascript" src="${datepickerZhJs}"></script> 
<script type="text/javascript" src="${flowMenuJs}"></script>


<!--[if lt IE 9]>
        <script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
    <![endif]-->


</head>

<body>

	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
     
	    <div class="flowMenu">
	        <div id="shortMenu">
	                <div class="head" id="menuHead"><img src="${imgPath}/flow/open.png"></div>
	                <div class="menuItem hide"><div class="createIcon"></div></div>
	                <!--<a href="/project/running">   </a>-->
	                	<div class="menuItem" id='minMyPro'><div class="myPro"></div></div>
	               
	                <r:identity role="employee">
	                	<div class="menuItem" id='minorder'><div class="orderList"></div></div>
	                	<div class="menuItem" id="minboxs"><div class="boxs" id="minboxs"></div></div>
		                <div class="menuItem" id="minsave"><div class="save" id="minSave"></div></div>
		                <div class="menuItem" id='minsafe'><div class="safe" id='minSafe'></div></div> 
	                </r:identity>
	                <div class="bottom"><div class="loginOut"></div></div>
	        </div>
	       
	     <div id="mainMenu">
	         <img class="toMin" id="toMin" src="${imgPath}/flow/close.png"> 
	        <div class="logoDiv"><img class="logo" id="getImgUrlMenu" data-value="<r:outImg />"></div>
	        <div class="userName" id="setRealName" data-value="<r:outName />" ></div>
	        <div class="flowTree">

	    <r:permission uri="/project/running">     
	              <div class="treeitem" id="myPro">
	                  <div class="myPro"></div>
	                  <div class="title">我的项目<span> Beta</span></div>
	                  <img src="${imgPath}/flow/more.png">
	             </div>
	              <ul class="productList" id="productList">

                      <!--  
	                  <a href="${url}/project/running-task"><li id="nowDoing" class="checkLi">进行中<div class="hide" id="cardNum"></div></li></a>
	                  <a href="${url}/project/running-task?pause"><li id="pause">暂停</li></a>
	                  <a href="${url}/project/running-task?finish"><li id="finish">完成/取消</li></a>
	                   -->	          

	                  <li id="nowDoing">进行中<div id="cardNum"></div></li>
	                  <li id="pause">暂停</li>
	                  <li id="finish">完成/取消</li>
	              </ul>
	      </r:permission>  
	               
	              <r:permission uri="/order/myOrder">
			              <div class="treeitem" id="myOrder">
			                <div class="orderList"></div>
			                <div class="title">我的订单</div>
			                <img src="${imgPath}/flow/more.png">
			            </div>
	                  <ul class="productList" id="orderList">
		                  <li id='orderIndex' data-value="0">处理中</li>
		                  <li id='orderSub' data-value="1">已提交</li>
		                  <li id='orderCancle' data-value="2">无效订单</li>
		              </ul>
	               	</r:permission>  	
	       <!-- 工具箱 -->    

	<%--  <r:permission uri="/order/box">  --%>
			              <div class="treeitem" id="myboxs" >
			                <div class="boxs"></div>
			                <div class="title">工具箱</div>
			                <img src="${imgPath}/flow/more.png">
			            </div>
	                  <ul class="productList" id="boxsList">
		                  <li id='boxsIndex' data-value="0">报价单生成器</li>
	                <!--   <li id='boxsSub' data-value="1">排期表</li>
		                  <li id='boxsCancle' data-value="2">不知道</li>  -->
		              </ul>

	 <%--   	</r:permission>   --%>

	       <r:identity role="employee">
			         <div class="treeitem" id="toSave">
			                  <div class="save"></div>
			                  <div class="title">收藏列表</div>
			         </div>
		              <div class="treeitem " id='safe'>
		                  <div class="safe"></div>
		                  <div class="title">安全设置</div>
		             </div>
		         </r:identity>    
	             <a href="http://www.apaipian.com/login/loginout">
		             <div class="treeitem">
		                  <div class="line"></div>
		                  <div class="loginOut"></div>
		                  <div class="title">退出登录</div>
		             </div>
	             </a>
	        </div> 
	   </div>
	</div> 
  
	<!-- video-->
</body>

</html>
