<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.panfeng.film.resource.model.User"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="r" uri="/mytaglib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%-- import CSS --%>
<spring:url value="/resources/css/supplier/basics.css" var="basicsCss"/>

<%-- import JS --%>
<spring:url value="/resources/lib/jquery/jquery-2.0.3.min.js" var="jqueryJs"/>
<spring:url value="/resources/lib/jquery/plugins.js" var="pluginJs"/>
<spring:url value="/resources/lib/jquery.json/jquery.json-2.4.min.js" var="jsonJs"/>
<spring:url value="/resources/lib/cripto/aes.js" var="aesJs"/>
<spring:url value="/resources/lib/cripto/pad-zeropadding.js" var="padJs"/>
<spring:url value="/resources/js/common.js" var="commonJs"/>
<spring:url value="/resources/images" var="imgPath" />
<spring:url value="/resources/js/supplier/basics.js" var="basicsJs"/>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=9,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="title" content="">
	<meta name="keywords" content="">
	<meta name="description" content="">
	<title>制片工具</title>
	<link rel="stylesheet" href="${basicsCss}">
	<link rel="shortcut icon" href="${imgPath }/favicon.ico" >
	<!--[if lt IE 9]>
		<script>window.html5 || document.write('<script src="html5shivJs"><\/script>')</script>
	<![endif]-->
	<!-- sina weibo -->
	<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=562282951" type="text/javascript" charset="utf-8"></script>
	<!-- webcat -->
	<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
	<!-- qq -->
	<script src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="101236962" data-callback="true" data-redirecturi="http://www.apaipian.com/login" charset="utf-8"  type="text/javascript"></script>
</head>
<body>
	<input type="hidden" id="storage_node" value="${file_locate_storage_path }" />
		 <div class="page">
		         <div class="managerPgae">
		           <div class="lineHead"></div>
		              <div class="managerCard">
		               		<div class='top'>
		               			<div class='people'>人员</div>
		               			<div class='site'>场地</div>
		               			<div class='facility'>设备</div>
		               			<div class='newbox'>
		               				<img src="/resources/images/supplier/add.png">新建
		               			</div>
		               		</div>	
		              		<div class='setCard'>
		              		<!--每个列表  idcard-->
		              			<div class='idcard '>
		              				<img class="imgs1" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527740495&di=f2c42a682f917b686de966d95944627d&src=http://img5.duitang.com/uploads/item/201411/04/20141104171337_xaMXx.jpeg">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			<div class='idcard '>
		              				<img class="imgs2" src="/resources/images/supplier/55.png">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			
		              			<div class='idcard '>
		              				<img class="imgs3" src="/resources/images/supplier/44.png">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			<div class='idcard '>
		              				<img class="imgs4" src="/resources/images/supplier/11.png">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			<div class='idcard '>
		              				<img class="imgs5" src="/resources/images/supplier/33.png">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div><div class='idcard '>
		              				<img class="imgs5" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528279592&di=fc4f3c06aa8ddd220b71df6f83582273&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F59%2F15%2F54f58PICMis_1024.png ">
		              				<div class='shade '>
		              					<img class='read' src="/resources/images/supplier/read.png">
		              					<img class='select' src="/resources/images/supplier/select.png">
		              				</div>
		              				<div class='linebox'>
		              					<span class='name'>小丸子/演员</span>
		              					<p class='price'>￥250</p>
		              				</div>
		              			</div>
		              			
		              			
    		
		              		</div>
		              		
		              		
		              		<!--每个 弹框的模板  -->
		              		
		              		<!--添加角色的 弹框  -->
		              		<div class='setting'>
		              			<div class='addpeople'>
		              				<div class='addtitle'>请选择添加的角色</div>
		              				<div class='addboxs'>
		              					<div class='check'>请选择</div>
		              					<img class='more' src="/resources/images/supplier/more.png">
		              					<div class='morecheck'>
		              						<span>演员</span>
		              						<span>导演</span>
		              					</div>
		              					<div class='sure'>确认</div>
		              					<div class='cancel'>取消</div>
		              				</div>
		              			</div>
		              			
		              			
		              			<!-- 添加演员 -->
		              			<div class='staffbox'>
		              				<div class='stafftitle'>添加演员</div>
		              				<div class='gather'>
		              					<div class='gatherleft'>
		              						<span>姓名</span>
		              						<input type='text'>
		              					</div>
		              					<div class='gatherright'>
		              					
		              					</div>
		              				</div>
		              			</div>
		              			
		              			
		              			
		              		</div>
		              		
		              		
		              		
		              
		              </div>
		         </div>
		 </div>
		   
	
	<script src="${jqueryJs }"></script>
	<script src="${pluginJs }"></script>
	<script src="${jsonJs }"></script>
	<script src="${aesJs }"></script>
	<script src="${padJs }"></script>
	<script src="${commonJs }"></script>
	<script src="${loginJs }"></script>
	<script src="${basicsJs}"></script>
</body>
</html>