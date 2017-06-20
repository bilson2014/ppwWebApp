<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>


<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/js/order/orderList.js" var="orderListJs"/>
<spring:url value="/resources/images" var="imgPath" />

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
	<title>拍片网</title>
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
      <link rel="stylesheet" href="${orderListCss}">
</head>

<body>

      <div class="orderModel">
       <div class="orderList">
            <div class="listHeader">
                 <div class="orderNum" id="indentId">订单编号<span></span></div>
                 <div class="headerSave btn-c-r">保存</div>
            </div>
            <div class="listTitle">客户需求调查问卷</div>
            
            
            <div class="listTItleE">Client Briefing Document</div>
            <div id="setListInfo">
            <div class="qItem">
                 <div class="qTitle">1、阿达大大三大</div>
                 <div class="optionItem">
                     <div class="active">内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div>内容</div>
                 </div>
            </div>
            <div class="qItem">
                 <div class="qTitle">1、阿达大大三大</div>
                 <div class="nameItem">啥啥啥啥</div>
                 <div class="optionItem">
                     <div class="active">内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div class="other">其它</div>
                 </div>
                 <div class="otherInfo">
                 <input>
                 </div>
            </div>
             <div class="qItem">
                 <div class="qTitle">1、阿达大大三大</div>
                 <div class="nameItem">啥啥啥啥</div>
                 <div class="optionItem">
                     <div class="active">内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div class="other">其它</div>
                 </div>
                 <div class="otherInfo">
                 <input>
                 </div>
            </div>
             <div class="qItem">
                 <div class="qTitle">1、阿达大大三大</div>
                 <div class="nameItem">啥啥啥啥</div>
                 <div class="optionItem">
                     <div class="active">内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div class="other">其它</div>
                 </div>
                 <div class="otherInfo">
                 <input>
                 </div>
            </div>
             <div class="qItem">
                 <div class="qTitle">1、阿达大大三大</div>
                 <div class="nameItem">啥啥啥啥</div>
                 <div class="optionItem">
                     <div class="active">内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div class="other">其它</div>
                 </div>
                 <div class="otherInfo">
                 <input>
                 </div>
            </div>
             <div class="qItem">
                 <div class="qTitle">1、阿达大大三大</div>
                 <div class="nameItem">啥啥啥啥</div>
                 <div class="optionItem">
                     <div class="active">内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div class="other">其它</div>
                 </div>
                 <div class="otherInfo">
                 <input>
                 </div>
            </div>
             <div class="qItem">
                 <div class="qTitle">1、阿达大大三大</div>
                 <div class="nameItem">啥啥啥啥</div>
                 <div class="optionItem">
                     <div class="active">内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div class="other">其它</div>
                 </div>
                 <div class="otherInfo">
                 <input>
                 </div>
            </div>
             <div class="qItem">
                 <div class="qTitle">1、阿达大大三大</div>
                 <div class="nameItem">啥啥啥啥</div>
                 <div class="optionItem">
                     <div class="active">内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div class="other">其它</div>
                 </div>
                 <div class="otherInfo">
                 <input>
                 </div>
            </div>
             <div class="qItem">
                 <div class="qTitle">1、阿达大大三大</div>
                 <div class="nameItem">啥啥啥啥</div>
                 <div class="optionItem">
                     <div class="active">内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div>内容</div>
                     <div class="other">其它</div>
                 </div>
                 <div class="otherInfo">
                 <input>
                 </div>
            </div>
            <div class="btnDiv">
                <div class="btn-c-g">取消</div>
                <div class="btn-c-r">保存</div>
            </div>
            </div>
       </div> 
      </div> 
    <script type="text/javascript" src="${jqueryJs}"></script>
    <script type="text/javascript" src="${orderListJs}"></script>
</body>

</html>