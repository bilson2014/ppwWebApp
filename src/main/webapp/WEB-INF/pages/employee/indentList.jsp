<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%-- import CSS --%>
<spring:url value="/resources/lib/normalize/normalize.css"
	var="normalizeCss" />
<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js"
	var="jqueryJs" />
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs" />
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js"
	var="jsonJs" />
<spring:url value="/resources/js/common.js" var="commonJs" />
<spring:url value="/resources/js/employee/indentList.js"
	var="indentListJs" />

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
<meta name="keywords" content="拍片网,视频制作,视频营销,供应商,拍片">
<meta name="description"
	content="拍片网，汇聚千万影视行业创作者，是中国最大的视频交易平台。产品：宣传片、广告、微电影、动画、三维演示等视频，优势：创意免费、选择多、价格低、不满意无条件退款">
<title>拍片网 | ${pageName }_供应商登录页面</title>
<link rel="shortcut icon" href="${imgPath }/favicon.ico">
<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
<script src="${jqueryJs }"></script>
<script src="${pluginJs }"></script>
<script src="${jsonJs }"></script>
<script src="${commonJs }"></script>
<script src="${indentListJs }"></script>

<script type="text/javascript" src="/resources/lib/Bootstrap/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="/resources/lib/Bootstrap/css/bootstrap.min.css">
<style type="text/css">
	table { width: 100%; min-height: 25px; line-height: 25px; text-align: center; border-color:#000; border-collapse: collapse;}
</style>
</head>
<body>
	登录人：<r:outName/> 
	<br/>
	<c:if test="${! empty indentList }">
		总共：${indentList.total }条订单
		<table border="1">
		<tr>
			<td>订单ID</td>
			<td>联系人</td>
			<td>联系电话</td>
			<td>公司</td>
			<td>微信</td>
			<td>下单时间</td>
			<td>备注</td>
			<td>状态</td>
			<td>按钮</td>
		</tr>
		<c:if test="${ ! empty indentList.rows }">
			<c:forEach items="${indentList.rows }" var="item" varStatus="status">
				<tr>
					<td class="id"><c:out value="${item.id }"/></td>
					<td class="realName"><c:out value="${item.realName }"/></td>
					<td class="indent_tele"><c:out value="${item.indent_tele }"/></td>
					<td class="userCompany"><c:out value="${item.userCompany }"/></td>
					<td class="wechat"><c:out value="${item.wechat }"/></td>
					<td class="orderDate"><c:out value="${item.orderDate }"/></td>
					<td class="indent_recomment"><c:out value="${item.indent_recomment }"/></td>
					<td class="indentType"><c:out value="${item.indentType }"/></td>
					<td><button class="edit">编辑</button></td>
				</tr>
			</c:forEach>
		</c:if>
		</table>
	</c:if>
	
	<div id="bbbb" style="margin-left: 75px; display: none;">
		<form action="" method="post">
			订单ID:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" readonly="readonly" name="id" id="formId"><br/><br/>
			联系人:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="realName" id = "formrealName" ><br/><br/>
			联系电话:<input type="text" name="indent_tele" id = "formindent_tele"><br/><br/>
			公司: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="userCompany" id = "formuserCompany"><br/><br/>
			微信:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" name="wechat" id = "formwechat"><br/><br/>
			下单时间:<input type="text" readonly="readonly" name="orderDate" id = "formorderDate"><br/><br/>
			备注:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea rows="4" cols="45" name="indent_recomment" id = "formindent_recomment"></textarea><br/><br/>
			状态：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="indentType" id = "formindentType"><br/><br/>
			
			<input type="submit" onclick="subBtn()" value="提交">
		</form>
	</div>
</body>
</html>