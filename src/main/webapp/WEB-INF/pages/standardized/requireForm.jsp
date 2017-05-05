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
<spring:url value="/resources/js/standardized/requireForm.js"
	var="requireFormJs" />

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
<script src="${requireFormJs }"></script>
</head>
<body>
	<a href="/list">列表页面</a>
	<div style="margin-left: 50px;margin-top: 20px">
		<form action="" method="post" id="fm">
			<input type="hidden" id="indentId"  value="${indentId }">
			<div>
				1.项目背景描述，片子使用途径？请选择所有合适的选项。
				<div>
					<input type="checkbox" name="scene" value="融资路演">融资路演 &nbsp;
					<input type="checkbox" name="scene" value="传统媒体">传统媒体 &nbsp;
					<input type="checkbox" name="scene" value="线上推广">线上推广 &nbsp;
					<input type="checkbox" name="scene" value="内部培训">内部培训 &nbsp;
					<input type="checkbox" name="scene" value="线下推广">线下推广 &nbsp;
				</div>
			</div>
			<br/>
			<div>
				2.目标受众，方给谁看？请选择所有合适的选项。
				<div>
					<input type="checkbox" name="audience" value="企业内部">企业内部 &nbsp;
					<input type="checkbox" name="audience" value="合作方">合作方 &nbsp;
					<input type="checkbox" name="audience" value="政府/国企">政府/国企 &nbsp;
					<input type="checkbox" name="audience" value="投资人">投资人 &nbsp;
					<input type="checkbox" name="audience" value="企业客户">企业客户 &nbsp;
				</div>
			</div>
			<br/>
			<div>
				3.片子要传递的核心信息是什么？请选择其中一个合适的选项。<br/>
				<div style="margin-left: 30px">
						企业：
					<div style="margin-left: 30px">
						<input type="checkbox" name="coreMessage" value="文化/品牌">文化/品牌 &nbsp;
						<input type="checkbox" name="coreMessage" value="概况/介绍">概况/介绍 &nbsp;
					</div>
						产品：
					<div style="margin-left: 30px">
							实体：
						<div>
							<input type="checkbox" name="coreMessage" value="外观/特性">外观/特性 &nbsp;
							<input type="checkbox" name="coreMessage" value="使用场景">使用场景 &nbsp;				
						</div>
							服务：
						<div>
							<input type="checkbox" name="coreMessage" value="流程/功能">流程/功能 &nbsp;
							<input type="checkbox" name="coreMessage" value="价值">价值 &nbsp;					
						</div>
					</div>
				</div>
			</div>
			<br/>
			<div>
				4.影片时长是多少？
				<div>
					<input type="checkbox" name="time" value="1分钟">1分钟 &nbsp;
					<input type="checkbox" name="time" value="1-3分钟">1-3分钟 &nbsp;
					<input type="checkbox" name="time" value="3-5分钟">3-5分钟 &nbsp;
					<input type="checkbox" name="time" value="5-10分钟">5-10分钟 &nbsp;
					<input type="checkbox" name="time" value="10分钟以上">10分钟以上 &nbsp;
				</div>
			</div>
			<br/>
			<div>
				5.影片制作预算？
				<div>
					<input type="checkbox" name="budget" value="经济实惠 1-3W">经济实惠 1-3W &nbsp;
					<input type="checkbox" name="budget" value="性价比高 3-10W">性价比高 3-10W &nbsp;
					<input type="checkbox" name="budget" value="酷炫精致 10-20W">酷炫精致 10-20W &nbsp;
					<input type="checkbox" name="budget" value="高端大片 20W以上">高端大片 20W以上 &nbsp;
				</div>
			</div>
			<br/>
			<div>
				6.是否有参考样片？
				<div>
					<input type="checkbox" name="sample" value="是">是 &nbsp;
					<input type="checkbox" name="sample" value="否">否 &nbsp;
				</div>
			</div>
			<br/>
			<div>
				7调性接收度，能接受比较趣味的还是品牌调性要求比较严肃正经的？
				<div>
					<input type="checkbox" name="tonal" value="活泼">活泼 &nbsp;
					<input type="checkbox" name="tonal" value="严肃">严肃 &nbsp;
					<input type="checkbox" name="tonal" value="温情">温情 &nbsp;
				</div>
			</div>
			<br/>
			<div style="margin-left: 400px">
				<input type="button" id="submit" value="提交">			
			</div>
		</form>
	</div>
	
</body>
</html>