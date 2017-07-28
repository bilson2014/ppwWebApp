<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!-- imgPath -->
<spring:url value="/resources/images" var="imgPath" />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>

</head>

<body>
         <div class="showStatus">
              <div class="orderIndex active" data-value="0">处理中</div>
              <div class="orderSub" data-value="1">已提交</div>
              <div class="orderCancle" data-value="2">无效订单</div>
              <div class="orderNew" >新建订单</div>
         </div>
         <div class="searchInfo">
            <div>公司名称</div>
            <input value="" id="sUserCompany">
            <div>联系人</div>
            <input value="" id="sRealName">
            <div>电话</div>
            <input value="" id="sIndent_tele">
            <div>订单来源</div>
            <div class="orderSelect" >
                <div id="sIndentSource"></div>
                <img src="${imgPath}/orderManager/select.png">
                <ul class="oSelect searchSelect" id="orderCome">
                    <li data-id="">全部</li>
                    <li data-id="8">复购</li>
                    <li data-id="4">线下-电销</li>
                    <li data-id="5">线下-直销</li>
                    <li data-id="6">线下-活动</li>
                    <li data-id="7">线下-渠道</li>
                    <li data-id="1">线上-网站</li>
                    <li data-id="2">线上-活动</li>
                    <li data-id="3">线上-新媒体</li>
                    <li data-id="9">线上-400</li>
				    <li data-id="10">线上-商桥</li>
               		<li data-id="11">线上-PC-首页banner</li>
                    <li data-id="12">线上-PC-直接下单</li>
                    <li data-id="13">线上-PC-成本计算器</li>
                    <li data-id="14">线上-PC-供应商首页下单</li>
                    <li data-id="15">线上-PC-作品</li>
                    <li data-id="16">线上-移动-首页banner</li>
                    <li data-id="17">线上-移动-成本计算器</li>
                    <li data-id="18">线上-移动-作品</li>
                    <li data-id="19">线上-公众号-成本计算器 </li>
                    <li data-id="20">线上-公众号-直接下单</li>
                    <li data-id="21">线上-公众号-作品</li>	
                </ul>    
	        </div>
            <div>日期查询</div>
            <input class="time" readonly id="timeOld" name="time" value="">
            <span>~</span>
            <input class="time" readonly id="timeNew" name="time" value="">
            <div class="btn-c-r searchBtn" id="toSearch">搜索</div>
            <div class="btn-c-g searchBtn" id="toClean">清空</div>
         </div>
</body>

</html>