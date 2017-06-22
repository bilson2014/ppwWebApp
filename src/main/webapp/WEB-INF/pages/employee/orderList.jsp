<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/images" var="imgPath" />
<spring:url value="/resources/css/employee/orderList.css" var="orderListCss"/>
<spring:url value="/resources/js/employee/orderList.js" var="orderListJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/datepicker.min.js" var="datepickerJs" />
<spring:url value="/resources/lib/AirDatepicker/dist/js/i18n/datepicker.zh.js" var="datepickerZhJs" />
<spring:url value="/resources/lib/AirDatepicker/dist/css/datepicker.min.css" var="datepickerCss" />

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="">
	<meta name="description" content="">
	<title>需求文档</title>
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
      <link rel="stylesheet" href="${orderListCss}">
      <link rel="stylesheet" href="${datepickerCss}">
</head>

<body>
      <input type='hidden' id="indentId"  value="${indentId}" />
      <input type='hidden' id="requireId" value="${requireId}" />
      <input type='hidden' id="flag"      value="${flag}" />
      <jsp:include flush="true" page="../header.jsp"></jsp:include> 
      <div class="showModelMeng"></div>
      <div class="orderModel">
       <div class="orderList">
            <div class="listHeader">
                 <div class="orderNum" id="indentId">需求文档<span></span></div>
                 <div class="cancleOrderList closeBtn hide" ></div>
                 <div class="setErrorList" id="setErrorList">信息不完整</div>
            </div>
            <div class="listTitle">客户需求调查问卷</div>
            <div class="listTItleE">Client Briefing Document</div>
            <div id="setListInfo"></div>
            <div class="btnDiv" id="needBtn">
	                <div class="btn-c-g cancleOrderList" id="cancleOrderList">取消</div>
	                <div class="btn-c-r headerSave">保存</div>
	        </div>
       </div> 
      </div> 
    <script type="text/javascript" src="${jqueryJs}"></script>
    <script type="text/javascript" src="${commonJs}"></script>
    <script type="text/javascript" src="${jsonJs}"></script>
    <script type="text/javascript" src="${datepickerJs}"></script>
    <script type="text/javascript" src="${datepickerZhJs}"></script>
    <script type="text/javascript" src="${orderListJs}"></script>
</body>

</html>