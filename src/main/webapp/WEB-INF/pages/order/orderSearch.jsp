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
              <a href="<spring:url value='/orderIndex'/>"><div class="orderIndex">处理中</div></a>
              <a href="<spring:url value='/sub'/>"><div class="orderSub">已提交</div></a>
              <a href="<spring:url value='/cancle'/>"><div class="orderCancle">无效订单</div></a>
         </div>
         <div class="searchInfo">
            <div>订单编号</div>
            <input value="1312312312">
            <div>联系电话</div>
            <input value="182103">
            <div>日期查询</div>
            <input class="time" readonly id="timeOld" name="time" value="">
            <span>~</span>
            <input class="time" readonly id="timeNew" name="time" value="">
         </div>
</body>

</html>